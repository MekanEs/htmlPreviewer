import { FC } from 'react';
import styles from './Stats.module.scss';
import classNames from 'classnames';
import { RegKeys, useRedirectCounter, useRegCampaign, useRegContent } from '../../utils/regCounter';
import { List } from '../List/List';
import useRegMatcher from '../../utils/regMatcher';
import { RegErrors, RegLangs, RegLangs2 } from '../../constants';
import { LangList } from '../List/langList';
import { RedirList } from '../List/RedirList';

interface StatsProps {
  className?: string;
  source: string;
}

export const Stats: FC<StatsProps> = ({ className, source }) => {
  const regContent = useRegContent(source);
  const regCampaign = useRegCampaign(source);
  const regRedir = useRedirectCounter(source, RegKeys.redirectUtm);
  const regSubscription = useRedirectCounter(source, RegKeys.subscription);
  const lang1 = useRegMatcher({ regs: RegLangs, text: source });
  const lang2 = useRegMatcher({ regs: RegLangs2, text: source });
  const err = useRegMatcher({ regs: RegErrors, text: source });
  return (
    <div className={classNames(styles.Stats, {}, [className])}>
      <List list={regCampaign} name='utm_campaign' />
      <List list={regContent} name='utm_content' />
      <RedirList regMatches={regRedir} />
      <RedirList regMatches={regSubscription} />
      <div style={{ display: 'flex' }}>
        <LangList regMatches={lang1} />
        <LangList regMatches={lang2} />
        <LangList regMatches={err} hasDesc />
      </div>
    </div>
  );
};
