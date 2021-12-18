import { useQuery } from 'react-query';
import { getRpc } from '../lib/web3';
import { getLatestIndexedBlock } from '../shell/graph';
import { useWallet } from './wallet';

export const useLatestBlockNumber = () => {
  const { browseChainInfo } = useWallet();
  const { chainId } = browseChainInfo;
  const rpc = getRpc(chainId);

  const indexer = useQuery(['last indexed block', chainId], () => getLatestIndexedBlock(chainId), {
    refetchInterval: 2500,
  });

  const blockchain = useQuery(['latest block', chainId], () => rpc.getBlockNumber(), { refetchInterval: 2500 });

  return { indexer, blockchain };
};
