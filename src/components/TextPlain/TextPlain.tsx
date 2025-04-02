import { compile, HtmlToTextOptions } from 'html-to-text';
import { useEffect, useState } from 'react';

import { useAppSelector } from '../../store/store';
export const TextPlain = () => {
  const { source } = useAppSelector(state => state.htmlReducer);
  const [text, setText] = useState('1');
  const options: HtmlToTextOptions = {
    selectors: [
      { selector: 'img', format: 'skip' },
      { selector: 'a', options: { linkBrackets: ['(', ')'] } },
    ],

    // ...
  };
  const compiledConvert = compile(options);
  useEffect(() => {
    setText(compiledConvert(source));
  }, [compiledConvert, source]);
  return (
    <div>
      <textarea value={text}></textarea>
    </div>
  );
};
