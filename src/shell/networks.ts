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
    chainId: 4,
    name: 'Rinkeby Testnet',
    slug: 'rinkeby',
    factoryAddress: '0x6D063A9493A3aEc8dbaed987ba9c97fc70EC6c64',
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
