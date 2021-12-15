import memoize from 'lodash/memoize';
import { GraphQLClient } from 'graphql-request';
import { getSdk } from './graph-generated';
import { getChainInfo } from './networks';

export const getGraphClient = memoize((chainId: number) => {
  const info = getChainInfo(chainId);
  const client = new GraphQLClient(info.subgraph);
  const sdk = getSdk(client);
  return sdk;
});
