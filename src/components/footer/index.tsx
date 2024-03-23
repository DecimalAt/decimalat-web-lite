import React, { useState } from 'react';
import styled from 'styled-components';

import brandLogoLight from '../../assets/decimal_Logo_Footer.png';
import brandLogoDark from '../../assets/decimal_Logo_Dark_Footer.png';

import './styles.css';

const StyledFooterContainer = styled.footer`
    background-color: ${(props) => props.theme.headerBackground};
    height: 110px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    padding: 10px 50px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    text-align: justify;
    font-size: 11px;
    line-height: 1.5;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-top: 20px;
`;

const LightLogo = styled.img`
    height: 20px;
`;

const DarkLogo = styled.img`
    height: 20px;
`;

interface FooterProps {
    selectedTheme: string;
}

const Footer: React.FC<FooterProps> = ({ selectedTheme }) => {

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className="">
            <StyledFooterContainer>
                <div className="logo-footer">
                    {
                        selectedTheme === 'light'
                            ? <LightLogo src={brandLogoLight} alt="decimalAt-Web-lite-logo-light" onClick={scrollToTop} />
                            : <DarkLogo src={brandLogoDark} alt="decimalAt-Web-lite-logo-dark" onClick={scrollToTop} />
                    }
                </div>
                <div className="footer-content">
                    <p>Decimal© 2023-2024. All Rights Reserved.</p>
                    <p>These materials are for general information purposes only and are not investment advice or a recommendation or solicitation to buy, sell, stake or hold any cryptoasset or to engage in any specific trading strategy. Decimal does not and will not work to increase or decrease the price of any particular cryptoasset it makes available. Some crypto products and markets are unregulated, and you may not be protected by government compensation and/or regulatory protection schemes. The unpredictable nature of the crypto-asset markets can lead to loss of funds. Tax may be payable on any return and/or on any increase in the value of your cryptoassets and you should seek independent advice on your taxation position. Geographic restrictions may apply.</p>
                </div>
            </StyledFooterContainer>
        </div>
    );
};

export default Footer;