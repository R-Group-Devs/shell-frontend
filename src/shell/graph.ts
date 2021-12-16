import memoize from 'lodash/memoize';
import { GraphQLClient } from 'graphql-request';
import { getSdk } from './graph-generated';
import { getChainInfo } from './networks';

export const getGraphClient = memoize((chainId: number) => {
  const info = getChainInfo(chainId);
  const client = new GraphQLClient(info.subgraphEndpoint);
  const sdk = getSdk(client);
  return sdk;
});

interface GetCollections {
  chainId: number;
}

export const getCollections = async (options: GetCollections) => {
  const client = getGraphClient(options.chainId);
  const resp = await client.recentCollections();
  return resp.data;
};
