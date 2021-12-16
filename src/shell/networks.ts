interface ChainInfo {
  chainId: number;
  name: string;
  factoryAddress: string;
  subgraphEndpoint: string;
  rpcEndpoint: string;
}

const networks: ChainInfo[] = [
  {
    chainId: 4,
    name: 'Rinkeby',
    factoryAddress: '0xA7ae98712F56f1C6CC894340555acE8F80D18326',
    subgraphEndpoint: 'https://api.thegraph.com/subgraphs/name/r-group-devs/shell-rinkeby',
    rpcEndpoint: process.env['RINKEBY_URL'] ?? '',
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

  if (info === null) {
    throw new Error(`unsupported network ${chainId}`);
  }

  return info;
};
