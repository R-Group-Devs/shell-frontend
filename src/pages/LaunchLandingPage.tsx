import React, { FunctionComponent } from 'react';
import { Button } from '../components/Button';
import { ButtonGroup } from '../components/ButtonGroup';
import { Content } from '../components/Content';
import { Dimmed } from '../components/Dimmed';
import { PageSection } from '../components/PageSection';
import { Shell } from '../components/Shell';
import { TwoPanel } from '../components/TwoPanel';
import { useWallet } from '../hooks/wallet';

export const LaunchLandingPage: FunctionComponent = () => {
  const { browseChainInfo } = useWallet();
  return (
    <>
      <PageSection>
        <Content>
          <div>
            <h2>
              Token model <Dimmed>[{browseChainInfo.name}]</Dimmed>
            </h2>
            <p>Select a token model for your collection:</p>
          </div>
        </Content>
      </PageSection>
      <PageSection>
        <TwoPanel gapOnCollapse>
          <Content>
            <h4>ERC-721 Collection</h4>
            <p>One token, one owner.</p>
            <p>Each token is owned by a single address and has its own on-chain identity and history.</p>
            <p>This tracks changes in ownership over time.</p>
            <ButtonGroup>
              <Button navTo="/launch/shell-erc721-v1">
                Launch <Shell /> ERC-721
              </Button>
            </ButtonGroup>
          </Content>
          <Content>
            <h4>ERC-1155 Collection</h4>
            <p>One token, many owners.</p>
            <p>Each token can be held by many addresses, all with a certain balance.</p>
            <p>This tracks changes in amounts over time.</p>
            <ButtonGroup>
              <Button navTo="/launch/shell-erc1155-v1">
                Launch <Shell /> ERC-1155
              </Button>
            </ButtonGroup>
          </Content>
        </TwoPanel>
      </PageSection>
    </>
  );
};
