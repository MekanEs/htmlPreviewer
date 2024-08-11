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
      <RedirList regMatches={regCampaign} />
      <RedirList regMatches={regCampaignPixel} />
      <RedirList regMatches={regContent} />
      <RedirList regMatches={regContentPixel} />
      <RedirList regMatches={regRedir} header='Redirections' />
      <RedirList regMatches={regSubscription} />
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
