import { useTheme } from '@material-ui/styles';
import React, { FunctionComponent } from 'react';
import { useQuery } from 'react-query';
import { useWallet } from '../hooks/wallet';
import { timestampRelative } from '../lib/string';
import { getCollections } from '../shell/graph';
import { ThemeConfig } from '../Theme';
import { Address } from './Address';
import { Loading } from './Loading';

export const CollectionList: FunctionComponent = () => {
  const theme = useTheme<ThemeConfig>();
  const { browseChainInfo } = useWallet();
  const { data, isLoading } = useQuery(['CollectionList', browseChainInfo.chainId], () =>
    getCollections({ chainId: browseChainInfo.chainId })
  );

  if (isLoading) {
    return <Loading message="fetching collections..." />;
  }

  return (
    <table>
      <thead>
        <tr>
          <td>Collection</td>
          <td>Engine</td>
          <td>Address</td>
          <td>Creator</td>
          <td>Updated</td>
          <td>Created</td>
        </tr>
      </thead>
      <tbody style={{ fontSize: theme.spacing(3.5), fontWeight: '100' }}>
        {data.collections.map((c) => (
          <tr key={c.id}>
            <td>
              {c.name} ({c.symbol})
            </td>
            <td>
              <Address address={c.engine.address} />
            </td>
            <td>
              <Address address={c.address} />
            </td>
            <td>
              <Address address={c.creator.address} />
            </td>
            <td>{timestampRelative(c.lastUpdatedTimestamp)}</td>
            <td>{timestampRelative(c.createdAtTimestamp)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
