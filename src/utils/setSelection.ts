import React from 'react';
import { EditorSelection } from '../types/types';
export const SelectRange =
  (fb: React.Dispatch<React.SetStateAction<EditorSelection>>) => (selection: EditorSelection) => {
    fb(selection);
  };
