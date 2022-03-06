import React, { FunctionComponent } from 'react';

interface Props {
  amount?: number;
}

export const Percentage: FunctionComponent<Props> = ({ amount }) => {
  if (!Number.isFinite(amount)) {
    return <>N/A</>;
  }

  const p = amount * 100;
  const formatted = p < 0.01 ? '< 0.01' : p < 1 ? p.toFixed(2) : p < 10 ? p.toFixed(1) : p.toFixed(0);

  return <>{formatted}</>;
};
