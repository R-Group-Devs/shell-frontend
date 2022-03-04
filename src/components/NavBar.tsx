import React, { FunctionComponent, useState } from 'react';

import { makeStyles } from '@material-ui/styles';
import { ThemeConfig } from '../Theme';
import { Link } from 'react-router-dom';
import { getTaps, incrementTaps } from '../lib/storage';
import { WalletButton } from './WalletButton';
import { useWallet } from '../hooks/wallet';
import { Content } from './Content';
import { useIsFetching } from 'react-query';
import { useLatestBlockNumber } from '../hooks/blocknumber';
import { formatDistanceStrict } from 'date-fns';

const useStyles = makeStyles((theme: ThemeConfig) => {
  return {
    section: {
      padding: `${theme.spacing(4)} ${theme.spacing(8)}`,
      display: 'none',
      '@media(min-width: 1080px)': {
        display: 'inherit',
      },
    },
    container: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(4),
    },
    shell: {
      fontSize: theme.spacing(6),
      paddingRight: theme.spacing(2),
    },
    small: {
      fontWeight: 100,
      fontSize: theme.spacing(3.5),
      opacity: 0.75,
    },
  };
});

const navItem = (label: string, to: string) => {
  return (
    <div>
      <Link to={to}>{label}</Link>
    </div>
  );
};

export const NavBar: FunctionComponent = () => {
  const classes = useStyles();
  const [taps, setTaps] = useState(getTaps());
  const { browseChainInfo, transactions } = useWallet();
  const isFetching = useIsFetching();
  const latest = useLatestBlockNumber();

  let behind = 0;
  if (latest.blockchain.data && latest.indexer.data) {
    behind = ((latest.blockchain.data ?? 0) - (latest.indexer.data ?? 0)) * browseChainInfo.blockTime;
  }

  const tap = () => {
    incrementTaps();
    setTaps(getTaps());
  };

  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <div style={{ cursor: 'help', userSelect: 'none' }} className={classes.shell} onClick={tap}>
          🐚 <span style={{ opacity: isFetching ? 0.5 : 0.1 }}>*</span>
        </div>
        {taps >= 0 && (
          <>
            <div>{navItem('Home', '/')}</div>
            <div>{navItem('Collections', '/collections')}</div>
            <div>
              <a target="_blank" href="https://docs.heyshell.xyz">
                Docs
              </a>
            </div>
            <div style={{ flexGrow: 1 }}></div>
            <div className={classes.small}>
              {transactions.length > 0 && (
                <>
                  ⚡️ {transactions.length} pending <br />
                </>
              )}
              {behind > 0 && <>🐢 {formatDistanceStrict(0, behind * 1000)}</>}
            </div>
            <div>
              <Content>
                <Link to="/network">{browseChainInfo.name}</Link>
              </Content>
            </div>
            <div>
              <WalletButton />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
