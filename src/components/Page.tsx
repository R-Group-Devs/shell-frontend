import { makeStyles } from '@material-ui/styles';
import React, { FunctionComponent } from 'react';
import { ThemeConfig } from '../Theme';
import { Footer } from './Footer';
import { NavBar } from './NavBar';

import './styles/reset.css';

const useStyles = makeStyles<ThemeConfig>((theme) => {
  return {
    page: {
      display: 'flex',
      flexDirection: 'column',
      background: theme.palette.background.main,
      color: theme.palette.foreground.main,
      fontFamily: theme.font,
      minHeight: '100vh',
    },
    main: {
      flex: 1,
    },
  };
});

export const Page: FunctionComponent = (props) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.page}>
        <div className={classes.main}>
          <NavBar />
          <main>{props.children}</main>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
};
