import memoize from 'lodash/memoize';
import { GraphQLClient, gql } from 'graphql-request';
import { Collection_OrderBy, getSdk, OrderDirection } from './graph-generated';
import { getChainInfo } from './networks';

export const getHostedGraphServiceClient = memoize(
  () => new GraphQLClient('https://api.thegraph.com/index-node/graphql')
);

export const getLatestIndexedBlock = async (chainId: number): Promise<number> => {
  const client = getHostedGraphServiceClient();
  const { subgraphEndpoint } = getChainInfo(chainId);
  const subgraphName = subgraphEndpoint.replace('https://api.thegraph.com/subgraphs/name/', '');
  const resp = await client.request(
    gql`
      query block($subgraphName: String!) {
        indexingStatusForCurrentVersion(subgraphName: $subgraphName) {
          chains {
            latestBlock {
              hash
              number
            }
          }
        }
      }
    `,
    { subgraphName }
  );
  const latestBlock = Number(resp.indexingStatusForCurrentVersion.chains[0].latestBlock.number);
  return latestBlock;
};

export const getGraphClient = memoize((chainId: number) => {
  const info = getChainInfo(chainId);
  const client = new GraphQLClient(info.subgraphEndpoint);
  const sdk = getSdk(client);
  return sdk;
});

interface GetCollections {
  chainId: number;
  orderBy?: Collection_OrderBy;
  orderDirection?: OrderDirection;
}

export const getCollections = async (options: GetCollections) => {
  const client = getGraphClient(options.chainId);
  const { orderBy, orderDirection } = options;
  const resp = await client.collections({ orderBy, orderDirection });
  return resp.data;
};
