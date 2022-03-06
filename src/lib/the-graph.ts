import memoize from 'lodash/memoize';
import { GraphQLClient, gql } from 'graphql-request';

export const getHostedGraphServiceClient = memoize(
  () => new GraphQLClient('https://api.thegraph.com/index-node/graphql')
);

export const getIndexerInfo = async (subgraphName: string) => {
  const client = getHostedGraphServiceClient();
  const resp = await client.request(
    gql`
      query block($subgraphName: String!) {
        indexingStatusForCurrentVersion(subgraphName: $subgraphName) {
          chains {
            latestBlock {
              number
            }
          }
        }
        indexingStatusForPendingVersion(subgraphName: $subgraphName) {
          chains {
            latestBlock {
              number
            }
          }
        }
      }
    `,
    { subgraphName }
  );
  const latestBlock = Number(resp.indexingStatusForCurrentVersion.chains[0].latestBlock.number);
  const pendingUpdate = resp.indexingStatusForPendingVersion !== null;
  return { latestBlock, pendingUpdate };
};
