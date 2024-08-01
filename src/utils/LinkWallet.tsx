// src/components/LinkWallet.tsx
import React, {useState} from 'react';
import UserDataService from './userService.ts';

interface LinkWalletProps {
    closeOverlay: () => void;
}

export const LinkWallet: React.FC<LinkWalletProps> = ({closeOverlay}) => {
    const [inputValue, setInputValue] = useState('');
    const [userId] = useState('kKya8irumCT0ReUQWutZ'); // Default user ID
    // const [userId, setUserId] = useState('kKya8irumCT0ReUQWutZ'); // Default user ID

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await UserDataService.updateUser(userId, {walletName: inputValue});
            alert('Wallet name updated successfully!');
            // setInputValue(''); // Clear the input field after submission

        } catch (error) {
            console.error('Error updating wallet name: ', error);
            // alert(`Failed to update wallet name. ${error.message}`);
            alert(`Failed to update wallet name.`);
        }
    };

    // const changeUserId = (newUserId: string) => {
    //     setUserId(newUserId);
    // };

    return (
        <div className="overlay">
            <button className="close-button" onClick={closeOverlay}>X</button>
            <div className="overlay-content">
                <h1>Link Your Wallet</h1>
                <div className="task-buttons">
                    <form onSubmit={handleSubmit}>
                        <label>
                            <input
                                className="input"
                                type="text"
                                name="name"
                                value={inputValue}
                                onChange={handleInputChange}
                            />
                        </label>
                        <br/><br/>
                        <input className="task-button" type="submit" value="Submit"/>
                    </form>
                </div>
                {/*<button onClick={() => changeUserId('newUserIdHere')}>*/}
                {/*</button>*/}
            </div>
        </div>
    );
};
