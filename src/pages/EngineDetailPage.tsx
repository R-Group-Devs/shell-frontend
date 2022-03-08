import React, { FunctionComponent } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { AddressPrefix } from '../components/AddressPrefix';
import { Content } from '../components/Content';
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

  return (
    <>
      <PageSection>
        <Content>
          <h2>
            <AddressPrefix address={engine.address}>{engine.name}</AddressPrefix>
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
              </KeyValueList>
            </div>
          </TwoPanel>
        </Content>
      </PageSection>
      <PageSection>
        <Tabs
          tabs={[
            {
              label: <>Forks</>,
              content: null,
            },
            {
              label: <>Collections</>,
              content: null,
            },
            {
              label: <>Minted NFTs</>,
              content: <NFTsTable chainId={viewChainInfo.chainId} filter={{ createdByEngine: engine.id }} />,
            },
          ]}
        />
      </PageSection>
    </>
  );
};
