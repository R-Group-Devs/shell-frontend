import { makeStyles } from '@material-ui/styles';
import React, { FunctionComponent } from 'react';
import { ThemeConfig } from '../Theme';

interface Props {
  gap?: number;
}

const useStyles = makeStyles<ThemeConfig, Props>((theme) => {
  return {
    content: {
      fontSize: theme.spacing(4),
      fontWeight: 400,
      lineHeight: '1.5',
      gap: (props) => theme.spacing(props.gap ?? 8),
      '& h1': {
        color: theme.palette.accent.main,
        fontSize: theme.spacing(9),
        lineHeight: '1.25',
      },
      '@media(min-width: 800px)': {
        fontSize: theme.spacing(4),
      },
      '& h4': {
        color: theme.palette.accent.main,
        fontSize: theme.spacing(4.5),
        lineHeight: '1.25',
      },
      display: 'grid',
      '& strong': {
        fontWeight: 'bold',
        color: theme.palette.accent.main,
      },
      '& a': {
        color: theme.palette.accent.secondary,
        paddingBottom: theme.spacing(0.25),
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

export const Content: FunctionComponent<Props> = (props) => {
  const classes = useStyles(props);
  return <div className={classes.content}>{props.children}</div>;
};
