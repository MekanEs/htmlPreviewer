import { FC, useMemo } from 'react';
import styles from './Stats.module.scss';
import classNames from 'classnames';
import { useRegMatcher } from '../../utils';
import { RedirList } from '../List/RedirList';
import { HintList } from '../List/HintList';
import { RegErrors, regExpsToFind } from '../../constants/regExp';
import { FindInText } from '../../utils/findInText';
import { IRange } from '../../constants';
import { LangList } from '../List/LangList';

interface StatsProps {
  className?: string;
  source: string;
  revealLine: (range: IRange) => void;
}

export const Stats: FC<StatsProps> = ({ className, source, revealLine }) => {
  // Используем useMemo для оптимизированного вычисления textMatches
  const textMatches = useMemo(() => {
    return Object.keys(regExpsToFind).reduce((acc, key) => {
      acc[key] = FindInText(source, regExpsToFind[key]);
      return acc;
    }, {} as Record<string, Record<string, number>>);
  }, [source]);

  const err = useRegMatcher({ regs: RegErrors, text: source });

  return (
    <div className={classNames(styles.Stats, className)}>
      <div className={styles.flex}>
        <UtmSection title="Utm_Campaign" matches={[textMatches.regCampaign, textMatches.regCampaignPixel]} />
        <UtmSection title="Utm_Content" matches={[textMatches.regContent, textMatches.regContentPixel]} />
      </div>
      <RedirectionsSection matches={[textMatches.regRedir, textMatches.regSubscription, textMatches.regLinks]} />
      <LanguagesSection matches={[textMatches.regLocales, textMatches.langs2, textMatches.langs]} errors={err} />
      <HintList revealLine={revealLine} source={source} />
    </div>
  );
};

const UtmSection: FC<{ title: string; matches: (Record<string, number> | undefined)[] }> = ({ title, matches }) => (
  <div className={classNames(styles.List, styles['half-w'])}>
    <h3 className={styles.header}>{title}</h3>
    {matches.map((match, i) => match && <RedirList key={i} regMatches={match} />)}
  </div>
);

const RedirectionsSection: FC<{ matches: (Record<string, number> | undefined)[] }> = ({ matches }) => (
  <div className={styles.List}>
    <h3 className={styles.header}>Redirections</h3>
    {matches.map((match, i) => match && <RedirList key={i} regMatches={match} />)}
  </div>
);

const LanguagesSection: FC<{ matches: (Record<string, number> | undefined)[]; errors: Record<string, number> }> = ({ matches, errors }) => (
  <div className={styles.flexContainer}>
    <div style={{ display: 'flex', flexWrap: 'wrap', minWidth: '40%', height: 'fit-content' }}>
      {matches.map((match, i) => match && <LangList key={i} regMatches={match} />)}
    </div>
    <LangList className={styles.flexGrow} regMatches={errors} hasDesc />
  </div>
);