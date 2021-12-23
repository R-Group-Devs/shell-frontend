import React, { FunctionComponent } from 'react';
import { Button } from '../components/Button';
import { ButtonGroup } from '../components/ButtonGroup';
import { Content } from '../components/Content';
import { PageSection } from '../components/PageSection';
import { Shell } from '../components/Shell';
import { TwoPanel } from '../components/TwoPanel';

export const LaunchLandingPage: FunctionComponent = () => {
  return (
    <>
      <PageSection>
        <TwoPanel>
          <Content>
            <h2>New ERC-721 Collection</h2>
            <p>Each token is owned by a single address and has its own on-chain identity and history.</p>
            <p>One token, one owner. This tracks changes in ownership over time.</p>
            <ButtonGroup>
              <Button>
                Launch <Shell /> ERC-721
              </Button>
            </ButtonGroup>
          </Content>
          <Content>
            <h2>New ERC-1155 Collection</h2>
            <p>One token can be held by many addresses, each with a certain balance.</p>
            <p>One token, many owners. This tracks changes in amounts over time.</p>
            <ButtonGroup>
              <Button>
                Launch <Shell /> ERC-1155
              </Button>
            </ButtonGroup>
          </Content>
        </TwoPanel>
      </PageSection>
    </>
  );
};
