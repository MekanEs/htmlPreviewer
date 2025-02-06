import { Ruleset } from 'htmlhint/types';
import { FindPropsObject } from './types/types';
import * as monaco from 'monaco-editor';
import { editor } from 'monaco-editor';
import { IRange } from 'monaco-editor';

export {monaco}
export {editor}
export type {IRange}
export const RegErrors = [
  /"\s*\}\}\s+[A-Za-z0-9А-Яа-я]/gm,
  /(?!target="_blank")target="([^]+)"/gm,
  /<\w[^>]*>\s+\n*[A-Za-z0-9А-Яа-я]/gm,
  /[A-Za-z0-9А-Яа-я()][\t\f\cK ]+(?=<\u002f[^>]*>)/gm,
  /^\s*$\n/gm,
  /[A-Za-z0-9А-Яа-я]\n\s*[A-Za-z0-9А-Яа-я]/gm,
  /[A-Za-z0-9А-Яа-я]\s+\s+\s*[A-Za-z0-9А-Яа-я]/gm,
  /(\s+&nbsp;)+|&nbsp;[\t\f\cK ]+/gm,
  /alt=""|alt=''/gm,
  /style='/gm,
  /\}[0-9][0-9][0-9][0-9]&/gm,
  /(%3D|%3F|%26|%23)\s|\s(%3D|%3F|%26|%23)/gm,
  /(?!\s+[!?]im)\s+[!?:]/gm,
  /alt="([^"]+)\s*([a-z]+)(=|>)/gm,
  /(<\w*(?!>)([^])<)|(<<)/gm,
  /heigth/gm,
  /\?title='\{/gm,
  /\?title=\{/gm,
  /(?!.\?title='\{).\?title='([^']+)'/gm,
  /href="unsubscribe"/gm,
  /game_currency\s*("BTC"|"ETH"|"LTC"|"BCH"|"XRP"|"TRX"|"DOGE"|"USDT")/gm,
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
  'пробел в ссылке',
  'пробел перед знаком(fr)',
  'незакрытый alt',
  'ошибка типа <тэг <тэг>',
  'неправильный атрибут или стиль(height)',
  'некорректный title для ежедневок',
  'title для ежедневок',
  'title для техничек',
  'ссылка/заглушка отписки',
  'криптовалюта + game_currency'
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
  'attr-unsafe-chars': false,
  'tagname-specialchars': true,
  'attr-no-duplication': true,
  'attr-lowercase': true,
  'empty-tag-not-self-closed': false,
  'attr-value-double-quotes': true,
  'alt-require': true,
  'src-not-empty': true,
  'title-require': true,
  'inline-style-disabled': false,
  'tr-in-table':true,
};
export const rulesets2: Ruleset = {
  'doctype-first': false,
  'tag-pair': true,
  'tag-self-close': true,
  'tagname-lowercase': true,
  'attr-unsafe-chars': false,
  'tagname-specialchars': true,
  'attr-no-duplication': true,
  'attr-lowercase': true,
  'empty-tag-not-self-closed': false,
  'attr-value-double-quotes': true,
  'alt-require': true,
  'src-not-empty': true,
  'title-require': true,
  'inline-style-disabled': false,
  "tags-check":{
     "a": {
      "attrsRequired": ["href", "target"],
      "redundantAttrs": ["alt"],
    },
    "img":{
      "redundantAttrs":["title"]
    }
  }
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
export const findLangs: FindPropsObject = {
  regexp: /lang=[^]{5}/g,
  replace: '',
};
export const findLangs2: FindPropsObject = {
  regexp: /lang%3D[^]{5}/g,
  replace: '%26',
};
export const findLocales: FindPropsObject = {
  regexp: /locales\.[^]{2}/g,
  replace: '',
};
export const findImages: FindPropsObject = {
  regexp: /src="([^"]+)/g,
  replace: '\\',
};
export const LS_FONTSIZEKEY = 'ls_fontSize';
export const LS_SOURCEHTML = 'ls_source';
export const LS_SOURCEJSON = 'ls_source_json';
export const LS_SHOWDESCMODE = 'ls_show_desc';
export const LS_MONACOTHEME = 'ls_monaco_theme';
 export const custom_snippets_emmet:{
    [name: string]: string
  } ={
  b_nwrp:'b[style="white-space: nowrap;"]',
  b_nwrp_white:'b[style="white-space: nowrap; color: #ffffff;"]',
  span_nwrp:'span[style="white-space: nowrap;"]',
  span_nwrp_white:'span[style="white-space: nowrap; color: #ffffff;"]',
  table_email:'table[width="100%" cellpadding="0" cellspacing="0" border="0"]',
  block1:'tr>td>table_email',
  block2:'table_email>tr>td',
  metapack:'meta[http-equiv="Content-Type" content="text/html; charset=utf-8"]+meta[name="viewport" content="width=device-width, initial-scale=1.0"]+meta[http-equiv="X-UA-Compatible" content="IE=edge"]+meta[content="telephone=no" name="format-detection"]+meta[name="x-apple-disable-message-reformatting"]+meta[name="color-scheme" content="light dark"]+meta[name="supported-color-schemes" content="light dark"]'
}