import React, { FunctionComponent } from 'react';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { Address } from '../components/Address';
import { Content } from '../components/Content';
import { Dimmed } from '../components/Dimmed';
import { KeyValueList, KeyValueEntry } from '../components/KeyValueList';
import { Loading } from '../components/Loading';
import { None } from '../components/None';
import { PageSection } from '../components/PageSection';
import { StorageTable } from '../components/StorageTable';
import { Table } from '../components/Table';
import { Tabs } from '../components/Tabs';
import { TokenName } from '../components/TokenName';
import { TwoPanel } from '../components/TwoPanel';
import { useTokenMetadata } from '../hooks/token-metadata';
import { useWallet } from '../hooks/wallet';
import { timestampRelative } from '../lib/string';
import { getLooksrareTokenUrl, getOpenseaTokenUrl, getRaribleTokenUrl } from '../shell/external-urls';
import { getGraphClient } from '../shell/graph';
import { getChainInfoBySlug } from '../shell/networks';

interface Params {
  network: string;
  collectionAddress: string;
  tokenId: string;
}

export const NFTDetailPage: FunctionComponent = () => {
  const { network, collectionAddress, tokenId } = useParams<Params>();
  const { browseChainInfo } = useWallet();
  const viewChainInfo = getChainInfoBySlug(network);
  const metadataQuery = useTokenMetadata(viewChainInfo.chainId, collectionAddress, tokenId);

  const detailsQuery = useQuery(['nft details', network, collectionAddress, tokenId], async () => {
    const client = getGraphClient(viewChainInfo.chainId);
    const nftId = `${collectionAddress}-${tokenId}`;
    const resp = await client.getNftDetails({ nftId });
    return resp.data;
  });

  if (detailsQuery.isLoading || !detailsQuery.data) {
    return <Loading message="Fetching NFT details..." />;
  }

  const nft = detailsQuery.data.nft;
  const mismatch = browseChainInfo.chainId !== viewChainInfo.chainId;

  const openseaUrl = getOpenseaTokenUrl(viewChainInfo.chainId, collectionAddress, tokenId);
  const raribleUrl = getRaribleTokenUrl(viewChainInfo.chainId, collectionAddress, tokenId);
  const looksrareUrl = getLooksrareTokenUrl(viewChainInfo.chainId, collectionAddress, tokenId);

  return (
    <>
      <PageSection>
        <Content>
          <h2>
            🖼️ <Dimmed>#{nft.tokenId}</Dimmed>{' '}
            <TokenName collection={nft.collection} tokenId={nft.tokenId} chainId={viewChainInfo.chainId} />
          </h2>
        </Content>
      </PageSection>
      <PageSection>
        <Content>
          <TwoPanel template="1fr 1fr">
            <div>image</div>
            <div>
              <KeyValueList>
                <KeyValueEntry
                  label="Network:"
                  value={
                    <>
                      {mismatch && <>⚠️ </>}
                      {viewChainInfo.name}
                    </>
                  }
                />
                <KeyValueEntry label="Token model:">{nft.collection.implementation.name}</KeyValueEntry>
                <KeyValueEntry label="Metadata:">{metadataQuery.data?.source}</KeyValueEntry>
                <KeyValueEntry label="Asset:">
                  {metadataQuery.data?.image.type === 'inline-svg'
                    ? 'inline-svg'
                    : metadataQuery.data?.image.url.ipfsUri
                    ? 'ipfs'
                    : 'https'}
                </KeyValueEntry>
                <KeyValueEntry label="Collection:">
                  📚{' '}
                  <Link to={`/collections/${viewChainInfo.slug}/${nft.collection.address}`}>{nft.collection.name}</Link>
                </KeyValueEntry>
                <KeyValueEntry label="Mint engine:">
                  ⚙️{' '}
                  <Link to={`/engines/${viewChainInfo.slug}/${nft.createdByEngine.address}`}>
                    {nft.createdByEngine.name}
                  </Link>
                </KeyValueEntry>
                <KeyValueEntry label="Current engine:">
                  ⚙️{' '}
                  <Link to={`/engines/${viewChainInfo.slug}/${nft.fork.engine.address}`}>{nft.fork.engine.name}</Link>
                </KeyValueEntry>

                <KeyValueEntry label="Fork:">
                  🌱{' '}
                  <Link to={`/forks/${viewChainInfo.slug}/${nft.collection.address}/${nft.fork.forkId}`}>
                    {nft.fork.forkId === '0' ? 'Root fork' : `Fork ${nft.fork.forkId}`}
                  </Link>
                </KeyValueEntry>
                <KeyValueEntry label="Links:">
                  {looksrareUrl && (
                    <a href={looksrareUrl} target="_blank">
                      LooksRare
                    </a>
                  )}{' '}
                  {raribleUrl && (
                    <a href={raribleUrl} target="_blank">
                      Rarible
                    </a>
                  )}{' '}
                  {openseaUrl && (
                    <a href={openseaUrl} target="_blank">
                      OpenSea
                    </a>
                  )}{' '}
                </KeyValueEntry>
              </KeyValueList>
            </div>
          </TwoPanel>
        </Content>
      </PageSection>
      <PageSection>
        <Tabs
          tabs={[
            {
              label: <>👤 Owners ({nft.owners.length})</>,
              content:
                nft.owners.length === 0 ? (
                  <None />
                ) : (
                  <Table>
                    <thead>
                      <tr>
                        <td>Owner</td>
                        <td>Owned</td>
                        <td>Owner since</td>
                        <td>Last activity</td>
                      </tr>
                    </thead>
                    <tbody>
                      {nft.owners.map((owner) => (
                        <tr>
                          <td>
                            <Address address={owner.owner.address} />
                          </td>
                          <td>{Number(owner.balance).toLocaleString()}</td>
                          <td>{timestampRelative(owner.createdAtTimestamp)}</td>
                          <td>{timestampRelative(owner.lastActivityAtTimestamp)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ),
            },
            {
              label: <>📂 Metadata</>,
              content: <None message="(coming soon)" />,
            },
            {
              label: <>🪣 Token Storage ({nft.storage.length})</>,
              content: <StorageTable storage={nft.storage} />,
            },
          ]}
        />
      </PageSection>
    </>
  );
};
