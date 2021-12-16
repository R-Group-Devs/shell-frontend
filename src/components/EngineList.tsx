import { useTheme } from '@material-ui/styles';
import React, { FunctionComponent } from 'react';
import { useQuery } from 'react-query';
import { useWallet } from '../hooks/wallet';
import { timestampRelative } from '../lib/string';
import { getCollections, getGraphClient } from '../shell/graph';
import { ThemeConfig } from '../Theme';
import { Address } from './Address';
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
          <td>Address</td>
          <td>Collections</td>
          <td>Updated</td>
        </tr>
      </thead>
      <tbody style={{ fontSize: theme.spacing(3.5), fontWeight: '100' }}>
        {data.engines.map((c) => (
          <tr key={c.id}>
            <td>
              <Address address={c.address} />
            </td>
            <td>{c.collectionCount}</td>
            <td>{timestampRelative(c.lastUpdatedTimestamp)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
