import React, { FunctionComponent } from 'react';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { AddressPrefix } from '../components/AddressPrefix';
import { Content } from '../components/Content';
import { KeyValueList, KeyValueEntry } from '../components/KeyValueList';
import { Loading } from '../components/Loading';
import { PageSection } from '../components/PageSection';
import { TwoPanel } from '../components/TwoPanel';
import { useWallet } from '../hooks/wallet';
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
            <AddressPrefix address={nft.collection.address}>
              {nft.collection.name} #{nft.tokenId}
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
                  <AddressPrefix address={nft.collection.address}>
                    <Link to={`/collections/${viewChainInfo.slug}/${nft.collection.address}`}>
                      {nft.collection.name}
                    </Link>
                  </AddressPrefix>
                </KeyValueEntry>
                <KeyValueEntry label="Fork:">
                  <AddressPrefix address={nft.fork.engine.address}>
                    <Link to={`/forks/${viewChainInfo.slug}/${nft.collection.address}/${nft.fork.forkId}`}>
                      {nft.fork.engine.name}
                    </Link>
                  </AddressPrefix>
                </KeyValueEntry>
              </KeyValueList>
            </div>
            <div></div>
          </TwoPanel>
        </Content>
      </PageSection>
    </>
  );
};
