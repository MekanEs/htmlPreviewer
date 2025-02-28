import { monaco } from '../../constants';
import { themes } from '../../themes/themes';
export const themeLoader = (themeKey: string) => {
  return import(`../../themes/${themeKey}.json`);
};

export const themeSwitcher = async (key: string) => {
  await themeLoader(themes[key]).then(data => {
    monaco.editor.defineTheme(key, data as monaco.editor.IStandaloneThemeData);
    monaco.editor.setTheme(key);
  });
};
