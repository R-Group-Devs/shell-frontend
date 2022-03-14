import React, { FunctionComponent, useState } from 'react';
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
import { NftOwner_Filter } from '../shell/graph-generated';
import { Pagination } from './Pagination';

interface Props {
  chainId: number;
  filter?: NftOwner_Filter;
}

const LIMIT = 20;

export const HoldersTable: FunctionComponent<Props> = ({ chainId, filter }) => {
  const viewChain = getChainInfo(chainId);
  const history = useHistory();
  const [page, setPage] = useState(1);
  const query = useQuery(['get nft owners', chainId, filter, page], async () => {
    const client = getGraphClient(chainId);
    const resp = await client.getNftOwners({ filter, limit: LIMIT, offset: (page - 1) * LIMIT });
    return resp.data;
  });

  if (query.isLoading || !query.data) {
    return <Loading message="Fetching holders..." />;
  }

  if (query.data.nftowners.length === 0) {
    return <None />;
  }

  // TODO: thegraph doesnt do well with large offests, deep pagination needs to use filters
  const maxGraphPages = Math.floor(1000 / LIMIT);
  const totalPages = query.data.nftowners.length < LIMIT ? page : maxGraphPages;
  const onPageChange = (n: number) => setPage(n);

  return (
    <>
      <Table>
        <thead>
          <tr>
            {!filter.owner && <td>Owner</td>}
            <td>Owned</td>
            <td>Token</td>
            <td>Fork (engine)</td>
            <td>Last Activity</td>
          </tr>
        </thead>
        <tbody>
          {query.data.nftowners.map((nftOwner) => (
            <tr
              key={nftOwner.id}
              onClick={() =>
                history.push(`/nfts/${viewChain.slug}/${nftOwner.nft.collection.address}/${nftOwner.nft.tokenId}`)
              }
            >
              {!filter.owner && (
                <td>
                  <Address address={nftOwner.owner.address} />
                </td>
              )}
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
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={onPageChange} />
    </>
  );
};
