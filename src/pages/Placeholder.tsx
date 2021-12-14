import React, { FunctionComponent } from 'react';
import { Content } from '../components/Content';
import { PageSection } from '../components/PageSection';
import { Shell } from '../components/Shell';

import { Bangers } from './Bangers';

export const Placeholder: FunctionComponent = () => {
  return (
    <PageSection>
      <Content>
        <h1>
          🐚 <Shell />
        </h1>
        <p>
          Upcoming public NFT infrastructure from <strong>R Group</strong> @{' '}
          <a href="https://t.co/k8lIDvcPT9">Rarible DAO</a>.
        </p>
        <p>
          <Shell /> is being built for:
        </p>
        <Bangers
          bangers={[
            'Iterative experimentation',
            'NFT mechanism research',
            'Symbolic composition',
            'Product prototyping',
            'Dynamic NFTs',
            'Emergent interaction',
            'Meta-interoperability',
            'Network debugging',
            'Play-oriented design',
          ]}
        />
      </Content>
    </PageSection>
  );
};
