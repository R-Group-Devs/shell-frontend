import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { getChainInfo } from '../shell/networks';
import { Address } from './Address';

interface Props {
  chainId: number;
  address?: string;
}

export const AccountLink: FunctionComponent<Props> = ({ chainId, address }) => {
  if (!address) {
    return null;
  }
  const info = getChainInfo(chainId);
  return (
    <>
      👤{' '}
      <Link to={`/accounts/${info.slug}/${address.toLowerCase()}`}>
        <Address address={address} />
      </Link>
    </>
  );
};
