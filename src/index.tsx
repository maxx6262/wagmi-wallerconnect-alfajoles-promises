import { render } from "react-dom";

// Imports
import { getNetwork, JsonRpcProvider } from "@ethersproject/providers";
import { Provider, Connector } from "wagmi";
import { Celo, Alfajores } from "../constants";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

import { App } from "./App";

// Pick chains
const chains = [Celo, Alfajores];
const defaultChain = Alfajores;
console.debug({ chains: chains, defaultChain: defaultChain });

const rpcMap = {
  44787: "https://alfajores-forno.celo-testnet.org",
  42220: "https://forno.celo.org"
};

// Set up connectors
type ConnectorsConfig = { chainId?: number };
const connectors = (_config: ConnectorsConfig) => {
  const network = getNetwork(_config.chainId ?? defaultChain.id);

  //@ts-ignore
  const rpcUrl = rpcMap[network.chainId];
  return [
    new InjectedConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
        rpc: {
          ["${network.chainId}"]: rpcUrl
        }
      }
    })
  ];
};

const providers = (_config: { chainId?: number; connector?: Connector }) => {
  const network = getNetwork(_config.chainId ?? defaultChain.id);
  //@ts-ignore
  const rpcUrl = rpcMap[network.chainId];
  console.log(rpcUrl);
  return new JsonRpcProvider(rpcUrl);
};
const rootElement = document.getElementById("root");
render(
  <Provider provider={providers} connectors={connectors}>
    <App />
  </Provider>,
  rootElement
);

console.log({
  network: getNetwork(defaultChain.id),
  rpcMap: rpcMap
});
