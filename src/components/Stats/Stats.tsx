import { FC } from 'react';
import styles from './Stats.module.scss';
import classNames from 'classnames';
import useRegMatcher from '../../utils/regMatcher';
import {
  findLinks,
  findRedirectsProps,
  findSubscriptionProps,
  findUtmCampaign,
  findUtmCampaignPixel,
  findUtmContent,
  findUtmContentPixel,
  RegErrors,
  findLangs,
  findLangs2,
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
  const langs2 = useUtmFinder(source, findLangs);
  const langs = useUtmFinder(source, findLangs2);
  const regContent = useUtmFinder(source, findUtmContent);
  const regContentPixel = useUtmFinder(source, findUtmContentPixel);
  const regCampaign = useUtmFinder(source, findUtmCampaign);
  const regCampaignPixel = useUtmFinder(source, findUtmCampaignPixel);
  const regRedir = useUtmFinder(source, findRedirectsProps);
  const regLinks = useUtmFinder(source, findLinks);
  const regSubscription = useUtmFinder(source, findSubscriptionProps);


  const err = useRegMatcher({ regs: RegErrors, text: source });
  return (
    <div className={classNames(styles.Stats, {}, [className])}>
      <div style={{ display: 'flex' }}>
        <div className={classNames(styles.List, styles['half-w'])}>
          <h3 className={styles.header}>Utm_Campaign</h3>
          <RedirList regMatches={regCampaign} />
          <RedirList regMatches={regCampaignPixel} />
        </div>
        <div className={classNames(styles.List, styles['half-w'])}>
          <h3 className={styles.header}>Utm_Content</h3>
          <RedirList regMatches={regContent} />
          <RedirList regMatches={regContentPixel} />
        </div>
      </div>
      <div className={styles.List}>
        <h3 className={styles.header}>Redirections</h3>
        <RedirList regMatches={regRedir} />
        <RedirList regMatches={regSubscription} />
        <RedirList regMatches={regLinks} />
      </div>

      <div style={{ display: 'flex' }}>
        <LangList className={styles.quarterWidth} regMatches={langs} />
        <LangList className={styles.quarterWidth} regMatches={langs2} />
        <LangList regMatches={err} hasDesc />
      </div>

      <div>
        <HtmlHintList source={source} revealLine={revealLine} />
      </div>
    </div>
  );
};
