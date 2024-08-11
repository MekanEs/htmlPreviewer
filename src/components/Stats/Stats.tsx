import { FC } from 'react';
import styles from './Stats.module.scss';
import classNames from 'classnames';
import useRegMatcher from '../../utils/regMatcher';
import {
  findRedirectsProps,
  findSubscriptionProps,
  findUtmCampaign,
  findUtmCampaignPixel,
  findUtmContent,
  findUtmContentPixel,
  RegErrors,
  RegLangs,
  RegLangs2,
} from '../../constants';
import { LangList } from '../List/langList';
import { RedirList } from '../List/RedirList';
import { HtmlHintList } from '../List/htmlHintList';
import { useUtmFinder } from '../../hooks/utmFinder';
import { IRange } from 'monaco-editor';
interface StatsProps {
  className?: string;
  source: string;
  revealLine: (line: number, range: IRange) => void;
}

export const Stats: FC<StatsProps> = ({ className, source, revealLine }) => {
  const regContent = useUtmFinder(source, findUtmContent);
  const regContentPixel = useUtmFinder(source, findUtmContentPixel);
  const regCampaign = useUtmFinder(source, findUtmCampaign);
  const regCampaignPixel = useUtmFinder(source, findUtmCampaignPixel);
  const regRedir = useUtmFinder(source, findRedirectsProps);
  const regSubscription = useUtmFinder(source, findSubscriptionProps);
  const lang1 = useRegMatcher({ regs: RegLangs, text: source });
  const lang2 = useRegMatcher({ regs: RegLangs2, text: source });
  const err = useRegMatcher({ regs: RegErrors, text: source });
  return (
    <div className={classNames(styles.Stats, {}, [className])}>
      <div className={styles.List}>
        <h3 className={styles.header}>Utm_Campaign</h3>
        <RedirList regMatches={regCampaign} />
        <RedirList regMatches={regCampaignPixel} />
      </div>
      <div className={styles.List}>
        <h3 className={styles.header}>Utm_Content</h3>
        <RedirList regMatches={regContent} />
        <RedirList regMatches={regContentPixel} />
      </div>
      <div className={styles.List}>
        <h3 className={styles.header}>Redirections</h3>
        <RedirList regMatches={regRedir} />
        <RedirList regMatches={regSubscription} />
      </div>

      <div style={{ display: 'flex' }}>
        <LangList regMatches={lang1} />
        <LangList regMatches={lang2} />
        <LangList regMatches={err} hasDesc />
      </div>
      <div>
        <HtmlHintList source={source} revealLine={revealLine} />
      </div>
    </div>
  );
};
