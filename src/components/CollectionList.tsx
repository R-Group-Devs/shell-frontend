import React, { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { useWallet } from '../hooks/wallet';
import { Button } from './Button';
import { ThemeConfig } from '../Theme';
import { CollectionsTable } from './CollectionsTable';

const useStyles = makeStyles((theme: ThemeConfig) => {
  return {
    buttons: {
      display: 'flex',
      paddingBottom: theme.spacing(4),
    },
  };
});

export const CollectionList: FunctionComponent = () => {
  const { browseChainInfo } = useWallet();
  const history = useHistory();
  const classes = useStyles();

  return (
    <>
      <div className={classes.buttons}>
        <div style={{ flexGrow: 1 }}>
          <h2>
            📚 Collections <span style={{ opacity: 0.5, fontWeight: 100 }}>[{browseChainInfo.name}]</span>
          </h2>
        </div>
        <div>
          <Button onClick={() => history.push('/launch')}>Launch collection</Button>
        </div>
      </div>
      <CollectionsTable chainId={browseChainInfo.chainId} />
    </>
  );
};
