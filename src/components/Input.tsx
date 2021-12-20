import { makeStyles } from '@material-ui/styles';
import React, { FunctionComponent } from 'react';
import { ThemeConfig } from '../Theme';

interface Props extends React.HTMLProps<HTMLInputElement> {
  value?: string | number;
  onTextChange?: (text: string) => unknown;
  regex?: RegExp;
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

export const Input: FunctionComponent<Props> = React.forwardRef((props, ref) => {
  const classes = useStyles();

  const { onTextChange, ...attrs } = props;
  const className = `${classes.input} ${attrs.className ?? ''}`;

  if (onTextChange) {
    if (attrs.onInput !== undefined) {
      throw new Error();
    }
    attrs.onInput = (event) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const val = `${(event.target as any).value}`;

      if (props.regex && !val.match(props.regex)) {
        return;
      }

      onTextChange(val);
    };
  }

  return (
    <input autocomplete="new-password" {...attrs} className={className} ref={ref}>
      {props.children}
    </input>
  );
});
