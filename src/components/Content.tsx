import { makeStyles } from '@material-ui/styles';
import React, { FunctionComponent } from 'react';
import { ThemeConfig } from '../Theme';

const useStyles = makeStyles<ThemeConfig>((theme) => {
  return {
    content: {
      fontSize: theme.spacing(4),
      fontWeight: 400,
      lineHeight: '1.5',
      gap: theme.spacing(8),
      '& h1': {
        color: theme.palette.accent.main,
        fontSize: theme.spacing(9),
        lineHeight: '1.25',
      },
      '@media(min-width: 800px)': {
        fontSize: theme.spacing(4),
      },
      display: 'grid',
      '& strong': {
        fontWeight: 'bold',
        color: theme.palette.accent.main,
      },
      '& a': {
        color: theme.palette.accent.secondary,
        paddingBottom: theme.spacing(1),
        borderBottom: `solid 1px ${theme.palette.accent.main}`,
      },
      '& em': {
        color: theme.palette.accent.tertiary,
      },
      '& ul': {
        lineHeight: '2',
      },
    },
  };
});

export const Content: FunctionComponent = (props) => {
  const classes = useStyles();
  return <div className={classes.content}>{props.children}</div>;
};
