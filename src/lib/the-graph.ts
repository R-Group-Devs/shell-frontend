import memoize from 'lodash/memoize';
import { GraphQLClient, gql } from 'graphql-request';

export const getHostedGraphServiceClient = memoize(
  () => new GraphQLClient('https://api.thegraph.com/index-node/graphql')
);

export const getLatestIndexedBlock = async (subgraphName: string): Promise<number> => {
  const client = getHostedGraphServiceClient();
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
