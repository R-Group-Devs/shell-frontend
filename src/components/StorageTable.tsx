import React, { FunctionComponent } from 'react';
import { timestampRelative } from '../lib/string';
import { ForkInfoFragment, NftInfoFragment } from '../shell/graph-generated';
import { Dimmed } from './Dimmed';
import { None } from './None';
import { Table } from './Table';

interface Props {
  storage: NftInfoFragment['storage'] | ForkInfoFragment['storage'];
}

export const StorageTable: FunctionComponent<Props> = ({ storage }) => {
  if (storage.length === 0) {
    return <None />;
  }
  return (
    <Table>
      <thead>
        <td>Key</td>
        <td>Location</td>
        <td>Value</td>
        <td>Last Update</td>
      </thead>
      <tbody>
        {storage.map((storage) => (
          <tr>
            <td>
              <Dimmed>{storage.stringValue === null ? 'uint256' : 'string'}</Dimmed> {storage.key}
            </td>
            <td>{storage.location}</td>
            <td>{storage.intValue}</td>
            <td>{timestampRelative(storage.updatedAtTimestamp)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
