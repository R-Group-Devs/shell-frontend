import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/styles';
import { MetadataImage } from '../shell/metadata';
import { ThemeConfig } from '../Theme';

interface Props {
  image?: MetadataImage;
}

const useStyles = makeStyles((theme: ThemeConfig) => {
  return {
    asset: {
      display: 'flex',
      justifyContent: 'center',
      '& img': {
        maxWidth: theme.spacing(110),
      },
    },
    svg: {
      width: theme.spacing(110),
      height: theme.spacing(110),
    },
  };
});

export const TokenAsset: FunctionComponent<Props> = ({ image }) => {
  const classes = useStyles();

  if (!image) {
    return null;
  }

  if (image.type === 'inline-svg') {
    return (
      <div className={classes.asset}>
        <div style={{ background: `url("${image.rawData}")` }} className={classes.svg} />
      </div>
    );
  }

  return (
    <div className={classes.asset}>
      <img src={image.url.httpsUri} />
    </div>
  );
};
