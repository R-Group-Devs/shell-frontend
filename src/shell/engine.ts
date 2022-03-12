import { Contract } from 'ethers';
import IEngine from './abis/IEngine.json';
import { getRpc } from './networks';

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
