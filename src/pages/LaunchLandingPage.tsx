import React, { FunctionComponent } from 'react';
import { Button } from '../components/Button';
import { ButtonGroup } from '../components/ButtonGroup';
import { Content } from '../components/Content';
import { Dimmed } from '../components/Dimmed';
import { PageSection } from '../components/PageSection';
import { Shell } from '../components/Shell';
import { TwoPanel } from '../components/TwoPanel';

export const LaunchLandingPage: FunctionComponent = () => {
  return (
    <>
      <PageSection>
        <Content>
          <div>
            <h2>Token model</h2>
            <p>Select a token model for your collection:</p>
          </div>
        </Content>
      </PageSection>
      <PageSection>
        <TwoPanel gapOnCollapse>
          <Content>
            <h4>ERC-721 Collection</h4>
            <p>Each token is owned by a single address and has its own on-chain identity and history.</p>
            <p>One token, one owner. This tracks changes in ownership over time.</p>
            <ButtonGroup>
              <Button navTo="/launch/erc721">
                Launch <Shell /> ERC-721
              </Button>
            </ButtonGroup>
          </Content>
          <Content>
            <h4>ERC-1155 Collection</h4>
            <p>Each token can be held by many addresses, all with a certain balance.</p>
            <p>One token, many owners. This tracks changes in amounts over time.</p>
            <ButtonGroup>
              <Button disabled>
                Launch <Shell /> ERC-1155
              </Button>{' '}
              <Dimmed>(comming soon)</Dimmed>
            </ButtonGroup>
          </Content>
        </TwoPanel>
      </PageSection>
    </>
  );
};
