import { FC } from 'react';
import { HTMLHint } from 'htmlhint';
import classNames from 'classnames';
import { rulesets } from '../../constants';
import styles from './List.module.scss';
import { IRange } from 'monaco-editor';
interface htmlHintListProps {
  className?: string;
  source: string;
  revealLine: (line:number, range:IRange) => void;
}

export const HtmlHintList: FC<htmlHintListProps> = ({ source, revealLine }) => {
  const results = HTMLHint.verify(source, rulesets)

  return (
    <div className={classNames(styles.List)}>
      {results.map((el) => {
        const {line,col,evidence}=el
      const range:IRange =  {
        startLineNumber: line,
        startColumn: col,
        endLineNumber: line,
        endColumn: col + evidence.length - 1,
      }
        return (
          <div key={'line'+line+col}
            onDoubleClick={() => {
             revealLine(el.line,range)
            }}
            className={classNames(styles.item,styles[el.type])}
          >
            {el.message + ' Line: ' + el.line}
          </div>
        );
      })}
    </div>
  );
};
