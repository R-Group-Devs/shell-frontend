import React, { FunctionComponent, useState } from 'react';
import { Address } from '../components/Address';
import { Content } from '../components/Content';
import { KeyValueEntry, KeyValueList } from '../components/KeyValueList';
import { MultiSelect } from '../components/MultiSelect';
import { PageSection } from '../components/PageSection';
import { Shell } from '../components/Shell';
import { TwoPanel } from '../components/TwoPanel';
import { useLatestBlockNumber } from '../hooks/blocknumber';
import { useWallet } from '../hooks/wallet';
import { exploreAddressLink } from '../lib/web3';
import { networks } from '../shell/networks';

export const NetworkPage: FunctionComponent = () => {
  const { browseChainInfo } = useWallet();
  const { chainId } = browseChainInfo;
  const latest = useLatestBlockNumber();
  const [chains, setChains] = useState(
    networks.map((n) => {
      return { value: `${n.chainId}`, display: n.name, selected: true };
    })
  );

  const graphLink = browseChainInfo.subgraphEndpoint.replace(
    'https://api.thegraph.com/subgraphs/name/',
    'https://thegraph.com/hosted-service/subgraph/'
  );

  return (
    <>
      <PageSection>
        <Content>
          <h2>Network [{browseChainInfo.name}]</h2>
          <TwoPanel>
            <Content>
              <p>
                Select a network to explore <Shell />:
              </p>
              <MultiSelect items={chains} onSelect={() => null} />
            </Content>
            <KeyValueList>
              <KeyValueEntry label="Chain ID:" value={chainId} />
              <KeyValueEntry label="Latest block:" value={latest.blockchain.data} />
              <KeyValueEntry label="Latest indexed block:" value={latest.indexer.data} />
            </KeyValueList>
          </TwoPanel>
        </Content>
      </PageSection>
      <PageSection>
        <Content>
          <h3>Protocol</h3>
          <KeyValueList>
            <KeyValueEntry
              label="Subgraph endpoint:"
              value={
                <a target="_blank" href={graphLink}>
                  {browseChainInfo.subgraphEndpoint}
                </a>
              }
            />
            <KeyValueEntry
              label="CollectionFactory address:"
              value={
                <>
                  {browseChainInfo.factoryAddress}{' '}
                  <a href={exploreAddressLink(chainId, browseChainInfo.factoryAddress)} target="_blank">
                    view
                  </a>
                </>
              }
            />
          </KeyValueList>
        </Content>
      </PageSection>
    </>
  );
};
