import React from 'react';
import './styles.css';
import CopyIcon from '../icons/copyIcon';

const HideCharacters: React.FC<{ text: string }> = ({ text }) => {
    return (
        <div className='hidden-chars'>
            <div className="hide-characters">
                {text.substring(0, 7)}...{text.substring(text.length - 5)}
            </div>
            <CopyIcon text={text} />
        </div>
    );
}

export default HideCharacters;