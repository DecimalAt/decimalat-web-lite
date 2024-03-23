import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import './styles.css';

const StyledNavigationContainer = styled.div`
    background: none;
    border: none;
    cursor: pointer;
    font-size: inherit;
    font-family: inherit;
    color: ${(props) => props.theme.textColorLight};
    text-decoration: none;
    padding: 12px;
    margin: 0;
    font-size: 16px;
    font-weight: bold;
    text-transform: uppercase;

    &.active {
        color: ${(props) => props.theme.textColorHighlight};
    }
`;


interface NavigationProps {
    items: { label: string; path: string }[];
}

const Navigation: React.FC<NavigationProps> = ({ items }) => {
    const navigate = useNavigate();
    const location = useLocation();


    const navigateTo = (path: string) => {
        navigate(path);
    };
    return (
        <ul className='header-nav'>
            {items.map((item, index) => (
                <li key={index} className='nav-item'>
                    <button className='navigation-button' onClick={() => navigateTo(item.path)}>
                        <StyledNavigationContainer className={`${location.pathname === item.path ? 'active' : ''}`}>
                            {item.label}
                        </StyledNavigationContainer>
                    </button>
                </li>
            ))}
        </ul>
    );
}

export default Navigation;
