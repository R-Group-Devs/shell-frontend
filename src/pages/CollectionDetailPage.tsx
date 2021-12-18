import React, { FunctionComponent } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { Address } from '../components/Address';
import { AddressPrefix } from '../components/AddressPrefix';
import { AddressViewable } from '../components/AddressViewable';
import { Button } from '../components/Button';
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

  return (
    <>
      <PageSection>
        <Content>
          <h2>{collection.name}</h2>
        </Content>
      </PageSection>
      <PageSection>
        <Content>
          <TwoPanel template="2fr 1fr">
            <div>
              <KeyValueList>
                <KeyValueEntry label="Network:" value={chainInfo.name} />
                <KeyValueEntry
                  label="ERC-721 Address:"
                  value={<AddressViewable address={collection.address} chainId={chainInfo.chainId} isToken />}
                />
                <KeyValueEntry label="Installed Engine:">
                  <AddressPrefix address={collection.engine.address}>{collection.engine.name}</AddressPrefix>
                </KeyValueEntry>
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
          <h3>NFTs</h3>
          <Table>
            <thead>
              <tr>
                <td>Token</td>
                <td>Engine</td>
                <td>Owner</td>
                <td>Minted</td>
              </tr>
            </thead>
            <tbody>
              {detailsQuery.data.collection.nfts.map((nft) => (
                <tr key={nft.id}>
                  <td>
                    <AddressPrefix address={nft.collection.address}>{nft.collection.name}</AddressPrefix> #{nft.tokenId}
                  </td>
                  <td>
                    <AddressPrefix address={nft.mintedByEngine.address}>{nft.mintedByEngine.name}</AddressPrefix>
                  </td>
                  <td>
                    <Address address={nft.owner.address} />
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
