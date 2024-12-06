import { useEffect, useState } from 'react';
export const useRegMatcher = ({ regs, text = '' }: { regs: RegExp[] | string[]; text: string }) => {
  const [regMatches, setRegObjs] = useState({});
  useEffect(() => {
    setRegObjs({});
    const check: Record<string, number> = regs.reduce(
      (acc: Record<string, number>, el: RegExp | string) => {
        const cur = text.match(el);
        acc[el.toString()] = cur?.length || 0;
        return acc;
      },
      {},
    );
    setRegObjs(check);
  }, [text, regs]);

  return regMatches;
};

