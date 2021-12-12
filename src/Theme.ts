/** theme values */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createTheme = () => {
  const theme = {
    palette: {
      background: {
        main: '#5c7aff',
        light: '#086375',
      },
      foreground: {
        main: '#FDFFFC',
      },
      accent: {
        main: '#73fbd3',
        secondary: '#44e5e7',
        tertiary: '#85DEFE',
      },
    },
    font: '"DM Mono", monospace',
    maxWidth: '1150px',
    spacing: (...mults: number[]): string => mults.map((m) => `${m / 4}rem`).join(' '),
    scaledSpacing: (size: number, scaling = 0.1): string =>
      `calc(${theme.spacing(size)} + min(${scaling}vw, ${scaling}vh))`,
  };
  return theme;
};

export type ThemeConfig = ReturnType<typeof createTheme>;
