import React from 'react';

interface LinkWalletProps {
    closeOverlay: () => void;
}

export const LinkWallet: React.FC<LinkWalletProps> = ({closeOverlay}) => (
    <div className="overlay">
        <button className="close-button" onClick={closeOverlay}>X</button>
        <div className="overlay-content">
            <h1>Link Your Wallet</h1>
            <div className="task-buttons">
                <form>
                    <label>
                        <input className ="input" type="text" name="name"/>
                    </label><br/><br/>
                    <input className="task-button" type="submit" value="Submit"/>
                </form>
            </div>
        </div>
    </div>
);