import Web3Modal from "web3modal";

import { useCallback, useEffect } from "react";
import { toast } from "react-toastify";

import { ethers, BigNumber } from "ethers";
import { Web3Provider } from "@ethersproject/providers";
import create from "zustand";

import { networkId, network } from "../utils/network";

let web3Modal;
if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    network,
    cacheProvider: true,
  });
}

const useStore = create(() => ({
  provider: undefined,
  web3Provider: undefined,
  signer: undefined,
  address: undefined,
  chainId: undefined,
  balance: undefined,
}));

const useWeb3Modal = () => {
  const state = useStore();
  const { provider } = state;

  const connect = useCallback(async () => {
    try {
      if (web3Modal) {
        const provider = await web3Modal.connect();
        const web3Provider = new Web3Provider(provider);
        const signer = web3Provider.getSigner();
        const address = await signer.getAddress();
        const network = await web3Provider.getNetwork();
        const balance = BigNumber.from(await web3Provider.getBalance(address));

        const remainder = balance.mod(1e14);

        useStore.setState({
          provider,
          web3Provider,
          signer,
          address,
          chainId: network.chainId,
          balance: ethers.utils.formatEther(balance.sub(remainder)),
        });
      }
    } catch (err) {
      toast.error(`${err}`);
    }
  }, []);

  const disconnect = useCallback(async () => {
    if (web3Modal) {
      web3Modal.clearCachedProvider();
      if (provider?.disconnect && typeof provider.disconnect === "function") {
        await provider.disconnect();
      }

      useStore.setState({
        provider: undefined,
        web3Provider: undefined,
        signer: undefined,
        address: undefined,
        chainId: undefined,
        balance: undefined,
      });
    }
  }, [provider]);

  useEffect(() => {
    if (web3Modal?.cachedProvider) {
      connect();
    }
  }, [connect]);

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        console.log("accountsChanged", accounts);
        if (!accounts.length) disconnect();
        else connect();
      };

      const handleChainChanged = (chainId) => {
        console.log("chainChanged", chainId);
        useStore.setState({ chainId: parseInt(chainId, 16) });
      };

      const handleDisconnect = (error) => {
        console.log("disconnect", error.message);
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider, disconnect, connect]);

  return {
    ...state,
    connect,
    disconnect,
    isSameNetwork: state.chainId === networkId,
  };
};

export default useWeb3Modal;