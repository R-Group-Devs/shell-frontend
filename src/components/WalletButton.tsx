import React, { FunctionComponent } from 'react';
import { useHistory } from 'react-router';
import { useWallet } from '../hooks/wallet';
import { Address } from './Address';
import { Button } from './Button';

export const WalletButton: FunctionComponent = () => {
  const { state, connect, account, walletPresent, browseChainInfo, chainId } = useWallet();
  const history = useHistory();

  if (!walletPresent) {
    return <Button onClick={() => history.push('/connection')}>💀 off-chain</Button>;
  }

  if (state === 'init') {
    return <Button>⌛️</Button>;
  } else if (state === 'disconnected') {
    return <Button onClick={() => connect()}>CONNECT</Button>;
  } else if (account === null) {
    return <Button>⌛️</Button>;
  }

  const mismatch = browseChainInfo.chainId !== chainId;

  return (
    <Button onClick={() => history.push('/connection')}>
      {mismatch && <>⚠️ </>}
      <Address address={account} />
    </Button>
  );
};
