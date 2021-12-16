import { useTheme } from '@material-ui/styles';
import React, { FunctionComponent } from 'react';
import { useQuery } from 'react-query';
import { useWallet } from '../hooks/wallet';
import { timestampRelative } from '../lib/string';
import { getGraphClient } from '../shell/graph';
import { ThemeConfig } from '../Theme';
import { Address } from './Address';
import { Loading } from './Loading';

export const NftList: FunctionComponent = () => {
  const theme = useTheme<ThemeConfig>();
  const { browseChainInfo } = useWallet();
  const { data, isLoading } = useQuery(['NftList', browseChainInfo.chainId], async () => {
    const client = getGraphClient(browseChainInfo.chainId);
    const resp = await client.nfts();
    return resp.data;
  });

  if (isLoading) {
    return <Loading message="fetching nfts..." />;
  }

  return (
    <table>
      <thead>
        <tr>
          <td>Collection</td>
          <td>Token ID</td>
          <td>Owner</td>
          <td>Minted</td>
          <td>Last Activity</td>
        </tr>
      </thead>
      <tbody style={{ fontSize: theme.spacing(3.5), fontWeight: '100' }}>
        {data.nfts.map((nft) => (
          <tr key={nft.id}>
            <td>{nft.collection.name}</td>
            <td>{nft.tokenId}</td>
            <td>
              <Address address={nft.owner.address} />
            </td>
            <td>{timestampRelative(nft.createdAtTimestamp)}</td>
            <td>{timestampRelative(nft.lastActivityAtTimestamp)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
