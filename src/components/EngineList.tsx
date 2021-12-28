import React, { FunctionComponent } from 'react';
import { useQuery } from 'react-query';
import { useWallet } from '../hooks/wallet';
import { timestampRelative } from '../lib/string';
import { getGraphClient } from '../shell/graph';
import { AddressPrefix } from './AddressPrefix';
import { Loading } from './Loading';
import { Table } from './Table';

export const EngineList: FunctionComponent = () => {
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
    <Table>
      <thead>
        <tr>
          <td>Engine</td>
          <td>Installs</td>
          <td>Minted</td>
          <td>Created</td>
          <td>Last Install</td>
        </tr>
      </thead>
      <tbody>
        {data.engines.map((engine) => (
          <tr key={engine.id}>
            <td>
              <AddressPrefix address={engine.address}>{engine.name}</AddressPrefix>
            </td>
            <td>{engine.totalInstallCount}</td>
            <td>{engine.createdNftsCount}</td>
            <td>{timestampRelative(engine.createdAtTimestamp)}</td>
            <td>{timestampRelative(engine.lastInstalledAtTimestamp)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
