import React, { FunctionComponent, useState } from 'react';
import { Shell } from './Shell';
import { getBangers, saveBangers } from '../lib/storage';
import { makeStyles } from '@material-ui/styles';
import { ThemeConfig } from '../Theme';
import chunk from 'lodash/chunk';
import { TwoPanel } from './TwoPanel';
import { MultiSelect, SelectItem } from './MultiSelect';

const bangers = [
  'Iterative experimentation',
  'NFT mechanism research',
  'Symbolic composition',
  'Product prototyping',
  'Artistic exploration',
  'Dynamic NFTs',
  'Emergent interaction',
  'Meta-interoperability',
  'Network debugging',
  'Play-oriented design',
];

const hype = ['Nice choice', 'Great choices', 'Excellent selections', 'Killer picks', 'Absolutely insane choices'];

export const Bangers: FunctionComponent = () => {
  const [items, setItems] = useState<SelectItem[]>(
    bangers.map((b) => {
      const saved = getBangers();
      return { display: b, value: b, selected: saved.includes(b) };
    })
  );

  const onSelect = (item: SelectItem) => {
    const next = items.map((i) => {
      if (i === item) {
        return { ...i, selected: !i.selected };
      }
      return i;
    });
    saveBangers(next.filter((b) => b.selected).map((b) => b.value));
    setItems(next);
  };

  const pick = hype[Math.min(hype.length - 1, Math.max(0, getBangers().length - 1))];

  return (
    <>
      <MultiSelect items={items} onSelect={onSelect} />

      {getBangers().length > 0 && (
        <>
          <p>
            {pick}. Welcome to <Shell />.
          </p>
          <p>The journey begins very soon.</p>
        </>
      )}
    </>
  );
};
