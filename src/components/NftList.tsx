import React, { FunctionComponent } from 'react';
import { useQuery } from 'react-query';
import { useWallet } from '../hooks/wallet';
import { timestampRelative } from '../lib/string';
import { getGraphClient } from '../shell/graph';
import { AddressPrefix } from './AddressPrefix';
import { Loading } from './Loading';
import { Table } from './Table';

export const NftList: FunctionComponent = () => {
  const { browseChainInfo } = useWallet();
  const { data, isLoading } = useQuery(['NftList', browseChainInfo.chainId], async () => {
    const client = getGraphClient(browseChainInfo.chainId);
    const resp = await client.nfts();
    return resp.data;
  });

  if (isLoading) {
    return <Loading message="fetching nfts..." />;
  }

  return (
    <Table>
      <thead>
        <tr>
          <td>Token</td>
          <td>Engine</td>
          <td>Supply</td>
          <td>Minted</td>
        </tr>
      </thead>
      <tbody>
        {data.nfts.map((nft) => (
          <tr key={nft.id}>
            <td>
              <AddressPrefix address={nft.collection.address}>{nft.collection.name}</AddressPrefix> #{nft.tokenId}
            </td>
            <td>
              <AddressPrefix address={nft.createdByEngine.address}>{nft.createdByEngine.name}</AddressPrefix>
            </td>
            <td>{nft.totalSupply}</td>
            <td>{timestampRelative(nft.createdAtTimestamp)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
