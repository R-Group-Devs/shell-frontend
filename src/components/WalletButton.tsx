import React, { FunctionComponent } from 'react';
import { useHistory } from 'react-router';
import { useWallet } from '../hooks/wallet';
import { Address } from './Address';
import { Button } from './Button';

export const WalletButton: FunctionComponent = () => {
  const { state, connect, accountView, walletPresent } = useWallet();
  const history = useHistory();

  if (!walletPresent) {
    return <Button disabled>💀 off-chain</Button>;
  }

  if (state === 'init') {
    return <Button>⌛️</Button>;
  } else if (state === 'disconnected') {
    return <Button onClick={() => connect()}>CONNECT</Button>;
  } else if (accountView === null) {
    return <Button>⌛️</Button>;
  }

  return (
    <Button onClick={() => history.push('/wallet')}>
      <Address address={accountView.address} />
    </Button>
  );
};
