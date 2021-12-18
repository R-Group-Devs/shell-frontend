import React, { FunctionComponent } from 'react';

import { makeStyles } from '@material-ui/styles';
import { ThemeConfig } from '../Theme';

const useStyles = makeStyles((theme: ThemeConfig) => {
  return {
    table: {
      borderCollapse: 'collapse',
      width: '100%',
      '& thead': {
        fontWeight: 'bold',
        color: theme.palette.accent.main,
      },
      '& thead td': {
        paddingBottom: theme.spacing(1),
      },
      '& tbody': {
        fontWeight: '100',
        fontSize: theme.spacing(3.5),
        lineHeight: '1.75',
      },
      '& tbody td': {
        paddingRight: theme.spacing(2),
      },
      '& tbody tr:hover': {
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: theme.palette.accent.secondary,
          color: theme.palette.background.main,
          fontWeight: 'bold',
        },
      },
    },
  };
});

export const Table: FunctionComponent = ({ children }) => {
  const classes = useStyles();
  return <table className={classes.table}>{children}</table>;
};
