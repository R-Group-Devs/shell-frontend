import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '../hooks/wallet';
import { Shell } from './Shell';

export const ConnectionWarning: FunctionComponent = () => {
  const { state, browseChainInfo, connectedChainInfo } = useWallet();

  if (state === 'init' || browseChainInfo.chainId === connectedChainInfo?.chainId) {
    return null;
  }

  return (
    <p>
      <>⚠️ </> You are not connected to <Shell />. Visit the <Link to="/connection">Connection</Link> page to get
      on-chain.
    </p>
  );
};
