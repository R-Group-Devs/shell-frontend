import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { ButtonGroup } from '../components/ButtonGroup';
import { Content } from '../components/Content';
import { Dimmed } from '../components/Dimmed';
import { PageSection } from '../components/PageSection';
import { Shell } from '../components/Shell';
import { useWallet } from '../hooks/wallet';
import { isWalletPresent } from '../lib/web3';
import { getExplorerContractUrl } from '../shell/external-urls';

export const ConnectionPage: FunctionComponent = () => {
  const { state, browseChainInfo, connectedChainInfo, connect, chainId, account } = useWallet();

  if (state === 'init') {
    return null;
  } else if (!isWalletPresent()) {
    return (
      <PageSection>
        <Content>
          <h2>
            Connection <Dimmed>[no wallet]</Dimmed>
          </h2>
          <p>Your browser is not currently running any wallet software.</p>
          <ButtonGroup>
            <Button externalNavTo="https://metamask.io">Install MetaMask</Button>
          </ButtonGroup>
        </Content>
      </PageSection>
    );
  } else if (state === 'disconnected') {
    return (
      <PageSection>
        <Content>
          <h2>
            Connection <Dimmed>[disconnected]</Dimmed>
          </h2>
          <p>
            Connect your web3 wallet to <Shell />
          </p>
          <ButtonGroup>
            <Button onClick={() => connect()}>Connect</Button>
          </ButtonGroup>
        </Content>
      </PageSection>
    );
  } else if (chainId !== browseChainInfo.chainId) {
    return (
      <PageSection>
        <Content>
          <h2>
            Connection <Dimmed>[wrong network]</Dimmed>
          </h2>
          <p>
            Change your wallet's network to <strong>{browseChainInfo.name}</strong> to interact with <Shell />.
          </p>
          <p>
            To use the protocol on another blockchain, go to the <Link to="/network">Network</Link> page
          </p>
        </Content>
      </PageSection>
    );
  }

  // made it

  return (
    <PageSection>
      <Content>
        <h2>
          Connection <Dimmed>[{connectedChainInfo.name}]</Dimmed>
        </h2>
        <p>
          You are connected to <Shell />.
        </p>
        <p>Your address: {account}</p>
        <ButtonGroup>
          <Button externalNavTo={getExplorerContractUrl(connectedChainInfo.chainId, account)}>
            View on block explorer
          </Button>
        </ButtonGroup>
      </Content>
    </PageSection>
  );
};
