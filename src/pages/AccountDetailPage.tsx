import React, { FunctionComponent } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { Address } from '../components/Address';
import { CollectionsTable } from '../components/CollectionsTable';
import { Content } from '../components/Content';
import { ForksTable } from '../components/ForksTable';
import { HoldersTable } from '../components/HoldersTable';
import { KeyValueEntry, KeyValueList } from '../components/KeyValueList';
import { Loading } from '../components/Loading';
import { PageSection } from '../components/PageSection';
import { Tabs } from '../components/Tabs';
import { TwoPanel } from '../components/TwoPanel';
import { useWallet } from '../hooks/wallet';
import {
  getExplorerAddressUrl,
  getLooksrareAccuntUrl,
  getOpenseaProfileUrl,
  getRaribleProfileUrl,
} from '../shell/external-urls';
import { getGraphClient } from '../shell/graph';
import { getChainInfoBySlug } from '../shell/networks';

interface Params {
  network: string;
  address: string;
}

export const AccountDetailPage: FunctionComponent = () => {
  const { network, address } = useParams<Params>();
  const { browseChainInfo } = useWallet();
  const viewChainInfo = getChainInfoBySlug(network);

  const query = useQuery(['account details', network, address], async () => {
    const client = getGraphClient(viewChainInfo.chainId);
    const resp = await client.getAccount({ accountId: address });
    return resp.data;
  });

  if (query.isLoading || !query.data) {
    return <Loading message="Fetching account details..." />;
  }

  const mismatch = browseChainInfo.chainId !== viewChainInfo.chainId;

  const explorerUrl = getExplorerAddressUrl(viewChainInfo.chainId, address);
  const openseaUrl = getOpenseaProfileUrl(viewChainInfo.chainId, address);
  const looksrareUrl = getLooksrareAccuntUrl(viewChainInfo.chainId, address);
  const raribleUrl = getRaribleProfileUrl(viewChainInfo.chainId, address);

  return (
    <>
      <PageSection>
        <Content>
          <h2>
            👤 <Address address={address} disableTruncate />
          </h2>
        </Content>
      </PageSection>
      <PageSection>
        <Content>
          <TwoPanel>
            <div>
              <KeyValueList>
                <KeyValueEntry label="Network:">
                  {mismatch && <>⚠️ </>}
                  {viewChainInfo.name}
                </KeyValueEntry>
              </KeyValueList>
            </div>
            <div>
              <KeyValueList>
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
              label: <>🖼️ Owned NFTs</>,
              content: <HoldersTable chainId={viewChainInfo.chainId} filter={{ owner: address.toLowerCase() }} />,
            },
            {
              label: <>📚️ Owned Collections</>,
              content: (
                <CollectionsTable chainId={viewChainInfo.chainId} filter={{ canonicalOwner: address.toLowerCase() }} />
              ),
            },
            {
              label: <>🌱 Owned Forks</>,
              content: (
                <ForksTable
                  chainId={viewChainInfo.chainId}
                  filter={{ owner: address.toLocaleLowerCase(), forkId_gt: '0' }}
                />
              ),
            },
          ]}
        />
      </PageSection>
    </>
  );
};
