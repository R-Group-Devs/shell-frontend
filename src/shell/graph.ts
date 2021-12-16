import memoize from 'lodash/memoize';
import { GraphQLClient } from 'graphql-request';
import { Collection_OrderBy, getSdk } from './graph-generated';
import { getChainInfo } from './networks';

export const getGraphClient = memoize((chainId: number) => {
  const info = getChainInfo(chainId);
  const client = new GraphQLClient(info.subgraphEndpoint);
  const sdk = getSdk(client);
  return sdk;
});

interface GetCollections {
  chainId: number;
  orderBy?: Collection_OrderBy;
}

export const getCollections = async (options: GetCollections) => {
  const client = getGraphClient(options.chainId);
  const { orderBy } = options;
  const resp = await client.collections({ orderBy });
  return resp.data;
};
