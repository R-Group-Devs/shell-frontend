import React, { FunctionComponent } from 'react';
import { useQuery } from 'react-query';
import { getLoaders } from '../shell/dataloaders';
import { resolveMetadataByTokenURI } from '../shell/metadata';

interface Props {
  chainId: number;
  collection: { name: string; address: string };
  tokenId: string;
}

export const TokenName: FunctionComponent<Props> = ({ chainId, collection, tokenId }) => {
  const query = useQuery(['token metadata', chainId, collection, tokenId], async () => {
    const { tokenURI } = getLoaders(chainId);
    const resp = await tokenURI.load({ contract: collection.address, tokenId });
    const uri = resp.tokenURI;
    const metadata = await resolveMetadataByTokenURI(uri);
    return metadata;
  });

  if (query.data) {
    return <>{query.data.name}</>;
  }

  return (
    <>
      {collection.name} #{tokenId}
    </>
  );
};
