import { constants } from 'ethers';
import React, { FunctionComponent } from 'react';
import { useQuery } from 'react-query';
import { truncateHex } from '../lib/string';
import { Dimmed } from './Dimmed';
import { getLoaders } from '../shell/dataloaders';

interface Props {
  address?: string;
}

export const Address: FunctionComponent<Props> = ({ address }) => {
  const query = useQuery(['resolve ens', address], async () => {
    const { ensName } = getLoaders(1); // ens always on eth
    return await ensName.load(address);
  });

  if (query.data) {
    return <>{query.data}</>;
  }

  if (address == constants.AddressZero) {
    return <Dimmed>(none)</Dimmed>;
  }
  if (address == null) {
    return null;
  }

  return <>{truncateHex(address).replace('0x', '')}</>;
};
