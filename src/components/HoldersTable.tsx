import React, { FunctionComponent } from 'react';
import { useQuery } from 'react-query';

import { timestampRelative } from '../lib/string';
import { Address } from './Address';
import { AddressPrefix } from './AddressPrefix';
import { Dimmed } from './Dimmed';
import { Table } from './Table';
import { getGraphClient } from '../shell/graph';
import { Loading } from './Loading';
import { None } from './None';
import { EngineLabel } from './EngineLabel';

interface Props {
  chainId: number;
  collectionAddress: string;
}

export const HoldersTable: FunctionComponent<Props> = ({ chainId, collectionAddress }) => {
  const holdersQuery = useQuery(['collection holders', chainId, collectionAddress], async () => {
    const client = getGraphClient(chainId);
    const resp = await client.collectionHolders({ address: collectionAddress });
    return resp.data;
  });

  if (holdersQuery.isLoading || !holdersQuery.data) {
    return <Loading message="Fetching holders..." />;
  }

  if (holdersQuery.data.collection.nftOwners.length === 0) {
    return <None />;
  }

  return (
    <Table>
      <thead>
        <tr>
          <td>Owner</td>
          <td>Owned</td>
          <td>Token</td>
          <td>Current Engine</td>
          <td>Last Activity</td>
        </tr>
      </thead>
      <tbody>
        {holdersQuery.data.collection.nftOwners.map((nftOwner) => (
          <tr key={nftOwner.id}>
            <td>
              <Address address={nftOwner.owner.address} />
            </td>
            <td>
              {nftOwner.balance}
              <Dimmed>/{nftOwner.nft.totalSupply}</Dimmed>
            </td>
            <td>
              {nftOwner.nft.collection.name} #{nftOwner.nft.tokenId}
            </td>
            <td>
              <EngineLabel forkId={nftOwner.nft.fork.forkId} engine={nftOwner.nft.fork.engine} />
            </td>
            <td>{timestampRelative(nftOwner.lastActivityAtTimestamp)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
