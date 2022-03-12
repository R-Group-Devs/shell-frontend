import React, { FunctionComponent } from 'react';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { AccountLink } from '../components/AccountLink';
import { AddressPrefix } from '../components/AddressPrefix';
import { Content } from '../components/Content';
import { KeyValueList, KeyValueEntry } from '../components/KeyValueList';
import { Loading } from '../components/Loading';
import { NFTsTable } from '../components/NFTsTable';
import { PageSection } from '../components/PageSection';
import { StorageTable } from '../components/StorageTable';
import { Tabs } from '../components/Tabs';
import { TwoPanel } from '../components/TwoPanel';
import { useWallet } from '../hooks/wallet';
import { formatDate } from '../lib/string';
import { getGraphClient } from '../shell/graph';
import { getChainInfoBySlug } from '../shell/networks';

interface Params {
  network: string;
  collectionAddress: string;
  forkId: string;
}

export const ForkDetailPage: FunctionComponent = () => {
  const { network, collectionAddress, forkId } = useParams<Params>();
  const { browseChainInfo } = useWallet();
  const viewChainInfo = getChainInfoBySlug(network);

  const detailsQuery = useQuery(['fork details', network, collectionAddress, forkId], async () => {
    const client = getGraphClient(viewChainInfo.chainId);
    const id = `${collectionAddress}-fork-${forkId}`;
    const resp = await client.forkDetail({ id });
    return resp.data;
  });

  if (detailsQuery.isLoading || !detailsQuery.data) {
    return <Loading message="Fetching fork details..." />;
  }

  const fork = detailsQuery.data.fork;
  const mismatch = browseChainInfo.chainId !== viewChainInfo.chainId;

  return (
    <>
      <PageSection>
        <Content>
          <h2>
            🌱{' '}
            <AddressPrefix address={fork.collection.address}>
              {forkId === '0' ? 'Root Fork' : `Fork ${forkId}`} - {fork.collection.name} ({fork.collection.symbol})
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
                      {viewChainInfo.name}
                    </>
                  }
                />
                <KeyValueEntry label="Collection:">
                  📚{' '}
                  <Link to={`/collections/${viewChainInfo.slug}/${fork.collection.address}`}>
                    {fork.collection.name}
                  </Link>
                </KeyValueEntry>
                <KeyValueEntry label="Engine:">
                  ⚙️ <Link to={`/engines/${viewChainInfo.slug}/${fork.engine.address}`}>{fork.engine.name}</Link>
                </KeyValueEntry>
              </KeyValueList>
            </div>
            <div>
              <KeyValueList>
                <KeyValueEntry
                  label="Admin:"
                  value={<AccountLink address={fork.owner.address} chainId={viewChainInfo.chainId} />}
                />
                <KeyValueEntry
                  label="Creator:"
                  value={<AccountLink address={fork.creator.address} chainId={viewChainInfo.chainId} />}
                />
                <KeyValueEntry label="Created:" value={formatDate(fork.createdAtTimestamp)} />
              </KeyValueList>
            </div>
          </TwoPanel>
        </Content>
      </PageSection>
      <PageSection>
        <Tabs
          tabs={[
            {
              label: <>🖼️ NFTs ({fork.nftCount.toLocaleString()})</>,
              content: <NFTsTable chainId={viewChainInfo.chainId} filter={{ fork: fork.id }} showMintEngine />,
            },
            {
              label: <>🪣 Fork Storage ({fork.storage.length})</>,
              content: <StorageTable storage={fork.storage} />,
            },
          ]}
        />
      </PageSection>
    </>
  );
};
