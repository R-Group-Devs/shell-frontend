import React, { FunctionComponent } from 'react';
import { Content } from '../components/Content';
import { PageSection } from '../components/PageSection';
import { Shell } from '../components/Shell';

import { Bangers } from '../components/Bangers';
import { Whomst } from '../components/Whomst';

export const HomePage: FunctionComponent = () => {
  return (
    <PageSection>
      <Content>
        <h1 style={{ maxWidth: '640px' }}>
          On-chain NFT application framework for <Whomst />
        </h1>
        <p>
          Upcoming public NFT infrastructure from <strong>R Group</strong> @{' '}
          <a href="https://t.co/k8lIDvcPT9">Rarible DAO</a>.
        </p>
        <p>
          What excites you about <Shell /> ?
        </p>
        <Bangers />
      </Content>
    </PageSection>
  );
};
