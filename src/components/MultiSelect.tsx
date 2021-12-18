import { makeStyles } from '@material-ui/styles';
import chunk from 'lodash/chunk';
import React, { FunctionComponent, ReactChild } from 'react';
import { ThemeConfig } from '../Theme';
import { TwoPanel } from './TwoPanel';

const useStyles = makeStyles<ThemeConfig>((theme) => {
  return {
    item: {
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: theme.palette.accent.secondary,
        color: theme.palette.background.main,
      },
    },
  };
});

export interface SelectItem {
  value: string;
  display: ReactChild;
  selected: boolean;
}

interface Props {
  items: SelectItem[];
  onSelect: (item: SelectItem) => void;
}

export const MultiSelect: FunctionComponent<Props> = ({ items, onSelect }) => {
  const classes = useStyles();
  const chunks = chunk(items, Math.ceil(items.length / 2));
  return (
    <TwoPanel>
      {chunks.map((chunk, idx) => (
        <div key={idx}>
          <ul>
            {chunk.map((item) => (
              <li className={classes.item} key={item.value} onClick={() => onSelect(item)}>
                [
                <span style={{ visibility: item.selected ? 'visible' : 'hidden', position: 'relative', left: '2px' }}>
                  🐚
                </span>
                ] <span style={{ fontStyle: 'italic', fontWeight: 'bold' }}>{item.display}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </TwoPanel>
  );
};
