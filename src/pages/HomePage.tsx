import React, { FunctionComponent } from 'react';
import { Content } from '../components/Content';
import { PageSection } from '../components/PageSection';
import { Shell } from '../components/Shell';

import { Whomst } from '../components/Whomst';
import { Button } from '../components/Button';
import { TwoPanel } from '../components/TwoPanel';

export const HomePage: FunctionComponent = () => {
  return (
    <PageSection>
      <Content>
        <TwoPanel>
          <Content>
            <h1 style={{ maxWidth: '500px' }}>
              On-chain NFT
              <br /> application development framework
              <br /> for <Whomst />
            </h1>
          </Content>
          <Content>
            <p style={{ textAlign: 'center' }}>
              <img
                style={{ maxWidth: '300px', display: 'inline' }}
                src="https://ipfs.heyshell.xyz/ipfs/QmcnWsZVxNiozUjYc1qtJTRsseES4523FRzSS8PXRhWdJZ"
              />
            </p>
          </Content>
        </TwoPanel>
        <TwoPanel gapOnCollapse>
          <Content>
            <p>
              Launch interoperable, open NFT projects that{' '}
              <a href="https://docs.heyshell.xyz/forkanomics" target="_blank">
                all holders can iterate on
              </a>
            </p>
            <p>
              Deploy portable minting mechanics or reusable NFT rendering logic via{' '}
              <a href="https://docs.heyshell.xyz/engines" target="_blank">
                engines
              </a>
            </p>
            <p>
              Rapidly ship NFT apps that use framework-managed{' '}
              <a href="https://docs.heyshell.xyz/storage" target="_blank">
                storage
              </a>{' '}
              and shell{' '}
              <a href="https://docs.heyshell.xyz/deployments-and-links" target="_blank">
                subgraph
              </a>
            </p>
            <p style={{ textAlign: 'center' }}>Fork anything</p>
          </Content>
          <Content>
            <p style={{ textAlign: 'center', marginTop: '22px' }}>
              <Shell /> is an open product framework for NFTs
            </p>
            <p style={{ textAlign: 'center', marginBottom: '22px' }}>
              <Button navTo="/launch">
                Launch a <Shell /> collection
              </Button>
            </p>
          </Content>
        </TwoPanel>
      </Content>
    </PageSection>
  );
};
