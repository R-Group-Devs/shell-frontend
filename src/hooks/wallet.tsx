import React, { createContext, FunctionComponent, useContext, useEffect, useRef, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { ContractTransaction } from 'ethers';
import { isWalletPresent } from '../lib/web3';
import { getChainInfo, getChainInfoOrNull } from '../shell/networks';

const connector = new InjectedConnector({});

const defaultNetwork = 4;

type WalletState = 'init' | 'disconnected' | 'connected' | 'ready';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useWalletImplementation = () => {
  const { activate, active, error, chainId, account, library } = useWeb3React();
  const [isLoaded, setIsLoaded] = useState(false);
  const [browseChainId] = useState(defaultNetwork);
  const [transactions, setTransactions] = useState<ContractTransaction[]>([]);
  const callbacks = useRef<Array<() => unknown>>([]);

  const connect = async () => {
    await activate(connector);
  };

  const attemptReconnect = async () => {
    if (await connector.isAuthorized()) {
      await connect();
    }
    setIsLoaded(true);
  };

  const onTransactions = (callback: () => unknown) => {
    callbacks.current.push(callback);
    return () => {
      callbacks.current = callbacks.current.filter((cb) => cb !== callback);
    };
  };

  const registerTransactions = async (trx: ContractTransaction) => {
    setTransactions((trxs) => [...trxs, trx]);
    await trx.wait();
    setTransactions((trxs) => trxs.filter((t) => t !== trx));
    callbacks.current.forEach((cb) => cb());
  };

  useEffect(() => {
    attemptReconnect();
  }, []);

  let state: WalletState = 'init';
  if (active && chainId) {
    state = 'ready';
  } else if (active) {
    state = 'connected';
  } else if (isLoaded) {
    state = 'disconnected';
  }

  return {
    chainId,
    state,
    library,
    account,
    browseChainInfo: getChainInfo(browseChainId),
    connectedChainInfo: getChainInfoOrNull(chainId),
    error,
    connect,
    walletPresent: isWalletPresent(),
    registerTransactions,
    transactions,
    onTransactions,
  };
};

type UseWallet = ReturnType<typeof useWalletImplementation>;

const WalletContext = createContext<UseWallet | undefined>(undefined);

export const WalletProvider: FunctionComponent = (props) => {
  const tokens = useWalletImplementation();
  return <WalletContext.Provider value={tokens}>{props.children}</WalletContext.Provider>;
};

export const useWallet = (): UseWallet => {
  const wallet = useContext(WalletContext);
  return wallet;
};
