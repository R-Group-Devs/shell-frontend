import { Contract } from 'ethers';
import { getRpc } from '../lib/web3';
import IEngine from './abis/IEngine.json';

export const isValidEngine = async (chainId: number, address: string): Promise<boolean> => {
  const rpc = getRpc(chainId);
  const engine = new Contract(address, IEngine.abi, rpc);
  try {
    const resp = await engine.supportsInterface('0x0b1d171c');
    return resp;
  } catch (err) {
    return false;
  }
};
