import React, { useState } from 'react';
import './styles.css';

interface ToggleSwitchProps<T> {
    option1: T;
    option2: T;
    initialSelected: T;
    onToggle: (selected: T) => void;
}

function ToggleSwitch<T>({ option1, option2, initialSelected, onToggle }: ToggleSwitchProps<T>): JSX.Element {
    const [selected, setSelected] = useState<T>(initialSelected);

    const toggleOption = () => {
        const newSelected = selected === option1 ? option2 : option1;
        setSelected(newSelected);
        onToggle(newSelected);
    };

    return (
        <div className="toggle-switch">
            <span>{option1 as unknown as string}</span>
            <label className="switch">
                <input type="checkbox" checked={selected === option2} onChange={toggleOption} />
                <span className="slider round"></span>
            </label>
            <span>{option2 as unknown as string}</span>
            {/* <span>{selected === option1 ? "Option 1" : "Option 2"}</span> */}
        </div>
    );
}

export default ToggleSwitch;
