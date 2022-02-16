import React, { FunctionComponent } from 'react';
import { Button } from '../components/Button';
import { ButtonGroup } from '../components/ButtonGroup';
import { Content } from '../components/Content';
import { Dimmed } from '../components/Dimmed';
import { PageSection } from '../components/PageSection';
import { Shell } from '../components/Shell';
import { TwoPanel } from '../components/TwoPanel';
import { useWallet } from '../hooks/wallet';

const erc721Model = 'erc721-prototype';
const erc1155Model = 'erc1155-prototype';

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
            <div>
              <h4>ERC-721 Collection</h4>
              <Dimmed>token model: {erc721Model}</Dimmed>
            </div>
            <p>One token, one owner.</p>
            <p>Each token is owned by a single address and has its own on-chain identity and history.</p>
            <p>This tracks changes in ownership over time.</p>
            <ButtonGroup>
              <Button navTo={`/launch/${erc721Model}`}>
                Launch <Shell /> ERC-721
              </Button>
            </ButtonGroup>
          </Content>
          <Content>
            <div>
              <h4>ERC-1155 Collection</h4>
              <Dimmed>token model: {erc1155Model}</Dimmed>
            </div>
            <p>One token, many owners.</p>
            <p>Each token can be held by many addresses, all with a certain balance.</p>
            <p>This tracks changes in amounts over time.</p>
            <ButtonGroup>
              <Button navTo={`/launch/${erc1155Model}`} disabled>
                Launch <Shell /> ERC-1155
              </Button>
            </ButtonGroup>
          </Content>
        </TwoPanel>
      </PageSection>
    </>
  );
};
