import { useQuery } from 'react-query';
import { getRpc } from '../lib/web3';
import { getLatestIndexedBlock } from '../lib/the-graph';
import { useWallet } from './wallet';

export const useLatestBlockNumber = () => {
  const { browseChainInfo } = useWallet();
  const { chainId, subgraphEndpoint } = browseChainInfo;
  const rpc = getRpc(chainId);
  const subgraphName = subgraphEndpoint.replace('https://api.thegraph.com/subgraphs/name/', '');

  const indexer = useQuery(['last indexed block', chainId], () => getLatestIndexedBlock(subgraphName), {
    refetchInterval: 2500,
  });

  const blockchain = useQuery(['latest block', chainId], () => rpc.getBlockNumber(), { refetchInterval: 2500 });

  return { indexer, blockchain };
};
