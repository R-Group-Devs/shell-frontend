import React, { FunctionComponent } from 'react';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { Address } from '../components/Address';
import { AddressPrefix } from '../components/AddressPrefix';
import { Content } from '../components/Content';
import { Dimmed } from '../components/Dimmed';
import { KeyValueList, KeyValueEntry } from '../components/KeyValueList';
import { Loading } from '../components/Loading';
import { None } from '../components/None';
import { PageSection } from '../components/PageSection';
import { StorageTable } from '../components/StorageTable';
import { Table } from '../components/Table';
import { Tabs } from '../components/Tabs';
import { TwoPanel } from '../components/TwoPanel';
import { useWallet } from '../hooks/wallet';
import { timestampRelative } from '../lib/string';
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

  const detailsQuery = useQuery(['nft details', network, collectionAddress, tokenId], async () => {
    const client = getGraphClient(viewChainInfo.chainId);
    const nftId = `${collectionAddress}-${tokenId}`;
    const resp = await client.getNftDetails({ nftId });
    console.log(resp.data);
    return resp.data;
  });

  if (detailsQuery.isLoading || !detailsQuery.data) {
    return <Loading message="Fetching NFT details..." />;
  }

  const nft = detailsQuery.data.nft;
  const mismatch = browseChainInfo.chainId !== viewChainInfo.chainId;

  return (
    <>
      <PageSection>
        <Content>
          <h2>
            {nft.collection.name} #{nft.tokenId}
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
                <KeyValueEntry label="Collection:">
                  <AddressPrefix address={nft.collection.address}>
                    <Link to={`/collections/${viewChainInfo.slug}/${nft.collection.address}`}>
                      {nft.collection.name}
                    </Link>
                  </AddressPrefix>
                </KeyValueEntry>
                <KeyValueEntry label="Engine:">
                  <AddressPrefix address={nft.fork.engine.address}>
                    <Link to={`/engines/${viewChainInfo.slug}/${nft.fork.engine.address}`}>{nft.fork.engine.name}</Link>
                  </AddressPrefix>
                </KeyValueEntry>
                <KeyValueEntry label="Fork:">
                  <Link to={`/forks/${viewChainInfo.slug}/${nft.collection.address}/${nft.fork.forkId}`}>
                    {nft.fork.forkId === '0' ? 'Root fork' : `Fork ${nft.fork.forkId}`}
                  </Link>
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
              label: <>Owners</>,
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
              label: <>Metadata</>,
              content: (
                <p style={{ textAlign: 'center' }}>
                  <Dimmed>(coming soon)</Dimmed>
                </p>
              ),
            },
            {
              label: <>Storage</>,
              content: <StorageTable storage={nft.storage} />,
            },
          ]}
        />
      </PageSection>
    </>
  );
};
