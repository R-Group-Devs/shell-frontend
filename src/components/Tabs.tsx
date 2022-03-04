import React, { FunctionComponent, ReactChild, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { ThemeConfig } from '../Theme';

interface Props {
  tabs: Array<{
    label: ReactChild;
    content: ReactChild;
  }>;
}

const useStyles = makeStyles((theme: ThemeConfig) => {
  return {
    header: {
      display: 'flex',
      gap: theme.spacing(4),
      borderBottom: `solid 1px ${theme.palette.background.light}`,
      '& div': {
        cursor: 'pointer',
        padding: `${theme.spacing(2)} ${theme.spacing(8)} ${theme.spacing(2)} ${theme.spacing(2)}`,
      },
      marginBottom: theme.spacing(4),
    },
    selected: {
      backgroundColor: theme.palette.accent.secondary,
      color: theme.palette.background.main,
      fontWeight: 'bold',
    },
  };
});

export const Tabs: FunctionComponent<Props> = ({ tabs }) => {
  const [selected, setSelected] = useState(0);
  const classes = useStyles();

  return (
    <>
      <div className={classes.header}>
        {tabs.map((t, idx) => (
          <div onClick={() => setSelected(idx)} key={idx} className={idx === selected ? classes.selected : ''}>
            {t.label}
          </div>
        ))}
      </div>
      <div>{tabs[selected].content}</div>
    </>
  );
};
