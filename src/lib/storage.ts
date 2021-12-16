export const getBangers = (): string[] => JSON.parse(localStorage.getItem('bangers') ?? '[]');

export const saveBangers = (bangers: string[]) => localStorage.setItem('bangers', JSON.stringify(bangers));

export const getTaps = (): number => {
  return JSON.parse(localStorage.getItem('shell taps') ?? '0');
};

export const incrementTaps = (): number => {
  const next = getTaps() + 1;
  localStorage.setItem('shell taps', JSON.stringify(next));
  return next;
};
