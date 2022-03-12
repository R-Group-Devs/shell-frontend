import { useQuery } from 'react-query';
import { getLoaders } from '../shell/dataloaders';
import { resolveMetadataByTokenURI } from '../shell/metadata';

export const useTokenMetadata = (chainId: number, collectionAddress: string, tokenId: string) => {
  return useQuery(['token metadata', chainId, collectionAddress, tokenId], async () => {
    const { tokenURI } = getLoaders(chainId);
    const resp = await tokenURI.load({ contract: collectionAddress, tokenId });
    const metadata = await resolveMetadataByTokenURI(resp.tokenURI);
    return metadata;
  });
};
