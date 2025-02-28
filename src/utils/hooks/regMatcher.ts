import { useMemo } from 'react';

export const useRegMatcher = ({ regs, text = '' }: { regs: RegExp[] | string[]; text: string }) => {
  return useMemo(() => {
    if (!text) return {}; // Если текста нет, сразу возвращаем пустой объект

    return regs.reduce((acc: Record<string, number>, el: RegExp | string) => {
      const matches = text.match(el);
      acc[el.toString()] = matches?.length || 0;
      return acc;
    }, {} as Record<string, number>);
  }, [text, regs]);
};
