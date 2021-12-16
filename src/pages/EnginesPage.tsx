import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { Content } from '../components/Content';
import { PageSection } from '../components/PageSection';

export const EnginesPage: FunctionComponent = () => {
  return (
    <PageSection>
      <Content>
        <h2>Engines</h2>
        <p>
          <Link to="/collections">Collections</Link> are powered by their installed engine.
        </p>
      </Content>
    </PageSection>
  );
};
