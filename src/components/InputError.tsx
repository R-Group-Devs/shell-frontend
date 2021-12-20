import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/styles';
import { FieldError } from 'react-hook-form';
import { ThemeConfig } from '../Theme';

interface Props {
  error?: FieldError;
}

const useStyles = makeStyles((theme: ThemeConfig) => {
  return {
    error: {
      height: theme.spacing(4),
      fontWeight: 'bold',
      fontSize: theme.spacing(3.5),
      color: theme.palette.accent.error,
    },
  };
});

export const InputError: FunctionComponent<Props> = ({ error }) => {
  const classes = useStyles();

  let message = '';

  if (!error) {
    // noop
  } else if (error.type === 'required') {
    message = 'Required field';
  } else if (error.message) {
    message = error.message;
  }

  return <div className={classes.error}>{message}</div>;
};
