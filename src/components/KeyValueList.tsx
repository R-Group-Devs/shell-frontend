import React, { FunctionComponent, ReactChild } from 'react';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => {
  return {
    table: {
      borderCollapse: 'collapse',
      width: '100%',
      lineHeight: '1.75',
    },
  };
});

export const KeyValueList: FunctionComponent = ({ children }) => {
  const classes = useStyles();
  return (
    <table className={classes.table}>
      <tbody>{children}</tbody>
    </table>
  );
};

interface EntryProps {
  label: ReactChild;
  value: ReactChild;
}

export const KeyValueEntry: FunctionComponent<EntryProps> = ({ label, value }) => {
  return (
    <tr>
      <td>
        <strong>{label}</strong>
      </td>
      <td style={{ textAlign: 'right' }}>{value}</td>
    </tr>
  );
};
