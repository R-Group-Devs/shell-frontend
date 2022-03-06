import React, { FunctionComponent } from 'react';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import { timestampRelative } from '../lib/string';
import { getGraphClient } from '../shell/graph';
import { getChainInfo } from '../shell/networks';
import { EngineLabel } from './EngineLabel';
import { Loading } from './Loading';
import { None } from './None';
import { Table } from './Table';

interface Props {
  chainId: number;
  collectionAddress: string;
}

export const NFTsTable: FunctionComponent<Props> = ({ chainId, collectionAddress }) => {
  const viewChain = getChainInfo(chainId);
  const history = useHistory();
  const nftQuery = useQuery(['collection nfts', chainId, collectionAddress], async () => {
    const client = getGraphClient(chainId);
    const resp = await client.collectionNfts({ address: collectionAddress });
    return resp.data;
  });

  if (nftQuery.isLoading || !nftQuery.data) {
    return <Loading message="Fetching NFTs..." />;
  }

  if (nftQuery.data.collection.nfts.length === 0) {
    return <None />;
  }

  return (
    <Table>
      <thead>
        <tr>
          <td>Supply</td>
          <td>Token</td>
          <td>Current Engine</td>
          <td>Mint Engine</td>
          <td>Minted</td>
          <td>Last Activity</td>
        </tr>
      </thead>
      <tbody>
        {nftQuery.data.collection.nfts.map((nft) => (
          <tr key={nft.id} onClick={() => history.push(`/nfts/${viewChain.slug}/${collectionAddress}/${nft.tokenId}`)}>
            <td>{nft.totalSupply}</td>
            <td>
              {nft.collection.name} #{nft.tokenId}
            </td>
            <td>
              <EngineLabel forkId={nft.fork.forkId} engine={nft.fork.engine} />
            </td>
            <td>
              <EngineLabel
                engine={nft.createdByEngine}
                rootEngineAddress={nftQuery.data.collection.forks[0].engine.address}
              />
            </td>
            <td>{timestampRelative(nft.createdAtTimestamp)}</td>
            <td>{timestampRelative(nft.lastActivityAtTimestamp)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
