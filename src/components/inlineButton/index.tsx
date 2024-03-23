import React from 'react';
import './styles.css';

interface InlineButtonProps {
    onClick: () => void;
    children: React.ReactNode;
}

const InlineButton: React.FC<InlineButtonProps> = ({ onClick, children }) => {
    return (
        <button className="inline-button" onClick={onClick}>
            {children}
        </button>
    );
};

export default InlineButton;
