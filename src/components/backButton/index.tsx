import React from 'react';
import BackButtonIcon from '../icons/backIcon';

const BackButton: React.FC = () => {

    const goBack = () => {
        window.history.back();
    };

    return (
        <button onClick={goBack} aria-label="Go back">
            <BackButtonIcon width={24} height={24} color="black" />
        </button>
    );
};

export default BackButton;
