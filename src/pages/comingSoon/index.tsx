import React from 'react'
import './style.css';

interface ComingSoonProps {

}

const ComingSoon : React.FC<ComingSoonProps> = () => {
    return (
        <div style={{display:'flex' , justifyContent:'center', alignItems:'center'}}>
            <p>Coming Soon</p>
        </div>
    )

}

export default ComingSoon;
