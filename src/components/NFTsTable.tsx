import React, { FunctionComponent, useState } from 'react';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import { timestampRelative } from '../lib/string';
import { getGraphClient } from '../shell/graph';
import { Nft_Filter, Nft_OrderBy, OrderDirection } from '../shell/graph-generated';
import { getChainInfo } from '../shell/networks';
import { Dimmed } from './Dimmed';
import { Loading } from './Loading';
import { None } from './None';
import { Table } from './Table';
import { TokenName } from './TokenName';

interface Props {
  chainId: number;
  filter?: Nft_Filter;
  orderBy?: Nft_OrderBy;
  orderDirection?: OrderDirection;
  showMintEngine?: boolean;
  engineIdContext?: string;
}

export const NFTsTable: FunctionComponent<Props> = ({
  chainId,
  filter,
  showMintEngine,
  engineIdContext,
  orderBy,
  orderDirection,
}) => {
  const viewChain = getChainInfo(chainId);
  const history = useHistory();
  const [lastTokenId, setLastTokenId] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const nftQuery = useQuery(['get nfts', chainId, filter, orderBy, orderDirection], async () => {
    const client = getGraphClient(chainId);
    const resp = await client.getNfts({ filter, orderBy, orderDirection });
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
          <td>Token</td>
          {engineIdContext && <td>Collection</td>}
          <td>{showMintEngine ? 'Mint engine' : engineIdContext ? 'Current engine' : 'Fork (engine)'}</td>
          <td style={{ textAlign: 'center' }}>Supply</td>
          <td>Minted</td>
          {!engineIdContext && <td>Last Activity</td>}
        </tr>
      </thead>
      <tbody>
        {nftQuery.data.nfts.map((nft) => (
          <tr
            key={nft.id}
            onClick={() => history.push(`/nfts/${viewChain.slug}/${nft.collection.address}/${nft.tokenId}`)}
          >
            <td>
              <Dimmed>#{nft.tokenId}</Dimmed>{' '}
              <TokenName collection={nft.collection} tokenId={nft.tokenId} chainId={viewChain.chainId} />
            </td>
            {engineIdContext && <td>{nft.collection.name}</td>}
            <td>
              {showMintEngine ? (
                <>
                  {nft.fork.engine.id === nft.createdByEngine.id ? (
                    <Dimmed>(same as fork)</Dimmed>
                  ) : (
                    nft.createdByEngine.name
                  )}
                </>
              ) : engineIdContext ? (
                nft.fork.engine.id === engineIdContext ? (
                  <Dimmed>(this engine)</Dimmed>
                ) : (
                  nft.fork.engine.name
                )
              ) : (
                <>
                  {nft.fork.forkId === '0' ? (
                    <Dimmed>(same as root fork)</Dimmed>
                  ) : (
                    <>
                      Fork {nft.fork.forkId} ({nft.fork.engine.name})
                    </>
                  )}
                </>
              )}
            </td>
            <td style={{ textAlign: 'center' }}>{nft.totalSupply}</td>
            <td>{timestampRelative(nft.createdAtTimestamp)}</td>
            {!engineIdContext && <td>{timestampRelative(nft.lastActivityAtTimestamp)}</td>}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
