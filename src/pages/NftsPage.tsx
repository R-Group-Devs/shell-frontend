import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { Content } from '../components/Content';
import { PageSection } from '../components/PageSection';
import { Shell } from '../components/Shell';

export const NftsPage: FunctionComponent = () => {
  return (
    <PageSection>
      <Content>
        <h2>NFTs</h2>
        <p>
          Browse NFTs across all <Link to="/collections">collections</Link> launched on <Shell />
        </p>
      </Content>
    </PageSection>
  );
};
