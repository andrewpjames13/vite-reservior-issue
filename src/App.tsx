import "./App.css";
import { BidModal, ReservoirKitProvider } from "@reservoir0x/reservoir-kit-ui";
import { http, createConfig, WagmiProvider } from "wagmi";
import {
  RainbowKitProvider,
  darkTheme,
  lightTheme,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import {
  coinbaseWallet,
  metaMaskWallet,
  okxWallet,
  rainbowWallet,
  trustWallet,
  walletConnectWallet,
  zerionWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { zkSyncSepoliaTestnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const PROJECT_ID = "59eebb948e528ff52ec8a70c2b7451f2";

const ethDenverRainbowkitConnectors = [coinbaseWallet];

const connectors = connectorsForWallets(
  [
    {
      groupName: "Default",
      wallets: [
        metaMaskWallet,
        walletConnectWallet,
        rainbowWallet,
        trustWallet,
        okxWallet,
        zerionWallet,
        ...ethDenverRainbowkitConnectors,
      ],
    },
  ],
  {
    projectId: PROJECT_ID,
    appName: "zkSync",
  }
);
const config = createConfig({
  chains: [zkSyncSepoliaTestnet],
  transports: { [zkSyncSepoliaTestnet.id]: http() },
  connectors: [...connectors],
});

const TWENTY_FOUR_HOURS_IN_MS = 1000 * 60 * 60 * 24;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: TWENTY_FOUR_HOURS_IN_MS,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <RainbowKitProvider
          modalSize="compact"
          theme={{
            darkMode: darkTheme({
              accentColor: "#E02239",
              fontStack: "system",
              borderRadius: "small",
            }),
            lightMode: lightTheme({
              accentColor: "#E02239",
              fontStack: "system",
              borderRadius: "small",
            }),
          }}
        >
          <ReservoirKitProvider
            options={{
              apiKey: "INSERT_API_KEY_HERE",
              chains: [
                {
                  id: 324,
                  name: "ZkSync",
                  active: true,
                  baseApiUrl: "https://api-zksync.reservoir.tools",
                },
              ],
            }}
          >
            <BidModal
              collectionId={"0xde65bf848a2e285c16f6a32151c3c9ebc07d0e0d"}
              trigger={<button>Make Offer</button>}
            />
          </ReservoirKitProvider>
        </RainbowKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
}

export default App;
