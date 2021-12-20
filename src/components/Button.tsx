import { makeStyles } from '@material-ui/styles';
import React, { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';
import { useWallet } from '../hooks/wallet';
import { ThemeConfig } from '../Theme';

type Props = React.HtmlHTMLAttributes<HTMLSpanElement> & {
  navTo?: string;
  externalNavTo?: string;
  disabled?: boolean;
  requireConnection?: boolean;
  requireConnectedChainId?: number;
  active?: boolean;
};

const useStyles = makeStyles<ThemeConfig, { isDisabled: boolean }>((theme) => {
  return {
    active: {
      background: (props) => (props.isDisabled ? 'inherit' : theme.palette.accent.secondary),
      color: (props) => (props.isDisabled ? 'inherit' : theme.palette.background.main),
    },
    inner: {},
    button: {
      fontSize: theme.spacing(3.75),
      cursor: (props) => (!props.isDisabled ? 'pointer' : 'not-allowed'),
      opacity: (props) => (!props.isDisabled ? 1 : 0.5),
      border: `solid 1px ${theme.palette.foreground.dark}`,
      padding: theme.spacing(1.5),
      '&:hover': {
        color: (props) => (props.isDisabled ? 'inherit' : theme.palette.accent.main),
        borderColor: (props) => (props.isDisabled ? theme.palette.foreground.dark : theme.palette.accent.main),
      },
    },
  };
});

export const Button: FunctionComponent<Props> = (props) => {
  const { navTo, externalNavTo, requireConnectedChainId, requireConnection, ...attr } = props;

  const history = useHistory();
  const { chainId, account, state } = useWallet();

  const requiredChainMismatch = requireConnectedChainId && requireConnectedChainId !== chainId;
  const requiredConnectionMissing = requireConnection && !account;
  const isDisabled = props.disabled || requiredChainMismatch || requiredConnectionMissing;

  const classes = useStyles({ isDisabled });

  const onClickFromProps = attr.onClick;
  const className = `${props.className ?? ''} ${classes.button}`;

  if (!isDisabled) {
    if (navTo) {
      attr.onClick = (e) => {
        if (onClickFromProps) onClickFromProps(e);
        history.push(navTo);
      };
    } else if (externalNavTo) {
      attr.onClick = (e) => {
        if (onClickFromProps) onClickFromProps(e);
        window.open(externalNavTo, '_blank');
      };
    }
  } else {
    attr.onClick = () => null;
  }

  const innerClassName = `${classes.inner} ${props.active ? classes.active : ''}`;

  return (
    <span {...attr} className={className}>
      {(requiredChainMismatch || requiredConnectionMissing) && state !== 'init' && <>⚠️ </>}
      <span className={innerClassName}>{props.children}</span>
    </span>
  );
};
