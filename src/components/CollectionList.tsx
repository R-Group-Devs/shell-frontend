import React, { FunctionComponent } from 'react';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { useWallet } from '../hooks/wallet';
import { timestampRelative } from '../lib/string';
import { getCollections } from '../shell/graph';
import { Address } from './Address';
import { AddressPrefix } from './AddressPrefix';
import { Loading } from './Loading';
import { Table } from './Table';
import { Button } from './Button';
import { ThemeConfig } from '../Theme';

const useStyles = makeStyles((theme: ThemeConfig) => {
  return {
    buttons: {
      display: 'flex',
      paddingBottom: theme.spacing(4),
    },
  };
});

export const CollectionList: FunctionComponent = () => {
  const { browseChainInfo } = useWallet();
  const history = useHistory();
  const classes = useStyles();
  const { data, isLoading } = useQuery(['CollectionList', browseChainInfo.chainId], () =>
    getCollections({ chainId: browseChainInfo.chainId })
  );

  if (isLoading) {
    return <Loading message="fetching collections..." />;
  }

  return (
    <>
      <div className={classes.buttons}>
        <div style={{ flexGrow: 1 }}>
          <h2>
            Collections <span style={{ opacity: 0.5, fontWeight: 100 }}>[{browseChainInfo.name}]</span>
          </h2>
        </div>
        <div>
          <Button onClick={() => history.push('/launch')}>Launch collection</Button>
        </div>
      </div>
      <Table>
        <thead>
          <tr>
            <td>Collection</td>
            <td>Engine</td>
            <td style={{ textAlign: 'center' }}>NFTs</td>
            <td>Owner</td>
            <td>Last Activity</td>
          </tr>
        </thead>
        <tbody>
          {data.collections.map((c) => (
            <tr key={c.id} onClick={() => history.push(`/collections/${browseChainInfo.slug}/${c.address}`)}>
              <td>
                <AddressPrefix address={c.address}>
                  {c.name} ({c.symbol})
                </AddressPrefix>
              </td>
              <td>
                <AddressPrefix address={c.engine.address}>{c.engine.name}</AddressPrefix>
              </td>
              <td style={{ textAlign: 'center' }}>{c.nftCount}</td>
              <td>
                <Address address={c.owner.address} />
              </td>
              <td>{timestampRelative(c.lastActivityAtTimestamp)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
