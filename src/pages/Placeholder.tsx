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
          <li>Bottom-up experimentation</li>
          <li>NFT mechanism discoverability</li>
          <li>Meta-interoperability</li>
          <li>Play-oriented design</li>
          <li>Protocol prototyping</li>
        </ul>
        <p>
          see y'all in the <Shell /> cluster soon 👋
        </p>
      </Content>
    </PageSection>
  );
};
