import React, { FunctionComponent } from 'react';
import { useQuery } from 'react-query';
import { timestampRelative } from '../lib/string';
import { getGraphClient } from '../shell/graph';
import { Address } from './Address';
import { AddressPrefix } from './AddressPrefix';
import { Dimmed } from './Dimmed';
import { Loading } from './Loading';
import { None } from './None';
import { Percentage } from './Percentage';
import { Table } from './Table';

interface Props {
  chainId: number;
  collectionAddress: string;
}

export const ForksTable: FunctionComponent<Props> = ({ chainId, collectionAddress }) => {
  const nftQuery = useQuery(['collection forks', chainId, collectionAddress], async () => {
    const client = getGraphClient(chainId);
    const resp = await client.collectionForks({ address: collectionAddress });
    return resp.data;
  });

  if (nftQuery.isLoading || !nftQuery.data) {
    return <Loading message="Fetching forks..." />;
  }

  if (nftQuery.data.collection.forks.length === 0) {
    return <None />;
  }

  return (
    <Table>
      <thead>
        <tr>
          <td>Fork</td>
          <td>Engine</td>
          <td>NFT Count</td>
          <td>Owner</td>
          <td>Created</td>
        </tr>
      </thead>
      <tbody>
        {nftQuery.data.collection.forks.map((fork) => (
          <tr key={fork.id}>
            <td>{fork.forkId === '0' ? 'Root Fork *' : `Fork ${fork.forkId}`}</td>
            <td>
              <AddressPrefix address={fork.engine.address}>{fork.engine.name}</AddressPrefix>
            </td>
            <td>
              {fork.nftCount}{' '}
              <Dimmed>
                (<Percentage amount={fork.nftCount / nftQuery.data.collection.nftCount} />
                %)
              </Dimmed>
            </td>
            <td>
              <Address address={fork.owner.address} />
            </td>
            <td>{timestampRelative(fork.createdAtTimestamp)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
