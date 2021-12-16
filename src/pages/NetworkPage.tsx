import React, { FunctionComponent } from 'react';
import { Content } from '../components/Content';
import { PageSection } from '../components/PageSection';
import { Shell } from '../components/Shell';

export const NetworkPage: FunctionComponent = () => {
  return (
    <PageSection>
      <Content>
        <h2>Network</h2>
        <p>
          <Shell /> is deployed on multiple blockchains.
        </p>
      </Content>
    </PageSection>
  );
};
