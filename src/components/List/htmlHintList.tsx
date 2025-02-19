import { FC, useMemo, } from 'react';
import { HTMLHint } from 'htmlhint';
import classNames from 'classnames';
import { IRange, rulesets } from '../../constants';
import styles from './List.module.scss';
interface htmlHintListProps {
  className?: string;
  source: string;
  revealLine: (line: number, range: IRange) => void;
}
// const useFindClasses = (str: string) => {
//   const [undClasses, setUndClasses] = useState<string[]>([]);
//   useEffect(() => {
//     setUndClasses([]);
//     const found = str.match(/class="([^"]+)/g);
//     const classes = [...new Set(found?.map((el) => el.replace('class="', '').split(/\s+/)).flat())];
//     const und = classes?.filter((el) => {
//       const reg = new RegExp(`\\.${el}(?!\\w+)([^]+){`, 'g');
//       return !str.match(reg);
//     });
//     setUndClasses(und);
//   }, [str]);

//   return undClasses;
// };


const useFindClasses = (str: string) => {
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
export const HtmlHintList: FC<htmlHintListProps> = ({ source, revealLine }) => {
  const results = HTMLHint.verify(source, rulesets);
  const undClasses = useFindClasses(source);
  return (
    <div className={classNames(styles.List)}>
      <div style={{ marginBottom: '10px' }}>
        {undClasses.map((el, i) => {
          return (
            <div
              key={i}
              title='copyable'
              onClick={() => {
                navigator.clipboard.writeText('.' + el);
              }}
              className={classNames(styles.item)}
            >
              <span className={styles.error}>{el}</span> class is undefined
            </div>
          );
        })}
      </div>
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
            {el.message + ' Line: ' + el.line}
          </div>
        );
      })}
    </div>
  );
};
