import { useMemo } from "react";

export const useFindClasses = (str: string) => {
  return useMemo(() => {
    const found = str.match(/class="([^"]+)/g);
    const classes = [...new Set(found?.map((el) => el.replace('class="', '').split(/\s+/)).flat())];
    const und = classes?.filter((el) => {
      const reg = new RegExp(`\\.${el}(?!\\w+)([^]+){`, 'g');
      return !str.match(reg);
    });
    return und
  }, [str])
}