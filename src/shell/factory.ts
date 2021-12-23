import { Contract, ContractTransaction, Signer } from 'ethers';
import { getChainInfo } from './networks';
import IShellFactory from './abis/IShellFactory.json';

interface CreateCollection {
  name: string;
  symbol: string;
  engine: string;
  owner: string;
}

export const createCollection = async (
  signer: Signer,
  { name, symbol, engine, owner }: CreateCollection
): Promise<ContractTransaction> => {
  const info = getChainInfo(await signer.getChainId());
  const factory = new Contract(info.factoryAddress, IShellFactory.abi, signer);
  const trx = await factory.createCollection(name, symbol, engine, owner);
  return trx;
};
