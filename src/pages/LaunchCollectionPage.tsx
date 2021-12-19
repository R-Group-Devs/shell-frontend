import React, { FunctionComponent, useState } from 'react';
import { Button } from '../components/Button';
import { ButtonGroup } from '../components/ButtonGroup';
import { ConnectionWarning } from '../components/ConnectionWarning';
import { Content } from '../components/Content';
import { Dimmed } from '../components/Dimmed';
import { Input } from '../components/Input';
import { PageSection } from '../components/PageSection';
import { Shell } from '../components/Shell';
import { TwoPanel } from '../components/TwoPanel';
import { useWallet } from '../hooks/wallet';

export const LaunchCollectionPage: FunctionComponent = () => {
  const { browseChainInfo, account } = useWallet();
  const [collectionName, setCollectionName] = useState('');
  const [collectionSymbol, setCollectionSymbol] = useState('');
  const [engineAddress, setEngineAddress] = useState('');
  const [ownerAddress, setOwnerAddress] = useState('');

  return (
    <PageSection>
      <Content>
        <div>
          <h2>
            Launch collection <Dimmed>[{browseChainInfo.name}]</Dimmed>
          </h2>
          <p>
            Deploy a new NFT contract with <Shell />.
          </p>
        </div>
        <ConnectionWarning />
        <h3>Information</h3>
        <TwoPanel>
          <Content>
            <div>
              <strong>Name</strong>
              <Input placeholder="My NFT Collection" />
            </div>
            <div>
              <strong>Symbol</strong>
              <Input placeholder="MYNFT" />
            </div>
          </Content>
          <Content>
            <p>
              Collection information <strong>cannot be modified after deployment</strong>.
            </p>
            <p>This information will be shown on marketplaces and tools like etherscan.</p>
          </Content>
        </TwoPanel>
        <h3>Engine</h3>
        <TwoPanel>
          <Content>
            <div>
              <strong>Engine address</strong>
              <Input placeholder="0x1234...1234" />
            </div>
            <div>
              <Button>Browse engines</Button>
            </div>
          </Content>
          <Content>
            <p>
              A collection's engine is responsible for rendering NFT metadata, resolving royalties, and handling
              minting.
            </p>
          </Content>
        </TwoPanel>
        <h3>Owner</h3>
        <TwoPanel>
          <Content>
            <div>
              <strong>Owner address</strong>
              <Input
                placeholder="0x1234...1234"
                onTextChange={(val) => setOwnerAddress(val)}
                value={ownerAddress}
                spellCheck={false}
              />
            </div>
            <div>
              <Button requireConnection onClick={() => setOwnerAddress(account)} disabled={ownerAddress === account}>
                Set self as owner
              </Button>
            </div>
          </Content>
          <Content>
            <p>The owner of a collection can hot-swap the installed engine at any time.</p>
            <p>Depending on the installed engine, the collection owner may have additional permissions.</p>
          </Content>
        </TwoPanel>
        <div>
          <h3>Deploy</h3>
          <ButtonGroup>
            <Button requireConnectedChainId={browseChainInfo.chainId}>Launch collection</Button>
          </ButtonGroup>
        </div>
      </Content>
    </PageSection>
  );
};
