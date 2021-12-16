import React, { FunctionComponent, useState } from 'react';

import { makeStyles } from '@material-ui/styles';
import { ThemeConfig } from '../Theme';
import { Link } from 'react-router-dom';
import { getTaps, incrementTaps } from '../lib/storage';

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
      paddingRight: theme.spacing(4),
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

  const tap = () => {
    incrementTaps();
    setTaps(getTaps());
  };

  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <div style={{ cursor: 'help', userSelect: 'none' }} className={classes.shell} onClick={tap}>
          🐚
        </div>
        {taps >= 5 && (
          <>
            <div>{navItem('Home', '/')}</div>
            <div>{navItem('Collections', '/collections')}</div>
            <div>{navItem('Engines', '/engines')}</div>
            <div>{navItem('NFTs', '/nfts')}</div>
            <div>{navItem('Protocol', '/protocol')}</div>
            <div style={{ flexGrow: 1 }}></div>
            <div>CONNECT</div>
          </>
        )}
      </div>
    </div>
  );
};
