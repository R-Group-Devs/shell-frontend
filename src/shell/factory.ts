import { Contract, ContractTransaction, Signer, Transaction } from 'ethers';
import { getChainInfo } from './networks';
import CollectionFactory from './abis/CollectionFactory.json';

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
  const factory = new Contract(info.factoryAddress, CollectionFactory.abi, signer);
  const trx = await factory.createCollection(name, symbol, engine, owner);
  return trx;
};
