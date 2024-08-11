import { useEffect, useState } from 'react';
import { FindPropsObject } from '../types/types';

export const useUtmFinder = (text: string = '', propObj: FindPropsObject) => {
  const { regexp, replace } = propObj;
  if (replace === 'utm_content') {
    console.log(replace);
  }
  const [regMatches, setRegObjs] = useState({});
  useEffect(() => {
    const matches = text.match(regexp) || [];

    const check: Record<string, number> = matches.reduce(
      (acc: Record<string, number>, el: string) => {
        const match = el.replace(replace, '').split('"')[0];
        if (replace === 'utm_content') {
          console.log(match, el);
        }
        if (acc[match]) {
          acc[match] += 1;
        } else {
          acc[match] = 1;
        }

        return acc;
      },
      {},
    );
    setRegObjs(check);
  }, [text, regexp, replace]);

  return regMatches;
};
