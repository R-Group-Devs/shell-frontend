import 'setimmediate';
import memoize from 'lodash/memoize';
import Dataloader from 'dataloader';
import { batchGetTokenURI, TokenURIRequest } from './nft';
import { batchResolveEnsNames } from './ens';

const options = {
  // serialize object keys
  cacheKeyFn: JSON.stringify,
};

/** get all dataloaders for a specific chain */
export const getLoaders = memoize((chainId: number) => {
  return {
    tokenURI: new Dataloader(
      (requests: readonly TokenURIRequest[]) => batchGetTokenURI(chainId, [...requests]),
      options
    ),
    ensName: new Dataloader((addresses: readonly string[]) => batchResolveEnsNames([...addresses])),
  };
});
