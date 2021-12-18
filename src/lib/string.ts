import { BigNumber, BigNumberish } from 'ethers';
import { formatDistanceToNowStrict, format } from 'date-fns';

export const truncateHex = (hex: string | number | BigNumber, first = 4, last = 4): string => {
  const bn = BigNumber.from(hex);
  const s = bn.toHexString();

  // already short enough
  if (s.length <= 2 + first + last) {
    return s;
  }

  return `${s.slice(0, 2 + first)}…${s.slice(-last)}`;
};

export const timestampRelative = (timestampInSeconds: BigNumberish): string => {
  const distance = formatDistanceToNowStrict(BigNumber.from(timestampInSeconds).toNumber() * 1000);
  return `${distance} ago`;
};

export const formatDate = (timestampInSeconds: BigNumberish): string => {
  return format(BigNumber.from(timestampInSeconds).toNumber() * 1000, 'PP');
};
