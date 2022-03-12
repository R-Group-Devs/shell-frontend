import { StaticJsonRpcProvider } from '@ethersproject/providers';
import memoize from 'lodash/memoize';

interface ChainInfo {
  chainId: number;
  name: string;
  slug: string;
  factoryAddress: string;
  subgraphEndpoint: string;
  rpcEndpoint: string;
  blockchainExplorer: string;
  raribleUrl?: string;
  looksrareUrl?: string;
  openseaUrl?: string;
  blockTime: number;
}

export const networks: ChainInfo[] = [
  {
    chainId: 1,
    name: 'Ethereum',
    slug: 'eth',
    factoryAddress: '0x57fbf9e899e17e23d46425e33ee191c8fad27c28',
    subgraphEndpoint: 'https://api.thegraph.com/subgraphs/name/r-group-devs/shell-mainnet',
    rpcEndpoint: process.env['ETH_URL'] ?? '',
    blockchainExplorer: 'https://etherscan.io',
    openseaUrl: 'https://opensea.io/assets',
    looksrareUrl: 'https://looksrare.org',
    raribleUrl: 'https://rarible.com',
    blockTime: 15,
  },
  {
    chainId: 137,
    name: 'Polygon',
    slug: 'polygon',
    factoryAddress: '0x03741151f5E6CF9736455C0CBCD512bfA8529C93',
    subgraphEndpoint: 'https://api.thegraph.com/subgraphs/name/r-group-devs/shell-matic',
    rpcEndpoint: process.env['POLYGON_URL'] ?? '',
    blockchainExplorer: 'https://polygonscan.com',
    openseaUrl: 'https://opensea.io/assets/matic',
    blockTime: 2.2,
  },
  {
    chainId: 4,
    name: 'Rinkeby Testnet',
    slug: 'rinkeby',
    factoryAddress: '0xB3a974e0A90d49674E727aeEC67E422A5ec8DB43',
    subgraphEndpoint: 'https://api.thegraph.com/subgraphs/name/r-group-devs/shell-rinkeby',
    rpcEndpoint: process.env['RINKEBY_URL'] ?? '',
    blockchainExplorer: 'https://rinkeby.etherscan.io',
    looksrareUrl: 'https://rinkeby.looksrare.org',
    raribleUrl: 'https://rinkeby.rarible.com',
    openseaUrl: 'https://testnets.opensea.io/assets',
    blockTime: 15,
  },
  {
    chainId: 5,
    name: 'Goerli Testnet',
    slug: 'goerli',
    factoryAddress: '0x0Ff2BC06b7faF18f1AD0C3086DDb26738A532351',
    subgraphEndpoint: 'https://api.thegraph.com/subgraphs/name/r-group-devs/shell-goerli',
    rpcEndpoint: process.env['GOERLI_URL'] ?? '',
    blockchainExplorer: 'https://goerli.etherscan.io',
    openseaUrl: 'https://testnets.opensea.io/assets/goerli',
    blockTime: 15,
  },

  {
    chainId: 80001,
    name: 'Mumbai Testnet',
    slug: 'mumbai',
    factoryAddress: '0x76e9f19D76Ae534cFb754AFE9D9CC52395E5fFaF',
    subgraphEndpoint: 'https://api.thegraph.com/subgraphs/name/r-group-devs/shell-mumbai',
    rpcEndpoint: process.env['MUMBAI_URL'] ?? '',
    blockchainExplorer: 'https://mumbai.polygonscan.com',
    openseaUrl: 'https://testnets.opensea.io/assets/mumbai',
    blockTime: 7.6,
  },
];

export const getRpc = memoize((chainId: number) => {
  const info = getChainInfo(chainId);
  return new StaticJsonRpcProvider(info.rpcEndpoint, info.chainId);
});

export const getChainInfoOrNull = (chainId: number): ChainInfo | null => {
  const info = networks.find((n) => n.chainId === chainId);

  if (!info) {
    return null;
  }

  // make sure rpc was baked in
  if (info.subgraphEndpoint === '') {
    throw new Error(`missing rpc endpoint for network ${chainId}`);
  }

  return info;
};

export const getChainInfo = (chainId: number): ChainInfo => {
  const info = getChainInfoOrNull(chainId);

  if (info == null) {
    throw new Error(`unsupported network ${chainId}`);
  }

  return info;
};

export const getChainInfoBySlug = (slug: string): ChainInfo => {
  const info = networks.find((n) => n.slug === slug);

  if (info == null) {
    throw new Error(`invalid network slug: ${slug}`);
  }

  return info;
};
