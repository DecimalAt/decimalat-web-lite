import React, { useState } from 'react';
import './styles.css';

type WaitCursorProps = {
    isLoading: boolean
}

const WaitCursor: React.FC<WaitCursorProps> = ({ isLoading }) => {
    // const [loading, setLoading] = useState(isLoading);
    return (
        <div>
            {isLoading && (
                <div className="overlay">
                    <div className="wait-cursor"></div>
                </div>
            )}
        </div>
    );
};

export default WaitCursor;
