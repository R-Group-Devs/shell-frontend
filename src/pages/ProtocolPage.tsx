import React, { FunctionComponent } from 'react';
import { Content } from '../components/Content';
import { PageSection } from '../components/PageSection';
import { Shell } from '../components/Shell';

export const ProtocolPage: FunctionComponent = () => {
  return (
    <PageSection>
      <Content>
        <h2>Protocol</h2>
        <p>
          Information about the <Shell /> protocol.
        </p>
      </Content>
    </PageSection>
  );
};
