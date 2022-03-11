import 'setimmediate';
import memoize from 'lodash/memoize';
import Dataloader from 'dataloader';
import { batchGetTokenURI, TokenURIRequest } from './nft';

const options = {
  // serialize object keys
  cacheKeyFn: JSON.stringify,
};

/** get all dataloaders for a specific chain */
export const getLoaders = memoize((chainId: number) => {
  return {
    tokenURI: new Dataloader((keys: readonly TokenURIRequest[]) => batchGetTokenURI(chainId, [...keys]), options),
  };
});
