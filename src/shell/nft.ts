import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { Provider as MulticallProvider, Contract as MulticallContract } from 'ethers-multicall';
import { getChainInfo } from './networks';

export interface TokenURIRequest {
  contract: string;
  tokenId: string;
}

export interface TokenURIResponse {
  contract: string;
  tokenId: string;
  tokenURI: string;
}

const ABI = ['function tokenURI(uint256 tokenId) public view returns (string memory)'];

export const batchGetTokenURI = async (chainId: number, input: TokenURIRequest[]): Promise<TokenURIResponse[]> => {
  const info = getChainInfo(chainId);
  const provider = new MulticallProvider(new StaticJsonRpcProvider(info.rpcEndpoint), chainId);

  const calls = input.map((datum) => new MulticallContract(datum.contract, ABI).tokenURI(datum.tokenId));

  const response = await provider.all(calls);

  const projected = response.map((r, idx) => {
    return {
      ...input[idx],
      tokenURI: r,
    };
  });

  return projected;
};
