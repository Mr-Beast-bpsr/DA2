import '../styles/globals.css'
import "bootstrap/dist/css/bootstrap.min.css"
import $ from 'jquery'
import 'react-toastify/dist/ReactToastify.css';
// import '@madzadev/audio-player/dist/index.css'
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { infuraProvider } from 'wagmi/providers/infura'

import { publicProvider } from 'wagmi/providers/public';

import NavBar from '../components/ui/NavBar'
import {AppWrapper, FilterWrapper} from '../context/GlobalState'
 




function MyApp({ Component, pageProps }) {
  
// import { alchemyProvider } from 'wagmi/providers/alchemy';
// import { publicProvider } from 'wagmi/providers/public';
const { chains, provider } = configureChains(
  [ chain.rinkeby],
  [
    infuraProvider({ infuraId:"b4e2f0e57620408ebd82740df745f1a4" }),
    publicProvider()
  ]
);
const { connectors } = getDefaultWallets({
  appName: 'DA Game',
  chains
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})
  
  
  return <>
  <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider coolmode theme={darkTheme({
      accentColor: '#FBD10C',
      accentColorForeground: 'black',
      borderRadius: 'small',
      fontStack: 'system',
      overlayBlur: 'small',
    })} chains={chains} showRecentTransactions={true}>
  <FilterWrapper>

  <AppWrapper>

  <NavBar/>
  <Component {...pageProps} />
  {/* <dataFetching/> */}
  </AppWrapper>
  </FilterWrapper>
  </RainbowKitProvider>
  </WagmiConfig>

  </>
  
}
export default MyApp
