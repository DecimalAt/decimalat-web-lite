import React, { createContext, useContext, useState, useEffect } from 'react';
import RainbowSDK from '@rainbow-me/rainbowkit';

// interface NetworkContextType {
//   networkName: string;
//   setNetworkName: (name: string) => void;
// }

// const NetworkContext = createContext<NetworkContextType | undefined>(undefined);

// export const useNetwork = () => {
//   const context = useContext(NetworkContext);
//   if (!context) {
//     throw new Error('useNetwork must be used within a NetworkProvider');
//   }
//   return context;
// };

// export const NetworkProvider: React.FC = ({ children }) => {
//   const [networkName, setNetworkName] = useState<string>('');

//   useEffect(() => {
//     const fetchNetworkName = async () => {
//       try {
//         const currentNetwork = await RainbowSDK.getNetworkName();
//         setNetworkName(currentNetwork);
//       } catch (error) {
//         console.error('Error fetching network name:', error);
//       }
//     };

//     fetchNetworkName();

//     // Subscribe to wallet events
//     const walletUpdateListener = RainbowSDK.onWalletUpdate(() => {
//       fetchNetworkName();
//     });

//     // Clean up event listener on unmount
//     return () => {
//       walletUpdateListener.unsubscribe();
//     };
//   }, []);

//   const updateNetworkName = async (name: string) => {
//     try {
//       await RainbowSDK.setNetwork(name);
//       setNetworkName(name);
//     } catch (error) {
//       console.error('Error updating network name:', error);
//     }
//   };

//   return (
//     <NetworkContext.Provider value={{ networkName, setNetworkName: updateNetworkName }}>
//       {children}
//     </NetworkContext.Provider>
//   );
// };
