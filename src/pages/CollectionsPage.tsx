import React, { FunctionComponent } from 'react';
import { Content } from '../components/Content';
import { PageSection } from '../components/PageSection';
import { Shell } from '../components/Shell';

export const CollectionsPage: FunctionComponent = () => {
  return (
    <PageSection>
      <Content>
        <h2>Collections</h2>
        <p>
          Browse the ERC-721 NFT collections launched on <Shell />.
        </p>
      </Content>
    </PageSection>
  );
};
