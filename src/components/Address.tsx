import { constants } from 'ethers';
import React, { FunctionComponent } from 'react';
import { truncateHex } from '../lib/string';
import { Dimmed } from './Dimmed';

interface Props {
  address?: string;
}

export const Address: FunctionComponent<Props> = ({ address }) => {
  if (address == constants.AddressZero) {
    return <Dimmed>(none)</Dimmed>;
  }
  if (address == null) {
    return null;
  }

  return <>{truncateHex(address).replace('0x', '')}</>;
};
