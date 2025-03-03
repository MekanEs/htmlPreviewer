import { FC, useState } from 'react';

import { LS_MONACOTHEME } from '../../constants';
import { themes } from '../../themes/themes';
import { themeSwitcher } from '../../utils';

export const ThemeSwitcher: FC = () => {
  const [theme, setTheme] = useState(localStorage.getItem(LS_MONACOTHEME) ?? 'all-hallows-eve');
  return (
    <select
      value={theme}
      onChange={e => {
        themeSwitcher(e.target.value);
        localStorage.setItem(LS_MONACOTHEME, e.target.value);
        setTheme(e.target.value);
      }}
    >
      {Object.keys(themes).map(el => (
        <option key={el} value={el}>
          {el}
        </option>
      ))}
    </select>
  );
};
