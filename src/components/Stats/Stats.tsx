import { FC } from 'react';
import styles from './Stats.module.scss';
import classNames from 'classnames';
import { useRegMatcher } from '../../utils';
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
  findLocales,
  IRange,
} from '../../constants';
import { LangList } from '../List/langList';
import { RedirList } from '../List/RedirList';
import { useUtmFinder } from '../../hooks/utmFinder';
import { HintList } from '../List/HintList';

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
  const regLocales = useUtmFinder(source, findLocales)

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
        {[regRedir, regSubscription, regLinks].map((regMatches, i) => {
          return <RedirList key={i} regMatches={regMatches} />
        })}

      </div>
      <div className={styles.List}>


      </div>
      <div style={{ display: 'flex', width: '100%', gap: '10px' }}>
        <div className={styles.half} style={{ display: 'flex', flexWrap: 'wrap', minWidth: '40%' }}>
          <LangList className={styles.half} regMatches={regLocales} />
          <LangList className={styles.half} regMatches={langs} />
          <LangList className={styles.half} regMatches={langs2} /></div>
        <LangList regMatches={err} hasDesc />
      </div>
      <div>
      </div>
      {/* <div>
        <HtmlHintList source={source} revealLine={revealLine} />
      </div> */}
      <div>
        <HintList revealLine={revealLine} source={source} />
      </div>
    </div>
  );
};
