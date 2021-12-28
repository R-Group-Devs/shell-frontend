import React, { FunctionComponent } from 'react';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { Address } from '../components/Address';
import { AddressPrefix } from '../components/AddressPrefix';
import { AddressViewable } from '../components/AddressViewable';
import { Content } from '../components/Content';
import { Dimmed } from '../components/Dimmed';
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
                <td>Owned</td>
                <td>Token</td>
                <td>Engine</td>
                <td>Last Activity</td>
              </tr>
            </thead>
            <tbody>
              {detailsQuery.data.collection.nftOwners.map((nftOwner) => (
                <tr key={nftOwner.id}>
                  <td>
                    <Address address={nftOwner.owner.address} />
                  </td>
                  <td>
                    {nftOwner.balance}
                    <Dimmed>/{nftOwner.nft.totalSupply}</Dimmed>
                  </td>
                  <td>
                    <AddressPrefix address={nftOwner.nft.collection.address}>
                      {nftOwner.nft.collection.name}
                    </AddressPrefix>{' '}
                    #{nftOwner.nft.tokenId}
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
        </Content>
      </PageSection>
    </>
  );
};
