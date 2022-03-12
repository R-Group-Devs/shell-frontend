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
import { ForkDetailPage } from './pages/ForkDetailPage';
import { NFTDetailPage } from './pages/NFTDetailPage';
import { EngineDetailPage } from './pages/EngineDetailPage';
import { AccountDetailPage } from './pages/AccountDetailPage';

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
            <ForkDetailPage />
          </Route>
          <Route exact path="/nfts/:network/:collectionAddress/:tokenId">
            <NFTDetailPage />
          </Route>
          <Route exact path="/engines/:network/:address">
            <EngineDetailPage />
          </Route>
          <Route exact path="/accounts/:network/:address">
            <AccountDetailPage />
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
