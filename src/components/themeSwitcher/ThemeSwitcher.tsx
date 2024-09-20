import { FC } from 'react';
import { themes } from '../../themes/themes';
import { themeSwitcher } from '../../utils/themeLoader';




export const ThemeSwitcher: FC = () => {
  return (
    <select onChange={(e)=>{themeSwitcher(e.target.value)}}>
   {Object.keys(themes).map(el=><option key={el} value={el}>{el}</option>)}
    </select>
  );
};
