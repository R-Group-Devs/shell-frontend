export const isWalletPresent = (): boolean => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (window as any).ethereum !== undefined;
};
