import { useMemo } from 'react';

import { FindPropsObject } from '../types/types';
//const selector =/([.#])(-?[_a-zA-Z\]+[\\!+_a-zA-Z0-9-]*)(?=[#.,()\s\[\]\^:*"'>=_a-zA-Z0-9-]*{[^}]*})/g;
export const useUtmFinder = (text = '', propObj: FindPropsObject) => {
  const { regexp, replace } = propObj;

  return useMemo(() => {
    const newText = text.replace(/redirect_url=\{\{/gm, '');
    const matches = newText.match(regexp) ?? [];

    return matches.reduce(
      (acc: Record<string, number>, el: string) => {
        const match = el.replace(replace, '').split('"')[0];
        acc[match] = (acc[match] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );
  }, [text, regexp, replace]);
};
