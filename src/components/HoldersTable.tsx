import React, { FunctionComponent } from 'react';
import { useQuery } from 'react-query';

import { timestampRelative } from '../lib/string';
import { Address } from './Address';
import { Dimmed } from './Dimmed';
import { Table } from './Table';
import { getGraphClient } from '../shell/graph';
import { Loading } from './Loading';
import { None } from './None';
import { useHistory } from 'react-router-dom';
import { getChainInfo } from '../shell/networks';
import { TokenName } from './TokenName';

interface Props {
  chainId: number;
  collectionAddress: string;
}

export const HoldersTable: FunctionComponent<Props> = ({ chainId, collectionAddress }) => {
  const viewChain = getChainInfo(chainId);
  const history = useHistory();
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
          <td>Fork (engine)</td>
          <td>Last Activity</td>
        </tr>
      </thead>
      <tbody>
        {holdersQuery.data.collection.nftOwners.map((nftOwner) => (
          <tr
            key={nftOwner.id}
            onClick={() => history.push(`/nfts/${viewChain.slug}/${collectionAddress}/${nftOwner.nft.tokenId}`)}
          >
            <td>
              <Address address={nftOwner.owner.address} />
            </td>
            <td>
              {nftOwner.balance}
              <Dimmed>/{nftOwner.nft.totalSupply}</Dimmed>
            </td>
            <td>
              <Dimmed>#{nftOwner.nft.tokenId}</Dimmed>{' '}
              <TokenName chainId={chainId} collection={nftOwner.nft.collection} tokenId={nftOwner.nft.tokenId} />
            </td>
            <td>
              {nftOwner.nft.fork.forkId === '0' ? (
                <Dimmed>(same as root fork)</Dimmed>
              ) : (
                <>
                  Fork {nftOwner.nft.fork.forkId} ({nftOwner.nft.fork.engine.name})
                </>
              )}
            </td>
            <td>{timestampRelative(nftOwner.lastActivityAtTimestamp)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
