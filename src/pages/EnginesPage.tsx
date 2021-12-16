import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { Content } from '../components/Content';
import { PageSection } from '../components/PageSection';
import { useWallet } from '../hooks/wallet';

export const EnginesPage: FunctionComponent = () => {
  const { browseChainInfo } = useWallet();
  return (
    <PageSection>
      <Content>
        <h2>Engines on {browseChainInfo.name}</h2>
        <p>
          <Link to="/collections">Collections</Link> are powered by their installed engine.
        </p>
      </Content>
    </PageSection>
  );
};
