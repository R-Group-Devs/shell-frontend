import React, { FunctionComponent } from 'react';
import { CollectionList } from '../components/CollectionList';
import { Content } from '../components/Content';
import { PageSection } from '../components/PageSection';
import { Shell } from '../components/Shell';
import { useWallet } from '../hooks/wallet';

export const CollectionsPage: FunctionComponent = () => {
  const { browseChainInfo } = useWallet();
  return (
    <>
      <PageSection>
        <Content>
          <h2>Collections on {browseChainInfo.name}</h2>
          <p>
            Browse the ERC-721 NFT collections launched on <Shell />.
          </p>
        </Content>
      </PageSection>
      <PageSection>
        <Content>
          <CollectionList />
        </Content>
      </PageSection>
    </>
  );
};
