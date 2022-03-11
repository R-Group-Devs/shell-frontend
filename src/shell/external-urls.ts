import { getChainInfo } from './networks';

export const getLooksrareTokenUrl = (chainId: number, collection: string, tokenId: string): string | undefined => {
  const { looksrareUrl } = getChainInfo(chainId);
  return looksrareUrl ? `${looksrareUrl}/collections/${collection}/${tokenId}` : undefined;
};

export const getLooksrareCollectionUrl = (chainId: number, collection: string): string | undefined => {
  const { looksrareUrl } = getChainInfo(chainId);
  return looksrareUrl ? `${looksrareUrl}/collections/${collection}` : undefined;
};

export const getOpenseaTokenUrl = (chainId: number, collection: string, tokenId: string): string | undefined => {
  const { openseaUrl } = getChainInfo(chainId);
  return openseaUrl ? `${openseaUrl}/${collection}/${tokenId}` : undefined;
};

export const getRaribleCollectionUrl = (chainId: number, collection: string): string | undefined => {
  const { raribleUrl } = getChainInfo(chainId);
  return raribleUrl ? `${raribleUrl}/collection/${collection}` : undefined;
};

export const getRaribleTokenUrl = (chainId: number, collection: string, tokenId: string): string | undefined => {
  const { raribleUrl } = getChainInfo(chainId);
  return raribleUrl ? `${raribleUrl}/token/${collection}:${tokenId}` : undefined;
};

export const getExplorerContractUrl = (chainId: number, address: string): string => {
  const info = getChainInfo(chainId);
  return `${info.blockchainExplorer}/address/${address}`;
};

export const getExplorerCollectionUrl = (chainId: number, address: string): string => {
  const info = getChainInfo(chainId);
  return `${info.blockchainExplorer}/token/${address}`;
};

export const getExplorerTransactionUrl = (chainId: number, hash: string): string => {
  const info = getChainInfo(chainId);
  return `${info.blockchainExplorer}/tx/${hash}`;
};
