import React, { FunctionComponent } from 'react';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import { timestampRelative } from '../lib/string';
import { getGraphClient } from '../shell/graph';
import { Fork_Filter, Fork_OrderBy, OrderDirection } from '../shell/graph-generated';
import { getChainInfo } from '../shell/networks';
import { Address } from './Address';
import { Dimmed } from './Dimmed';
import { Loading } from './Loading';
import { None } from './None';
import { Percentage } from './Percentage';
import { Table } from './Table';

interface Props {
  chainId: number;
  filter?: Fork_Filter;
  orderBy?: Fork_OrderBy;
  orderDirection?: OrderDirection;
}

export const ForksTable: FunctionComponent<Props> = ({ chainId, filter, orderBy, orderDirection }) => {
  const viewChain = getChainInfo(chainId);
  const history = useHistory();
  const nftQuery = useQuery(['get forks', chainId, filter, orderBy, orderDirection], async () => {
    const client = getGraphClient(chainId);
    const resp = await client.getForks({ filter, orderBy, orderDirection });
    return resp.data;
  });

  if (nftQuery.isLoading || !nftQuery.data) {
    return <Loading message="Fetching forks..." />;
  }

  if (nftQuery.data.forks.length === 0) {
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
        {nftQuery.data.forks.map((fork) => (
          <tr
            key={fork.id}
            onClick={() => history.push(`/forks/${viewChain.slug}/${fork.collection.address}/${fork.forkId}`)}
          >
            <td>{fork.forkId === '0' ? <strong>Root Fork *</strong> : `Fork ${fork.forkId}`}</td>
            <td>{fork.engine.name}</td>
            <td>
              <>
                {fork.nftCount.toLocaleString()}{' '}
                {fork.nftCount > 0 && (
                  <Dimmed>
                    (<Percentage amount={fork.nftCount / fork.collection.nftCount} />
                    %)
                  </Dimmed>
                )}
              </>
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
