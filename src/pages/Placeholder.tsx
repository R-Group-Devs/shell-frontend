import React, { FunctionComponent } from 'react';
import { Content } from '../components/Content';
import { PageSection } from '../components/PageSection';
import { Shell } from '../components/Shell';

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
        <ul>
          <li>Iterative experimentation</li>
          <li>NFT mechanism research</li>
          <li>Symbolic composition</li>
          <li>Product prototyping</li>
          <li>Meta-interoperability</li>
          <li>Network debugging</li>
          <li>Play-oriented design</li>
        </ul>
      </Content>
    </PageSection>
  );
};
