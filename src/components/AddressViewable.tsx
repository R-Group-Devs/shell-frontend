import { constants } from 'ethers';
import React, { FunctionComponent } from 'react';
import { Address } from './Address';
import { getExplorerCollectionUrl, getExplorerAddressUrl } from '../shell/external-urls';

interface Props {
  chainId: number;
  address: string;
  isToken?: boolean;
}

export const AddressViewable: FunctionComponent<Props> = ({ chainId, address, isToken }) => {
  let url: string;
  if (isToken) {
    url = getExplorerCollectionUrl(chainId, address);
  } else {
    url = getExplorerAddressUrl(chainId, address);
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
