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
    name: 'Rinkeby Testnet',
    factoryAddress: '0xED3C0D236070e735497Cf9A2258e741e881c0F04',
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
