import React from 'react';

interface FrensProps {
    closeOverlay: () => void;
}

export const Frens: React.FC<FrensProps> = ({ closeOverlay }) => (
    <div className="overlay">
        <button className="close-button" onClick={closeOverlay}>X</button>
        <div className="overlay-content">
            <h1>Tasks Content</h1>
            <div className="task-buttons">
                <button className="task-button">Task 1</button>
                <button className="task-button">Task 2</button>
                <button className="task-button">Task 3</button>
            </div>
        </div>
    </div>
);