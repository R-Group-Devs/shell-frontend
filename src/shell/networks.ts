const SUPPORTED_NETWORKS = {
  rinkeby: 4,
};

const CONTRACT_ADDRESSES: Record<string, string | undefined> = {
  [SUPPORTED_NETWORKS.rinkeby]: '0xA7ae98712F56f1C6CC894340555acE8F80D18326',
};

const SUBGRAPH_ENDPOINTS: Record<string, string | undefined> = {
  [SUPPORTED_NETWORKS.rinkeby]: 'https://api.thegraph.com/subgraphs/name/r-group-devs/shell-rinkeby',
};

const RPC_ENDPOINTS: Record<string, string | boolean | undefined> = {
  [SUPPORTED_NETWORKS.rinkeby]: process.env.RINKEBY_URL,
};

interface ChainInfo {
  /** hv contract address */
  contract: string;

  /** rpc endpoint url */
  rpc: string;

  /** subgraph endpoint url */
  subgraph: string;
}

/**
 * Get all supported blockchains
 */
export const getAllChainInfo = (): ChainInfo[] => {
  const networks = Object.values(SUPPORTED_NETWORKS);
  return networks.map(getChainInfo);
};

/**
 * get config / endpoint info by chain id
 */
export const getChainInfo = (chainId: number): ChainInfo => {
  if (!Object.values(SUPPORTED_NETWORKS).includes(chainId)) {
    throw new Error(`unsupported network ${chainId}`);
  }

  const contract = CONTRACT_ADDRESSES[chainId];
  if (contract == null) {
    throw new Error(`missing contract address for network ${chainId}`);
  }

  const rpc = RPC_ENDPOINTS[chainId];
  if (typeof rpc != 'string') {
    throw new Error(`missing rpc node for network ${chainId}`);
  }

  const subgraph = SUBGRAPH_ENDPOINTS[chainId];
  if (subgraph == null) {
    throw new Error(`missing subgraph for network ${chainId}`);
  }

  return { contract, rpc, subgraph };
};
