import React from 'react';

export const SelectRange =
  (
    fb: React.Dispatch<
      React.SetStateAction<{
        from: number;
        to: number;
      }>
    >,
  ) =>
  (from: number, to: number) => {
    const newSel = {
      from,
      to,
    };
    fb(newSel);
  };
