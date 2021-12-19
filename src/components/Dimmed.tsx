import React, { FunctionComponent } from 'react';

export const Dimmed: FunctionComponent = ({ children }) => {
  return <span style={{ opacity: 0.5, fontWeight: 100 }}>{children}</span>;
};
