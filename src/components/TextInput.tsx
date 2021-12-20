import { makeStyles } from '@material-ui/styles';
import React, { FunctionComponent } from 'react';
import { useFormContext } from 'react-hook-form';
import { ThemeConfig } from '../Theme';

interface Props extends React.HTMLProps<HTMLInputElement> {
  name: string;
}

const useStyles = makeStyles<ThemeConfig>((theme) => {
  return {
    input: {
      background: theme.palette.background.light,
      color: theme.palette.foreground.main,
      padding: `${theme.spacing(1.5)} ${theme.spacing(1.5)}`,
      fontSize: theme.spacing(4),
      margin: `${theme.spacing(1)} 0`,
      border: 'none',
      width: '100%',
      '&:focus': {
        outline: 'none',
        borderColor: theme.palette.accent.secondary,
      },
    },
  };
});

export const TextInput: FunctionComponent<Props> = (props) => {
  const { name, ...rest } = props;
  const classes = useStyles();
  const { register } = useFormContext();

  const className = `${classes.input} ${rest.className ?? ''}`;

  return <input {...register(name)} {...rest} className={className} />;
};
