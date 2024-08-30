import { Ruleset } from 'htmlhint/types';
import { FindPropsObject } from './types/types';

export const RegErrors = [
  /"\s*\}\}\s+[A-Za-z0-9А-Яа-я]/gm,
  /target="blank"/gm,
  /<\w[^>]*>\s+\n*[A-Za-z0-9А-Яа-я]/gm,
  /[A-Za-z0-9А-Яа-я()][\t\f\cK ]+(?=<\u002f[^>]*>)/gm,
  /^\s*$\n/gm,
  /[A-Za-z0-9А-Яа-я]\n\s*[A-Za-z0-9А-Яа-я]/gm,
  /[A-Za-z0-9А-Яа-я]\s+\s+\s*[A-Za-z0-9А-Яа-я]/gm,
  /(\s+&nbsp;)+|&nbsp;[\t\f\cK ]+/gm,
  /alt=""|alt=''/gm,
  /style='/gm,
  /\}[0-9][0-9][0-9][0-9]&/gm,
  /\?title='\{/gm,
  /\?title=\{/gm,
  /(?!.\?title='\{).\?title='([^']+)'/gm,
  /(%3D|%3F|%26|%23)\s|\s(%3D|%3F|%26|%23)/gm,
  /(?!\s+[!?]im)\s+[!?]/gm,
  
];
export const RegErrorDesc = [
  'пробел\\перенос после знака }',
  'неправильная ссылка',
  'перенос после тэга',
  'перенос/пробел перед закр тэгом',
  'лишний перенос',
  'перенос внутри контента/формулы',
  'больше 1 пробела',
  'пробел рядом с неразрывным',
  'пустой alt',
  'кавычки тэга style',
  '4 числа подряд (необработанная вал формула)',
  'некорректный title для ежедневок',
  'title для ежедневок',
  'title для техничек',
  'пробел в ссылке',
  'пробел перед знаком(fr)',
];
export const RegLangs = [
  /lang%3Dru/gm,
  /lang%3Den/gm,
  /lang%3Des/gm,
  /lang%3Dpt/gm,
  /lang%3Dde/gm,
  /lang%3Dua/gm,
  /lang%3Dfi/gm,
  /lang%3Dtr/gm,
  /lang%3Dfr/gm,
  /lang%3Dpl/gm,
  /lang%3Dkz/gm,
  /lang%3Dja/gm,
  /lang%3Dhi/gm,
];
export const RegLangs2 = [
  /lang=ru/gm,
  /lang=en/gm,
  /lang=es/gm,
  /lang=pt/gm,
  /lang=de/gm,
  /lang=ua/gm,
  /lang=fi/gm,
  /lang=tr/gm,
  /lang=fr/gm,
  /lang=pl/gm,
  /lang=kz/gm,
  /lang=ja/gm,
  /lang=hi/gm,
];

export const RegRedirect = [/redirect_url=\/([^%3Futm]+)/gm];

export const RegQueries = [/utm_campaign%3D([^%]+)/gm, /utm_ontent%3D([^%]+)/gm];
export const str = `<div>1234</div>
<div>1234</div>`;
export const initialJson = `{
   "locales": {
    "ru": true
  },
  "account_currency": "BTC",
  "game_currency": "EUR"
}
`;
export const borderStyle = `* {outline: 1px solid #000;box-shadow: 0 0 2px #fff;}`;

export const rulesets: Ruleset = {
  'doctype-first': false,
  'tag-pair': true,
  'tag-self-close': true,
  'tagname-lowercase': true,
  'tagname-specialchars': true,
  'attr-no-duplication': true,
  'attr-lowercase': true,
  'empty-tag-not-self-closed': false,
  'attr-value-double-quotes': true,
  'alt-require': true,
  'src-not-empty': true,
  'title-require': true,
  'inline-style-disabled': false,
};
export const findRedirectsProps: FindPropsObject = {
  regexp: /redirect_url=(.*?)utm/gm,
  replace: 'utm',
};
export const findSubscriptionProps: FindPropsObject = {
  regexp: /subscription_type=(.*?)"/gm,
  replace: '',
};
export const findUtmContent: FindPropsObject = {
  regexp: /utm_content%3D([^%&]+)/g,
  replace: 'utm_content',
};
export const findUtmContentPixel: FindPropsObject = {
  regexp: /utm_content=([^?&]+)/g,
  replace: 'utm_content',
};
export const findUtmCampaign: FindPropsObject = {
  regexp: /utm_campaign%3D([^%&]+)/g,
  replace: 'utm_campaign',
};
export const findUtmCampaignPixel: FindPropsObject = {
  regexp: /utm_campaign=([^?&]+)/g,
  replace: 'utm_campaign',
};

export const findLinks: FindPropsObject = {
  regexp: /(?!.href=\{)href="https:\/([^?"]+)/g,
  replace: 'href="',
};

export const LS_FONTSIZEKEY = 'ls_fontSize';
