import React, { FunctionComponent } from 'react';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import { timestampRelative } from '../lib/string';
import { getGraphClient } from '../shell/graph';
import { Collection_Filter } from '../shell/graph-generated';
import { getChainInfo } from '../shell/networks';
import { Address } from './Address';
import { AddressPrefix } from './AddressPrefix';
import { Loading } from './Loading';
import { None } from './None';
import { Table } from './Table';

interface Props {
  chainId: number;
  filter?: Collection_Filter;
}

export const CollectionsTable: FunctionComponent<Props> = ({ chainId, filter }) => {
  const viewChain = getChainInfo(chainId);
  const history = useHistory();
  const query = useQuery(['get collections', chainId, filter], async () => {
    const client = getGraphClient(chainId);
    const resp = await client.collections({ filter });
    return resp.data;
  });

  if (query.isLoading || !query.data) {
    return <Loading message="Fetching collections..." />;
  }

  if (query.data.collections.length === 0) {
    return <None />;
  }

  return (
    <Table>
      <thead>
        <tr>
          <td>Collection</td>
          <td>Engine</td>
          <td>Owner</td>
          <td style={{ textAlign: 'center' }}>NFTs</td>
          <td>Last Activity</td>
        </tr>
      </thead>
      <tbody>
        {query.data.collections.map((c) => (
          <tr key={c.id} onClick={() => history.push(`/collections/${viewChain.slug}/${c.address}`)}>
            <td>
              <AddressPrefix address={c.address}>{c.name}</AddressPrefix>
            </td>
            <td>{c.canonicalEngine.name}</td>
            <td>
              <Address address={c.canonicalOwner.address} />
            </td>
            <td style={{ textAlign: 'center' }}>{c.nftCount.toLocaleString()}</td>
            <td>{timestampRelative(c.lastActivityAtTimestamp)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
