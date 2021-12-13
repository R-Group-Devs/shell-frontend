import React, { FunctionComponent, useState } from 'react';
import { Shell } from '../components/Shell';
import { getBangers, saveBangers } from '../lib/bangers';

interface Props {
  bangers: string[];
}

export const Bangers: FunctionComponent<Props> = ({ bangers }) => {
  const [saved, setSaved] = useState<string[]>(getBangers());

  const toggleBanger = (banger: string) => {
    const saved = getBangers();
    if (saved.includes(banger)) {
      saveBangers(saved.filter((b) => b !== banger));
    } else {
      saveBangers([...new Set([...saved, banger])]);
    }

    setSaved(getBangers());
  };

  return (
    <>
      <ul>
        {bangers.map((b) => (
          <li key={b} onClick={() => toggleBanger(b)}>
            [<span style={{ visibility: saved.includes(b) ? 'visible' : 'hidden' }}>🐚</span>] {b}
          </li>
        ))}
      </ul>
      {getBangers().length > 0 && (
        <p>
          Nice. Welcome to <Shell /> 🐚
        </p>
      )}
    </>
  );
};
