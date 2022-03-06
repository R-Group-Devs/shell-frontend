import { useQuery } from 'react-query';
import { getRpc } from '../lib/web3';
import { getIndexerInfo } from '../lib/the-graph';
import { useWallet } from './wallet';

const refetchInterval = 10 * 1000;

export const useLatestBlockNumber = () => {
  const { browseChainInfo } = useWallet();
  const { chainId, subgraphEndpoint } = browseChainInfo;
  const rpc = getRpc(chainId);
  const subgraphName = subgraphEndpoint.replace('https://api.thegraph.com/subgraphs/name/', '');

  const indexerInfo = useQuery(['indexer info', chainId], () => getIndexerInfo(subgraphName), { refetchInterval });

  const blockchainInfo = useQuery(['latest block', chainId], () => rpc.getBlockNumber(), { refetchInterval });

  if (!indexerInfo.data || !blockchainInfo.data) {
    return undefined;
  }

  return {
    currentBlock: blockchainInfo.data,
    lastIndexedBlock: indexerInfo.data.latestBlock,
    pendingSubgraphUpdate: indexerInfo.data.pendingUpdate,
  };
};
