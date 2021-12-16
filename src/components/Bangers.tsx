import React, { FunctionComponent, useState } from 'react';
import { Shell } from './Shell';
import { getBangers, saveBangers } from '../lib/storage';
import { makeStyles } from '@material-ui/styles';
import { ThemeConfig } from '../Theme';
import chunk from 'lodash/chunk';
import { TwoPanel } from './TwoPanel';

interface Props {
  bangers: string[];
}

const useStyles = makeStyles<ThemeConfig>((theme: ThemeConfig) => {
  return {
    banger: {
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: theme.palette.accent.secondary,
        color: theme.palette.background.main,
      },
    },
  };
});

export const Bangers: FunctionComponent<Props> = ({ bangers }) => {
  const [saved, setSaved] = useState<string[]>(getBangers());
  const classes = useStyles();

  const toggleBanger = (banger: string) => {
    const saved = getBangers();
    if (saved.includes(banger)) {
      saveBangers(saved.filter((b) => b !== banger));
    } else {
      saveBangers([...new Set([...saved, banger])]);
    }

    setSaved(getBangers());
  };

  const chunks = chunk(bangers, Math.ceil(bangers.length / 2));

  return (
    <>
      <TwoPanel>
        {chunks.map((chunk, idx) => (
          <div key={idx}>
            <ul>
              {chunk.map((b) => (
                <li className={classes.banger} key={b} onClick={() => toggleBanger(b)}>
                  [<span style={{ visibility: saved.includes(b) ? 'visible' : 'hidden' }}>🐚</span>]{' '}
                  <span style={{ fontStyle: 'italic', fontWeight: 'bold' }}>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </TwoPanel>

      {getBangers().length > 0 && (
        <>
          <p>
            Nice choice. Welcome to <Shell />.
          </p>
          <p>Your journey begins very soon.</p>
        </>
      )}
    </>
  );
};
