import { Contract } from 'ethers';
import ReverseRecords from './abis/ReverseRecords.json';
import { getRpc } from './networks';

// https://github.com/ensdomains/reverse-records
const reverseRecordsAddress = '0x3671aE578E63FdF66ad4F3E12CC0c0d71Ac7510C';

export const batchResolveEnsNames = async (addresses: string[]): Promise<(string | undefined)[]> => {
  const rr = new Contract(reverseRecordsAddress, ReverseRecords, getRpc(1));
  const names: string[] = await rr['getNames(address[])'](addresses);
  const projected = names.map((n) => (n ? n : undefined));
  return projected;
};
