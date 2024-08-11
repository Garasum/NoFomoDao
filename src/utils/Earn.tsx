import React, {useState} from 'react';
import UserDataService from "./userService.ts";

interface EarnProps {
    closeOverlay: () => void;
}

export const Earn: React.FC<EarnProps> = ({closeOverlay}) => {


    const [userId] = useState('kKya8irumCT0ReUQWutZ'); // Default user ID
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/ban-ts-comment
    const [, setPoints] = useState(0); // Assuming you have points in state
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [, setLastCollected] = useState(0); // Assuming you have lastCollected time in state


    const claimReward = async (e: React.FormEvent) => {
        e.preventDefault();

        // Fetch user data from Firebase (points, lastCollected)
        const userData = await UserDataService.getUser(userId);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const { lastCollected, points } = userData;

        const now = Date.now();
        const eightHoursInMilliseconds = 8 * 60 * 60 * 1000;

        // Check if 8 hours have passed since the last claim
        if (now - lastCollected >= eightHoursInMilliseconds) {
            try {
                // Update points and lastCollected in Firebase
                await UserDataService.updateUser(userId, {
                    points: points + 500,
                    lastCollected: now,
                });

                // Update local state
                setPoints(points + 500);
                setLastCollected(now);

                alert('Reward Claimed Successfully!');
            } catch (error) {
                console.error('Failed to Claim Reward: ', error);
                alert('Failed to Claim Reward');
            }
        } else {
            // Calculate the remaining time before the user can claim again
            const timeRemaining = eightHoursInMilliseconds - (now - lastCollected);
            const hours = Math.floor(timeRemaining / (60 * 60 * 1000));
            const minutes = Math.floor((timeRemaining % (60 * 60 * 1000)) / (60 * 1000));

            alert(`You can claim your next reward in ${hours} hours and ${minutes} minutes.`);
        }
    };

    return (
        <div className="overlay">
            <button className="close-button" onClick={closeOverlay}>X</button>
            <div className="overlay-content">
                <h1>You can claim reward every 8h</h1>
                <div className="task-buttons">
                    <div className="flex-grow flex items-center justify-center">
                        <button className="task-button" onClick={claimReward}>Claim Reward</button>
                    </div>
                </div>
            </div>
        </div>
    );
};