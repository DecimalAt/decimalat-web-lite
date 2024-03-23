import React from 'react';

const ArrowIcon: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = 'currentColor' }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 64 64" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)" fill={color} stroke="none">
                <path d="M197 474 c-4 -4 -7 -16 -7 -26 0 -16 10 -18 95 -18 52 0 95 -3 95 -7 0 -4 -50 -58 -111 -119 -79 -79 -110 -117 -106 -128 4 -9 12 -16 19 -16 7 0 63 49 123 110 60 61 113 110 117 110 5 0 8 -43 8 -96 0 -93 1 -95 23 -92 22 3 22 5 22 143 l0 140 -136 3 c-74 1 -138 -1 -142 -4z" />
            </g>
        </svg>
    );
};

export default ArrowIcon;