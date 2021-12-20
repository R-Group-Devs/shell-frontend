import { constants } from 'ethers';
import React, { FunctionComponent } from 'react';
import { exploreAddressLink, exploreTokenLink } from '../lib/web3';
import { Address } from './Address';

interface Props {
  chainId: number;
  address: string;
  isToken?: boolean;
}

export const AddressViewable: FunctionComponent<Props> = ({ chainId, address, isToken }) => {
  let url: string;
  if (isToken) {
    url = exploreTokenLink(chainId, address);
  } else {
    url = exploreAddressLink(chainId, address);
  }

  return (
    <>
      <Address address={address} />{' '}
      {address !== constants.AddressZero && (
        <a href={url} target="_blank">
          view
        </a>
      )}
    </>
  );
};
