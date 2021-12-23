import React, { FunctionComponent, useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { Page } from './components/Page';
import { CollectionDetailPage } from './pages/CollectionDetailPage';
import { CollectionsPage } from './pages/CollectionsPage';
import { EnginesPage } from './pages/EnginesPage';
import { HomePage } from './pages/HomePage';
import { LaunchCollectionPage } from './pages/LaunchCollectionPage';
import { NetworkPage } from './pages/NetworkPage';
import { NftsPage } from './pages/NftsPage';
import { ProtocolPage } from './pages/ProtocolPage';
import { ConnectionPage } from './pages/ConnectionPage';
import { splash } from './splash';
import { LaunchLandingPage } from './pages/LaunchLandingPage';

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
          <Route exact path="/collections/:network/:address">
            <CollectionDetailPage />
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
          <Route exact path="/connection">
            <ConnectionPage />
          </Route>
          <Route exact path="/network">
            <NetworkPage />
          </Route>
          <Route exact path="/launch">
            <LaunchLandingPage />
          </Route>
          <Route exact path="/launch/erc721">
            <LaunchCollectionPage />
          </Route>
        </Switch>
      </Page>
    </>
  );
};
