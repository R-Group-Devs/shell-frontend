import React, { FunctionComponent } from 'react';
import { timestampRelative } from '../lib/string';
import { Address } from './Address';
import { AddressPrefix } from './AddressPrefix';
import { Dimmed } from './Dimmed';
import { Table } from './Table';
import { NftOwnerInfoFragment } from '../shell/graph-generated';

interface Props {
  owners?: NftOwnerInfoFragment[];
}

export const HoldersTable: FunctionComponent<Props> = ({ owners }) => {
  if (!owners) return null;

  if (owners.length === 0) {
    return (
      <p style={{ textAlign: 'center' }}>
        <Dimmed>(none)</Dimmed>
      </p>
    );
  }

  return (
    <Table>
      <thead>
        <tr>
          <td>Owner</td>
          <td>Owned</td>
          <td>Token</td>
          <td>Engine</td>
          <td>Last Activity</td>
        </tr>
      </thead>
      <tbody>
        {owners.map((nftOwner) => (
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
              <AddressPrefix address={nftOwner.nft.createdByEngine.address}>
                {nftOwner.nft.createdByEngine.name}
              </AddressPrefix>
            </td>
            <td>{timestampRelative(nftOwner.lastActivityAtTimestamp)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
