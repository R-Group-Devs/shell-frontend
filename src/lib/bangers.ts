export const getBangers = (): string[] => JSON.parse(localStorage.getItem('bangers') ?? '[]');

export const saveBangers = (bangers: string[]) => localStorage.setItem('bangers', JSON.stringify(bangers));
