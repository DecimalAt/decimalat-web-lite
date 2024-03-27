// App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
  gnosis
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './themes';
import GlobalStyles from './themes/GlobalStyles';


import Header from './components/header';
// import SidePanel from './components/sidePanel';
import Footer from './components/footer';

import Home from './pages/home';
import Jobs from './pages/jobs';
import Feed from './pages/feed';
import History from './pages/history';
import CreateJob from './pages/createIntent';

import './App.css';


const config = getDefaultConfig({
  appName: 'decimalAt-web',
  projectId: '1e696e3657a96f5ea6d833e37d8a85c4',
  chains: [
    mainnet, 
    // polygon, 
    // optimism, 
    // arbitrum, 
    // base, 
    // zora, 
    gnosis
  ],
  //ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();


const App: React.FC = () => {

  const [theme, setTheme] = useState('dark'); // Initialize theme state with 'dark'
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light'); // Toggle between light and dark themes
  };

  return (
    <>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyles />
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider showRecentTransactions={true}>
              <div className="app">
                <Router>
                  <Header toggleTheme={toggleTheme} />
                  {/* <SidePanel /> */}
                  <main className="main-content">
                    <Routes>
                      {/* <Route path="/" element={<Home />} /> */}
                      <Route path="/feed" element={<Feed />} />
                      <Route path="/history/:id" element={<History />} />
                      <Route path="/" element={<Jobs />} />
                      <Route path="/create" element={<CreateJob />} />
                    </Routes>
                  </main>
                </Router>
                <Footer selectedTheme={theme} />
              </div>
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider >
      </ThemeProvider>
    </>
  );
};

export default App;
