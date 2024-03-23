import React from 'react';

const HistoryIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = 'currentColor' }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
    );
};

export default HistoryIcon;
