import React, { FunctionComponent } from 'react';
import { Content } from './Content';
import { Dimmed } from './Dimmed';
import { PageSection } from './PageSection';

export const None: FunctionComponent<{ message?: string }> = (props) => {
  return (
    <PageSection>
      <Content>
        <p style={{ textAlign: 'center' }}>
          <Dimmed>{props.message ?? '(none)'}</Dimmed>
        </p>
      </Content>
    </PageSection>
  );
};
