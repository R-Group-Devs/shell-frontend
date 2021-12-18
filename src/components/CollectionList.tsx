import React, { FunctionComponent } from 'react';
import { useQuery } from 'react-query';
import { useWallet } from '../hooks/wallet';
import { timestampRelative } from '../lib/string';
import { getCollections } from '../shell/graph';
import { Address } from './Address';
import { AddressPrefix } from './AddressPrefix';
import { Loading } from './Loading';
import { Table } from './Table';

export const CollectionList: FunctionComponent = () => {
  const { browseChainInfo } = useWallet();
  const { data, isLoading } = useQuery(['CollectionList', browseChainInfo.chainId], () =>
    getCollections({ chainId: browseChainInfo.chainId })
  );

  if (isLoading) {
    return <Loading message="fetching collections..." />;
  }

  return (
    <Table>
      <thead>
        <tr>
          <td>Collection</td>
          <td>Engine</td>
          <td>NFTs</td>
          <td>Creator</td>
          <td>Last Activity</td>
        </tr>
      </thead>
      <tbody>
        {data.collections.map((c) => (
          <tr key={c.id}>
            <td>
              <AddressPrefix address={c.address}>
                {c.name} ({c.symbol})
              </AddressPrefix>
            </td>
            <td>
              <AddressPrefix address={c.engine.address}>{c.engine.name}</AddressPrefix>
            </td>
            <td style={{ textAlign: 'right' }}>{c.nftCount}</td>
            <td>
              <Address address={c.creator.address} />
            </td>
            <td>{timestampRelative(c.lastActivityAtTimestamp)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
