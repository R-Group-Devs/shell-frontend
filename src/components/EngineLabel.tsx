import React, { FunctionComponent } from 'react';
import { AddressPrefix } from './AddressPrefix';
import { Dimmed } from './Dimmed';

interface Props {
  forkId?: string;
  rootEngineAddress?: string;
  engine: { name: string; address: string };
}

export const EngineLabel: FunctionComponent<Props> = ({ forkId, engine, rootEngineAddress }) => {
  return forkId === '0' || rootEngineAddress === engine.address ? (
    <Dimmed>(same as root fork)</Dimmed>
  ) : (
    <AddressPrefix address={engine.address}>{engine.name}</AddressPrefix>
  );
};
