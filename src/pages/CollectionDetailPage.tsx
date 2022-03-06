import React, { FunctionComponent } from 'react';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { AddressPrefix } from '../components/AddressPrefix';
import { AddressViewable } from '../components/AddressViewable';
import { Content } from '../components/Content';
import { ForksTable } from '../components/ForksTable';
import { HoldersTable } from '../components/HoldersTable';
import { KeyValueEntry, KeyValueList } from '../components/KeyValueList';
import { Loading } from '../components/Loading';
import { NFTsTable } from '../components/NFTsTable';
import { PageSection } from '../components/PageSection';
import { Tabs } from '../components/Tabs';
import { TwoPanel } from '../components/TwoPanel';
import { useWallet } from '../hooks/wallet';
import { formatDate } from '../lib/string';
import { getGraphClient } from '../shell/graph';
import { getChainInfoBySlug } from '../shell/networks';

interface Params {
  network: string;
  address: string;
}

export const CollectionDetailPage: FunctionComponent = () => {
  const { network, address } = useParams<Params>();
  const { browseChainInfo } = useWallet();
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

  const mismatch = browseChainInfo.chainId !== chainInfo.chainId;

  return (
    <>
      <PageSection>
        <Content>
          <h2>
            <AddressPrefix address={collection.address}>
              {collection.name} ({collection.symbol})
            </AddressPrefix>
          </h2>
        </Content>
      </PageSection>
      <PageSection>
        <Content>
          <TwoPanel template="1fr 1fr">
            <div>
              <KeyValueList>
                <KeyValueEntry
                  label="Network:"
                  value={
                    <>
                      {mismatch && <>⚠️ </>}
                      {chainInfo.name}
                    </>
                  }
                />
                <KeyValueEntry label="Token model:" value={collection.implementation.name} />
                <KeyValueEntry label="Engine:">
                  <AddressPrefix address={collection.canonicalEngine.address}>
                    <Link to={`/engines/${chainInfo.slug}/${collection.canonicalEngine.address}`}>
                      {collection.canonicalEngine.name}
                    </Link>
                  </AddressPrefix>
                </KeyValueEntry>
              </KeyValueList>
            </div>
            <div>
              <KeyValueList>
                <KeyValueEntry
                  label="Owner:"
                  value={<AddressViewable address={collection.canonicalOwner.address} chainId={chainInfo.chainId} />}
                />
                <KeyValueEntry
                  label="Creator:"
                  value={<AddressViewable address={collection.creator.address} chainId={chainInfo.chainId} />}
                />
                <KeyValueEntry label="Created:" value={formatDate(collection.createdAtTimestamp)} />
              </KeyValueList>
            </div>
          </TwoPanel>
        </Content>
      </PageSection>
      <PageSection>
        <Tabs
          tabs={[
            {
              label: <>Holders</>,
              content: <HoldersTable chainId={chainInfo.chainId} collectionAddress={address} />,
            },
            {
              label: <>NFTs ({collection.nftCount.toLocaleString()})</>,
              content: <NFTsTable chainId={chainInfo.chainId} collectionAddress={address} />,
            },
            {
              label: <>Forks ({collection.forkCount})</>,
              content: <ForksTable chainId={chainInfo.chainId} collectionAddress={address} />,
            },
          ]}
        />
      </PageSection>
    </>
  );
};
