import { formatDistanceStrict } from 'date-fns';
import React, { FunctionComponent, useState } from 'react';
import { useQuery } from 'react-query';
import { AddressViewable } from '../components/AddressViewable';
import { Content } from '../components/Content';
import { Dimmed } from '../components/Dimmed';
import { KeyValueEntry, KeyValueList } from '../components/KeyValueList';
import { MultiSelect } from '../components/MultiSelect';
import { PageSection } from '../components/PageSection';
import { Shell } from '../components/Shell';
import { TwoPanel } from '../components/TwoPanel';
import { useLatestBlockNumber } from '../hooks/blocknumber';
import { useWallet } from '../hooks/wallet';
import { formatDate } from '../lib/string';
import { getGraphClient } from '../shell/graph';
import { networks } from '../shell/networks';

export const NetworkPage: FunctionComponent = () => {
  const { browseChainInfo } = useWallet();
  const { chainId, blockTime, factoryAddress } = browseChainInfo;
  const latest = useLatestBlockNumber();
  const [chains, setChains] = useState(
    networks.map((n) => {
      return { value: `${n.chainId}`, display: n.name, selected: true };
    })
  );

  const factoryQuery = useQuery(['factory detail', chainId, factoryAddress], async () => {
    const client = getGraphClient(chainId);
    const resp = await client.getFactory({ address: factoryAddress.toLowerCase() });
    return resp.data;
  });

  const subgraphName = browseChainInfo.subgraphEndpoint.replace('https://api.thegraph.com/subgraphs/name/', '');
  const hostedPlayground = `https://thegraph.com/hosted-service/subgraph/${subgraphName}`;

  let behind = 0;
  if (latest.blockchain.data && latest.indexer.data) {
    behind = ((latest.blockchain.data ?? 0) - (latest.indexer.data ?? 0)) * blockTime;
  }

  return (
    <>
      <PageSection>
        <Content>
          <h2>
            Network <Dimmed>[{browseChainInfo.name}]</Dimmed>
          </h2>
          <TwoPanel>
            <Content>
              <p>
                Select a network to explore <Shell />:
              </p>
              <MultiSelect items={chains} onSelect={() => null} />
            </Content>
            <KeyValueList>
              <KeyValueEntry label="Chain ID:" value={chainId} />
              <KeyValueEntry label="Factory:" value={<AddressViewable address={factoryAddress} chainId={chainId} />} />
              <KeyValueEntry
                label="Factory deployed:"
                value={formatDate(factoryQuery.data?.factory?.createdAtTimestamp)}
              />
              <KeyValueEntry label="Total collections:" value={factoryQuery.data?.factory?.collectionCount} />
              <KeyValueEntry label="Total NFTs:" value={factoryQuery.data?.factory?.nftCount} />
              <KeyValueEntry label="Latest block:" value={latest.blockchain.data} />
              <KeyValueEntry label="Latest indexed block:" value={latest.indexer.data} />
              <KeyValueEntry
                label="Subgraph"
                value={
                  <a target="_blank" href={hostedPlayground}>
                    {subgraphName}
                  </a>
                }
              />
              <KeyValueEntry label="Indexer lag:" value={formatDistanceStrict(0, behind * 1000)} />
            </KeyValueList>
          </TwoPanel>
        </Content>
      </PageSection>
    </>
  );
};
