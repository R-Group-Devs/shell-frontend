import React, { FunctionComponent, useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { Page } from './components/Page';
import { CollectionDetailPage } from './pages/CollectionDetailPage';
import { CollectionsPage } from './pages/CollectionsPage';
import { HomePage } from './pages/HomePage';
import { LaunchCollectionPage } from './pages/LaunchCollectionPage';
import { NetworkPage } from './pages/NetworkPage';
import { ConnectionPage } from './pages/ConnectionPage';
import { splash } from './splash';
import { LaunchLandingPage } from './pages/LaunchLandingPage';
import { ForkDetail } from './pages/ForkDetailPage';

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
          <Route exact path="/forks/:network/:collectionAddress/:forkId">
            <ForkDetail />
          </Route>
          <Route exact path="/nfts/:network/:collectionAddress/:tokenId">
            <p>nft detail</p>
          </Route>
          <Route exact path="/engines/:network/:address">
            <p>engine detail</p>
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
          <Route exact path="/launch/:tokenModel">
            <LaunchCollectionPage />
          </Route>
        </Switch>
      </Page>
    </>
  );
};
