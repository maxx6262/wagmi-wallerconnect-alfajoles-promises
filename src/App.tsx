import * as React from "react";
import {
  useConnect,
  useAccount,
  useNetwork,
  useSigner,
  useProvider,
  useContract,
  useContractWrite,
  useContractRead
} from "wagmi";
import StorageAbi from "./abi/StorageAbi.json";
import { cpSync } from "fs";
import { webcrypto } from "crypto";

let userAccount;
export const App = () => {
  const provider = useProvider();
  const StorageContractAddressTestnet =
    "0x731A2F83142c6CA12aF26C5E7f7bc3a4e69A48E0";
  const [{ signer, err, loadsig }, getSigner] = useSigner({ skip: true });
  const usigner = signer;
  const contract = useContract({
    addressOrName: StorageContractAddressTestnet,
    contractInterface: StorageAbi,
    signerOrProvider: usigner
  });
  const [
    {
      data: { connector, connectors },
      error,
      loading
    },
    connect
  ] = useConnect();
  const [{ data: accountData }, disconnect] = useAccount();
  const [
    { data: networkData, error: networkError },
    switchNetwork
  ] = useNetwork();
  const [{ data, nberror, nbloading }, write] = useContractWrite(
    {
      addressOrName: StorageContractAddressTestnet,
      contractInterface: StorageAbi
    },
    "store",
    {
      args: "9"
    }
  );
  console.log({
    accountData: accountData,
    userAccount: userAccount
  });
  if (accountData) {
    userAccount = accountData.address;
    console.debug({
      storageContract: contract,
      Provider: provider,
      StorageAbi: StorageAbi,
      contract: contract
    });
    return (
      <div>
        <p>Account address: {accountData.address}</p>
        <p>Connected to {networkData.chain?.name}</p>
        <p>Connected via {accountData.connector?.name}</p>
        <button
          onClick={async function () {
            write()
              .then((rep) => {
                if (!rep.ok) {
                  alert(rep.error);
                  console.error({ message: rep.error });
                } else {
                  console.log({ tx: rep.hash, rep: rep });
                }
              })
              .catch((err) => console.error({ message: err }));
          }}
        >
          SetStorage{" "}
        </button>
        <button onClick={disconnect}>Disconnect</button>
      </div>
    );
  }

  return (
    <div>
      <div>
        {connectors.map((x) => (
          <button
            disabled={!x.ready}
            key={x.name}
            onClick={async function () {
              connect(x)
                .then((rep) => {
                  console.log({ connexion: rep });
                  userAccount = accountData.address;
                })
                .catch((err) => console.error({ message: err }));
            }}
          >
            {x.name}
            {!x.ready && " (unsupported)"}
            {loading && x.name === connector?.name && "…"}
          </button>
        ))}
      </div>
      <div>{error && (error?.message ?? "Failed to connect")}</div>
    </div>
  );
};
