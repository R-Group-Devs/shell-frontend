import React, { FunctionComponent } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { AddressPrefix } from '../components/AddressPrefix';
import { CollectionsTable } from '../components/CollectionsTable';
import { Content } from '../components/Content';
import { ForksTable } from '../components/ForksTable';
import { KeyValueEntry, KeyValueList } from '../components/KeyValueList';
import { Loading } from '../components/Loading';
import { NFTsTable } from '../components/NFTsTable';
import { PageSection } from '../components/PageSection';
import { Tabs } from '../components/Tabs';
import { TwoPanel } from '../components/TwoPanel';
import { useWallet } from '../hooks/wallet';
import { formatDate } from '../lib/string';
import { getExplorerContractUrl } from '../shell/external-urls';
import { getGraphClient } from '../shell/graph';
import { Nft_OrderBy, OrderDirection } from '../shell/graph-generated';
import { getChainInfoBySlug } from '../shell/networks';

interface Params {
  network: string;
  address: string;
}

export const EngineDetailPage: FunctionComponent = () => {
  const { network, address } = useParams<Params>();
  const { browseChainInfo } = useWallet();
  const viewChainInfo = getChainInfoBySlug(network);

  const detailsQuery = useQuery(['engine details', network, address], async () => {
    const client = getGraphClient(viewChainInfo.chainId);
    const resp = await client.getEngine({ engineId: address });
    return resp.data;
  });

  if (detailsQuery.isLoading || !detailsQuery.data) {
    return <Loading message="Fetching engine details..." />;
  }

  const engine = detailsQuery.data.engine;
  const mismatch = browseChainInfo.chainId !== viewChainInfo.chainId;

  const explorerUrl = getExplorerContractUrl(viewChainInfo.chainId, address);

  return (
    <>
      <PageSection>
        <Content>
          <h2>
            ⚙️ <AddressPrefix address={engine.address}>{engine.name}</AddressPrefix>
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
              </KeyValueList>
            </div>
            <div>
              <KeyValueList>
                <KeyValueEntry label="Created:" value={formatDate(engine.createdAtTimestamp)} />
                <KeyValueEntry label="Links:">
                  <a href={explorerUrl} target="_blank">
                    Explorer
                  </a>
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
              label: <>📚 Collections ({engine.collectionCount})</>,
              content: <CollectionsTable chainId={viewChainInfo.chainId} filter={{ canonicalEngine: engine.id }} />,
            },
            {
              label: <>🌱 Forks ({engine.forkCount})</>,
              content: <ForksTable chainId={viewChainInfo.chainId} filter={{ engine: engine.id, forkId_gt: '0' }} />,
            },
            {
              label: <>🖼 Minted NFTs ({engine.mintedNftCount.toLocaleString()})</>,
              content: (
                <NFTsTable
                  chainId={viewChainInfo.chainId}
                  filter={{ createdByEngine: engine.id }}
                  orderBy={Nft_OrderBy.LastActivityAtTimestamp}
                  orderDirection={OrderDirection.Desc}
                  engineIdContext={engine.id}
                />
              ),
            },
          ]}
        />
      </PageSection>
    </>
  );
};
