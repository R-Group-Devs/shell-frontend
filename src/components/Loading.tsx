import React, { FunctionComponent } from 'react';
import { Content } from './Content';
import { PageSection } from './PageSection';

export const Loading: FunctionComponent<{ message?: string }> = (props) => {
  return (
    <PageSection>
      <Content>
        <p style={{ textAlign: 'center' }}>{props.message ?? 'Loading...'}</p>
      </Content>
    </PageSection>
  );
};
