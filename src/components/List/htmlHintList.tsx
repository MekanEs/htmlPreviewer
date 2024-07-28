import { FC } from 'react';
import { HTMLHint } from 'htmlhint';
import classNames from 'classnames';
import { rulesets } from '../../constants';
import styles from './List.module.scss';

interface htmlHintListProps {
  className?: string;
  source: string;
  setSelection: (from: number, to: number) => void;
}

export const HtmlHintList: FC<htmlHintListProps> = ({ source, setSelection }) => {
  const results = HTMLHint.verify(source, rulesets);

  return (
    <div className={classNames(styles.List)}>
      {results.map((el) => {
        console.log(el);
        return (
          <div
            onDoubleClick={() => {
              const range = source.match(el.evidence);

              if (range && range.index) {
                setSelection(range.index, range.index + el.raw.length);
              }
            }}
            className={classNames(styles.item)}
          >
            {el.message + ' Line: ' + el.line}
          </div>
        );
      })}
    </div>
  );
};
