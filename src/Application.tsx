import React, { FunctionComponent, useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { Page } from './components/Page';
import { CollectionsPage } from './pages/CollectionsPage';
import { EnginesPage } from './pages/EnginesPage';
import { HomePage } from './pages/HomePage';
import { NftsPage } from './pages/NftsPage';
import { ProtocolPage } from './pages/ProtocolPage';
import { WalletPage } from './pages/WalletPage';
import { splash } from './splash';

splash();

export const Application: FunctionComponent = () => {
  const { pathname } = useLocation();

  // always scroll when nav changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Page>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/collections">
            <CollectionsPage />
          </Route>
          <Route exact path="/engines">
            <EnginesPage />
          </Route>
          <Route exact path="/nfts">
            <NftsPage />
          </Route>
          <Route exact path="/protocol">
            <ProtocolPage />
          </Route>
          <Route exact path="/wallet">
            <WalletPage />
          </Route>
        </Switch>
      </Page>
    </>
  );
};
