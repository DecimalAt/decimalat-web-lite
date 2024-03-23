import React from 'react';

const iconStyle: React.CSSProperties = {
    width: '22px',
    padding: '0 10px',
    cursor: 'pointer'
};

const CopyIcon: React.FC<{ text: string }> = ({ text }) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(text)
            .then(() => {
                console.log('Text copied to clipboard');
            })
            .catch((error) => {
                console.error('Error copying text to clipboard:', error);
            });
    };

    return (
        <div className="copy-icon" style={iconStyle} onClick={handleCopy}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 9H4a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-1"></path>
            </svg>
        </div>
    );
};

export default CopyIcon;
