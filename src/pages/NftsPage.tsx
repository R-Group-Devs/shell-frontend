import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { Content } from '../components/Content';
import { PageSection } from '../components/PageSection';
import { Shell } from '../components/Shell';
import { useWallet } from '../hooks/wallet';

export const NftsPage: FunctionComponent = () => {
  const { browseChainInfo } = useWallet();
  return (
    <PageSection>
      <Content>
        <h2>NFTs on {browseChainInfo.name}</h2>
        <p>
          Browse NFTs across all <Link to="/collections">collections</Link> launched on <Shell />
        </p>
      </Content>
    </PageSection>
  );
};
