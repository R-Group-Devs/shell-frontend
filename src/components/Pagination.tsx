import { makeStyles } from '@material-ui/styles';
import React, { FunctionComponent } from 'react';
import { ThemeConfig } from '../Theme';
import { Dimmed } from './Dimmed';

interface Props {
  currentPage: number;
  totalPages?: number;
  onPageChange: (page: number) => void;
}

const useStyles = makeStyles<ThemeConfig, Props>((theme) => {
  return {
    pagination: {
      // display: 'flex',
      textAlign: 'center',
      margin: theme.spacing(2),
      '& div:first-child': {
        // flex: 1
      },
    },
    button: {
      userSelect: 'none',
      cursor: 'pointer',
    },
  };
});

export const Pagination: FunctionComponent<Props> = (props) => {
  const classes = useStyles(props);
  if (props.totalPages === 1) {
    return null;
  }

  const prev = () => {
    props.onPageChange(props.currentPage - 1);
  };

  const next = () => {
    props.onPageChange(props.currentPage + 1);
  };

  const enablePrev = props.currentPage > 1;
  const enableNext = props.currentPage < props.totalPages || props.totalPages === undefined;

  return (
    <div className={classes.pagination}>
      <div></div>
      <div>
        {enablePrev && (
          <span onClick={prev} className={classes.button}>
            ⬅️
          </span>
        )}{' '}
        <Dimmed>page {props.currentPage} </Dimmed>
        {enableNext && (
          <span onClick={next} className={classes.button}>
            ➡️
          </span>
        )}
      </div>
    </div>
  );
};
