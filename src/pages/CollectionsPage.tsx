import React, { FunctionComponent } from 'react';
import { CollectionList } from '../components/CollectionList';
import { PageSection } from '../components/PageSection';

export const CollectionsPage: FunctionComponent = () => {
  return (
    <>
      <PageSection>
        <CollectionList />
      </PageSection>
    </>
  );
};
