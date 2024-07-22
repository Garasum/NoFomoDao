import React from 'react';

interface BoostsProps {
    closeOverlay: () => void;
}

export const Boosts: React.FC<BoostsProps> = ({ closeOverlay }) => (
    <div className="overlay">
        <div className="overlay-content">
            <button className="close-button" onClick={closeOverlay}>X</button>
            <h1>Boosts Content</h1>
        </div>
    </div>
);