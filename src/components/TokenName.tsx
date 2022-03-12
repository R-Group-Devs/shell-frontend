import React, { FunctionComponent } from 'react';
import { useTokenMetadata } from '../hooks/token-metadata';

interface Props {
  chainId: number;
  collection: { name: string; address: string };
  tokenId: string;
}

export const TokenName: FunctionComponent<Props> = ({ chainId, collection, tokenId }) => {
  const query = useTokenMetadata(chainId, collection.address, tokenId);

  if (query.data) {
    return <>{query.data.name}</>;
  }

  return (
    <>
      {collection.name} #{tokenId}
    </>
  );
};
