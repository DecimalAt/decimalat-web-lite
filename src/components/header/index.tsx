import React, { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Navigation from '../navigation';
import styled from 'styled-components';

import './styles.css';
import brandLogoLight from '../../assets/decimal_Logo.png';
import brandLogoDark from '../../assets/decimal_Logo_Dark.png';
import ToggleSwitch from '../toggle';


const StyledHeaderContainer = styled.header`
    background-color: ${(props) => props.theme.headerBackground};
    height: 60px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    padding: 10px 50px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
`;

const LightLogo = styled.img`
    height: 30px;
`;

const DarkLogo = styled.img`
    height: 30px;
`;

interface HeaderProps {
  toggleTheme: () => void;
}


const Header: React.FC<HeaderProps> = ({ toggleTheme }) => {
  const [theme, setTheme] = useState('Light');

  const navItems = [
    // { label: "Home", path: "/" },
    { label: "Jobs", path: "/" },
    { label: "Feed", path: "/feed" },
    { label: "New Intent", path: "/create" },
  ];

  const toggleTheTheme = (theme: string) => {
    setTheme(theme === 'Light' ? 'Dark' : 'Light');
    toggleTheme();
  }


  const redirectToAnotherSite = () => {
      window.location.href = 'https://decimal.at/';
  };

  return (
    <header className="header">
      <StyledHeaderContainer>
        <div className="logo">
          {
            theme === 'Light'
              ? <LightLogo src={brandLogoDark} alt="decimalAt-Web-lite-logo-light" onClick={redirectToAnotherSite} />
              : <DarkLogo src={brandLogoLight} alt="decimalAt-Web-lite-logo-dark" onClick={redirectToAnotherSite} />
          }
        </div>
        <nav className="navigation">
          <Navigation items={navItems} />
        </nav>
        <div className="user-management">
          <ConnectButton showBalance={true} />
          <ToggleSwitch option1={'Light'} option2={'Dark'} initialSelected={'Dark'} onToggle={toggleTheTheme} />
        </div>
      </StyledHeaderContainer>
    </header>
  );
}

export default Header;
