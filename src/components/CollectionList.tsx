import React, { FunctionComponent } from 'react';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import { useWallet } from '../hooks/wallet';
import { timestampRelative } from '../lib/string';
import { getCollections } from '../shell/graph';
import { Address } from './Address';
import { AddressPrefix } from './AddressPrefix';
import { Loading } from './Loading';
import { Table } from './Table';

export const CollectionList: FunctionComponent = () => {
  const { browseChainInfo } = useWallet();
  const history = useHistory();
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
          <td style={{ textAlign: 'center' }}>NFTs</td>
          <td>Owner</td>
          <td>Last Activity</td>
        </tr>
      </thead>
      <tbody>
        {data.collections.map((c) => (
          <tr key={c.id} onClick={() => history.push(`/collections/${browseChainInfo.slug}/${c.address}`)}>
            <td>
              <AddressPrefix address={c.address}>
                {c.name} ({c.symbol})
              </AddressPrefix>
            </td>
            <td>
              <AddressPrefix address={c.engine.address}>{c.engine.name}</AddressPrefix>
            </td>
            <td style={{ textAlign: 'center' }}>{c.nftCount}</td>
            <td>
              <Address address={c.owner.address} />
            </td>
            <td>{timestampRelative(c.lastActivityAtTimestamp)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
