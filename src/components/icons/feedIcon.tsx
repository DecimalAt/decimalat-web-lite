import React from 'react';

const FeedIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = 'currentColor' }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 3 21 3 21 8"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>
    );
};

export default FeedIcon;