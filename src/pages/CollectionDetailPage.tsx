import React, { FunctionComponent } from 'react';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { Address } from '../components/Address';
import { AddressPrefix } from '../components/AddressPrefix';
import { AddressViewable } from '../components/AddressViewable';
import { Content } from '../components/Content';
import { KeyValueEntry, KeyValueList } from '../components/KeyValueList';
import { Loading } from '../components/Loading';
import { PageSection } from '../components/PageSection';
import { Table } from '../components/Table';
import { TwoPanel } from '../components/TwoPanel';
import { formatDate, timestampRelative } from '../lib/string';
import { getGraphClient } from '../shell/graph';
import { getChainInfoBySlug } from '../shell/networks';

interface Params {
  network: string;
  address: string;
}

export const CollectionDetailPage: FunctionComponent = () => {
  const { network, address } = useParams<Params>();
  const chainInfo = getChainInfoBySlug(network);

  const detailsQuery = useQuery(['collection details', network, address], async () => {
    const client = getGraphClient(chainInfo.chainId);
    const resp = await client.collectionDetail({ address });
    return resp.data;
  });

  if (detailsQuery.isLoading || !detailsQuery.data) {
    return <Loading message="Fetching collection details..." />;
  }

  const collection = detailsQuery.data.collection;

  if (detailsQuery.isError || !collection) {
    return <p style={{ textAlign: 'center' }}>Unable to load collection</p>;
  }

  return (
    <>
      <PageSection>
        <Content>
          <h2>
            <AddressPrefix address={collection.address}>{collection.name}</AddressPrefix>
          </h2>
        </Content>
      </PageSection>
      <PageSection>
        <Content>
          <TwoPanel template="1fr 1fr">
            <div>
              <KeyValueList>
                <KeyValueEntry label="Network:" value={chainInfo.name} />
                <KeyValueEntry label="Token model:" value={collection.implementation.name} />
                <KeyValueEntry label="Engine:">
                  <AddressPrefix address={collection.engine.address}>
                    <Link to={`/engines/${chainInfo.slug}/${collection.engine.address}`}>{collection.engine.name}</Link>
                  </AddressPrefix>
                </KeyValueEntry>
                <KeyValueEntry
                  label="Address:"
                  value={<AddressViewable address={collection.address} chainId={chainInfo.chainId} isToken />}
                />
                <KeyValueEntry
                  label="Owner:"
                  value={<AddressViewable address={collection.owner.address} chainId={chainInfo.chainId} />}
                />
              </KeyValueList>
            </div>
            <div>
              <KeyValueList>
                <KeyValueEntry label="Symbol:" value={collection.symbol} />
                <KeyValueEntry
                  label="Creator:"
                  value={<AddressViewable address={collection.creator.address} chainId={chainInfo.chainId} />}
                />
                <KeyValueEntry label="Created:" value={formatDate(collection.createdAtTimestamp)} />
                <KeyValueEntry label="Last activity:" value={timestampRelative(collection.lastActivityAtTimestamp)} />
                <KeyValueEntry label="Total NFTs" value={collection.nftCount} />
              </KeyValueList>
            </div>
          </TwoPanel>
          <h3>Holders</h3>
          <Table>
            <thead>
              <tr>
                <td>Owner</td>
                <td>Token</td>
                <td>Engine</td>
                <td>Minted</td>
              </tr>
            </thead>
            <tbody>
              {detailsQuery.data.collection.nfts.map((nft) => (
                <tr key={nft.id}>
                  <td>
                    <Address address={nft.owner.address} />
                  </td>
                  <td>
                    <AddressPrefix address={nft.collection.address}>{nft.collection.name}</AddressPrefix> #{nft.tokenId}
                  </td>
                  <td>
                    <AddressPrefix address={nft.mintedByEngine.address}>{nft.mintedByEngine.name}</AddressPrefix>
                  </td>
                  <td>{timestampRelative(nft.createdAtTimestamp)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Content>
      </PageSection>
    </>
  );
};
