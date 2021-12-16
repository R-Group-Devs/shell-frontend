import React, { FunctionComponent, useEffect, useState } from 'react';
import sample from 'lodash/sample';
import { useTheme } from '@material-ui/styles';
import { ThemeConfig } from '../Theme';

const whomstAmongUs = [
  'builders',
  'artists',
  'squads',
  'pods',
  'explorers',
  'DAOs',
  'curators',
  'subDAOs',
  'guilds',
  'homies',
  'storytellers',
];

export const Whomst: FunctionComponent = () => {
  const [whomst, setWhomst] = useState(sample(whomstAmongUs));
  const [buffer, setBuffer] = useState(whomst);
  const theme = useTheme<ThemeConfig>();

  const rotate = () => {
    const next = sample(whomstAmongUs.filter((x) => x !== whomst));
    setWhomst(next);
  };

  const update = () => {
    const letterIndexesThatNeedToChange = [...whomst]
      .map((s, idx) => (buffer[idx] !== whomst[idx] ? idx : null))
      .filter((x) => x !== null);
    if (letterIndexesThatNeedToChange.length === 0) return;
    const indexToChange = sample(letterIndexesThatNeedToChange);
    const nextLetters = [...whomst].map((s, idx) => (idx === indexToChange ? s : buffer[idx] ?? ' '));
    setBuffer(nextLetters.join(''));
  };

  useEffect(() => {
    const h = setInterval(rotate, 2500);
    return () => clearInterval(h);
  }, [whomst]);

  useEffect(() => {
    const h = setInterval(update, 50);
    return () => clearInterval(h);
  });

  return (
    <span style={{ color: buffer === whomst ? theme.palette.accent.secondary : theme.palette.foreground.main }}>
      {buffer}
    </span>
  );
};
