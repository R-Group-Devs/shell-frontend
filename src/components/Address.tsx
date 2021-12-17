import React, { FunctionComponent } from 'react';
import { truncateHex } from '../lib/string';

interface Props {
  address?: string;
}

export const Address: FunctionComponent<Props> = ({ address }) => {
  if (address == null) {
    return null;
  }

  return <>{truncateHex(address).replace('0x', '')}</>;
};
