import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { Content } from '../components/Content';
import { PageSection } from '../components/PageSection';
import { Shell } from '../components/Shell';
import { useWallet } from '../hooks/wallet';

export const EnginesPage: FunctionComponent = () => {
  const { browseChainInfo } = useWallet();
  return (
    <PageSection>
      <Content>
        <h2>Engines [{browseChainInfo.name}]</h2>
        <p>
          NFT applications released on <Shell />.
        </p>
      </Content>
    </PageSection>
  );
};
