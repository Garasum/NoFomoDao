import React from 'react';

interface EarnProps {
    closeOverlay: () => void;
}

export const Earn: React.FC<EarnProps> = ({closeOverlay}) => (
    <div className="overlay">
        <button className="close-button" onClick={closeOverlay}>X</button>
        <div className="overlay-content">
            <h1>Earn Content</h1>
            <div className="task-buttons">
                <div className="flex-grow flex items-center justify-center">
                    <button className="task-button">Claim Reward</button>
                </div>
            </div>
        </div>
    </div>
);