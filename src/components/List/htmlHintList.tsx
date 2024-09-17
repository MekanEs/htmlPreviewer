import { FC, useEffect, useState } from 'react';
import { HTMLHint } from 'htmlhint';
import classNames from 'classnames';
import { rulesets } from '../../constants';
import styles from './List.module.scss';
import { IRange } from 'monaco-editor';
interface htmlHintListProps {
  className?: string;
  source: string;
  revealLine: (line: number, range: IRange) => void;
}
const useClassFinding = (str: string) => {
  const [undefinedClasses, setUndefinedClasses] = useState<string[]>([]);
  useEffect(() => {
    setUndefinedClasses([]);
    const searchRes = str.match(/class="([^"]+)/g);
    const allClasses = [
      ...new Set(searchRes?.map((el) => el.replace('class="', '').split(/\s+\s*/)).flat()),
    ];
    const und = allClasses.filter((el) => {
      const reg = new RegExp(`.${el}`, 'g');
      console.log(str.match(reg));
      return !str.match(`.${el}`);
    });
    console.log(und, allClasses);
  }, [str]);
};
export const HtmlHintList: FC<htmlHintListProps> = ({ source, revealLine }) => {
  const results = HTMLHint.verify(source, rulesets);
  useClassFinding(source);
  return (
    <div className={classNames(styles.List)}>
      {results.map((el) => {
        const { line, col, evidence } = el;
        const range: IRange = {
          startLineNumber: line,
          startColumn: col,
          endLineNumber: line,
          endColumn: col + evidence.length - 1,
        };
        return (
          <div
            key={'line' + line + col}
            onDoubleClick={() => {
              revealLine(el.line, range);
            }}
            className={classNames(styles.item, styles[el.type])}
          >
            <div>{el.type + el.col}</div>
            {el.message + ' Line: ' + el.line}
          </div>
        );
      })}
    </div>
  );
};
