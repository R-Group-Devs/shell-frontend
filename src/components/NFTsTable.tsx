import React, { FunctionComponent } from 'react';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import { timestampRelative } from '../lib/string';
import { getGraphClient } from '../shell/graph';
import { Nft_Filter } from '../shell/graph-generated';
import { getChainInfo } from '../shell/networks';
import { EngineLabel } from './EngineLabel';
import { Loading } from './Loading';
import { None } from './None';
import { Table } from './Table';

interface Props {
  chainId: number;
  filter?: Nft_Filter;
  hideCurrentEngine?: boolean;
}

export const NFTsTable: FunctionComponent<Props> = ({ chainId, filter, hideCurrentEngine }) => {
  const viewChain = getChainInfo(chainId);
  const history = useHistory();
  const nftQuery = useQuery(['get nfts', chainId, filter], async () => {
    const client = getGraphClient(chainId);
    const resp = await client.getNfts({ filter });
    return resp.data;
  });

  if (nftQuery.isLoading || !nftQuery.data) {
    return <Loading message="Fetching NFTs..." />;
  }

  if (nftQuery.data.nfts.length === 0) {
    return <None />;
  }

  return (
    <Table>
      <thead>
        <tr>
          <td>Supply</td>
          <td>Token</td>
          {!hideCurrentEngine && <td>Current Engine</td>}
          <td>Mint Engine</td>
          <td>Minted</td>
          <td>Last Activity</td>
        </tr>
      </thead>
      <tbody>
        {nftQuery.data.nfts.map((nft) => (
          <tr
            key={nft.id}
            onClick={() => history.push(`/nfts/${viewChain.slug}/${nft.collection.address}/${nft.tokenId}`)}
          >
            <td>{nft.totalSupply}</td>
            <td>
              {nft.collection.name} #{nft.tokenId}
            </td>
            {!hideCurrentEngine && (
              <td>
                <EngineLabel forkId={nft.fork.forkId} engine={nft.fork.engine} />
              </td>
            )}
            <td>
              <EngineLabel engine={nft.createdByEngine} rootEngineAddress={nft.collection.canonicalEngine.address} />
            </td>
            <td>{timestampRelative(nft.createdAtTimestamp)}</td>
            <td>{timestampRelative(nft.lastActivityAtTimestamp)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
