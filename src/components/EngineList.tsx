import { useTheme } from '@material-ui/styles';
import React, { FunctionComponent } from 'react';
import { useQuery } from 'react-query';
import { useWallet } from '../hooks/wallet';
import { timestampRelative } from '../lib/string';
import { getGraphClient } from '../shell/graph';
import { ThemeConfig } from '../Theme';
import { Address } from './Address';
import { AddressPrefix } from './AddressPrefix';
import { Loading } from './Loading';

export const EngineList: FunctionComponent = () => {
  const theme = useTheme<ThemeConfig>();
  const { browseChainInfo } = useWallet();
  const { data, isLoading } = useQuery(['EngineList', browseChainInfo.chainId], async () => {
    const client = getGraphClient(browseChainInfo.chainId);
    const resp = await client.engines();
    return resp.data;
  });

  if (isLoading) {
    return <Loading message="fetching engines..." />;
  }

  return (
    <table>
      <thead>
        <tr>
          <td>Engine</td>
          <td>Installs</td>
          <td>Minted</td>
          <td>Released</td>
          <td>Updated</td>
          <td>Last Install</td>
        </tr>
      </thead>
      <tbody style={{ fontSize: theme.spacing(3.5), fontWeight: '100' }}>
        {data.engines.map((engine) => (
          <tr key={engine.id}>
            <td>
              <AddressPrefix address={engine.address}>{engine.name}</AddressPrefix>
            </td>
            <td>{engine.collectionCount}</td>
            <td>{engine.mintedNftsCount}</td>
            <td>{timestampRelative(engine.releasedAtTimestamp)}</td>
            <td>{timestampRelative(engine.lastUpdatedAtTimestamp)}</td>
            <td>{timestampRelative(engine.lastInstalledAtTimestamp)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
