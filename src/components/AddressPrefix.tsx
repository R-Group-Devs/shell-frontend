import React, { FunctionComponent } from 'react';
import { Address } from './Address';

export const AddressPrefix: FunctionComponent<{ address: string }> = (props) => {
  return (
    <>
      <span style={{ opacity: '0.5' }}>
        <Address address={props.address} />
      </span>{' '}
      {props.children}
    </>
  );
};
