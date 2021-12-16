import React, { FunctionComponent } from 'react';
import { Content } from '../components/Content';
import { NftList } from '../components/NftList';
import { PageSection } from '../components/PageSection';
import { Shell } from '../components/Shell';
import { useWallet } from '../hooks/wallet';

export const NftsPage: FunctionComponent = () => {
  const { browseChainInfo } = useWallet();
  return (
    <>
      <PageSection>
        <Content>
          <h2>NFTs [{browseChainInfo.name}]</h2>
          <p>
            NFTs minted on <Shell />.
          </p>
        </Content>
      </PageSection>
      <PageSection>
        <Content>
          <NftList />
        </Content>
      </PageSection>
    </>
  );
};
