import { StaticJsonRpcProvider } from '@ethersproject/providers';
import memoize from 'lodash/memoize';
import { getChainInfo } from '../shell/networks';

export const isWalletPresent = (): boolean => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (window as any).ethereum !== undefined;
};

export const getRpc = memoize((chainId: number) => {
  const info = getChainInfo(chainId);
  return new StaticJsonRpcProvider(info.rpcEndpoint, info.chainId);
});

export const exploreAddressLink = (chainId: number, address: string): string => {
  const info = getChainInfo(chainId);
  return `${info.blockchainExplorer}/address/${address}`;
};

export const exploreTokenLink = (chainId: number, address: string): string => {
  const info = getChainInfo(chainId);
  return `${info.blockchainExplorer}/token/${address}`;
};
