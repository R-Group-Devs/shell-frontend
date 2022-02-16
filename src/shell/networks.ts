interface ChainInfo {
  chainId: number;
  name: string;
  slug: string;
  factoryAddress: string;
  subgraphEndpoint: string;
  rpcEndpoint: string;
  blockchainExplorer: string;
  blockTime: number;
}

export const networks: ChainInfo[] = [
  {
    chainId: 1,
    name: 'ETH Mainnet',
    slug: 'eth',
    factoryAddress: '0x57FBF9E899E17E23d46425e33eE191C8FaD27c28',
    subgraphEndpoint: 'https://api.thegraph.com/subgraphs/name/r-group-devs/shell-mainnet',
    rpcEndpoint: process.env['ETH_URL'] ?? '',
    blockchainExplorer: 'https://etherscan.io',
    blockTime: 15,
  },
  {
    chainId: 4,
    name: 'Rinkeby Testnet',
    slug: 'rinkeby',
    factoryAddress: '0xc8d74b43d3922744ec51d61ea7db558916e2e457',
    subgraphEndpoint: 'https://api.thegraph.com/subgraphs/name/r-group-devs/shell-rinkeby',
    rpcEndpoint: process.env['RINKEBY_URL'] ?? '',
    blockchainExplorer: 'https://rinkeby.etherscan.io',
    blockTime: 15,
  },
];

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
