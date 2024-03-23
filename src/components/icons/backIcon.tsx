import React from 'react';

interface BackButtonIconProps {
    width?: number;
    height?: number;
    color?: string;
}

const BackButtonIcon: React.FC<BackButtonIconProps> = ({
    width = 24,
    height = 24,
    color = 'black',
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 24 24"
        >
            <path
                fill={color}
                d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
            />
        </svg>
    );
};

export default BackButtonIcon;
