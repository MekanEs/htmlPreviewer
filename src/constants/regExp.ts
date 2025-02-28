import { FindPropsObject } from '../types/types';

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

export const RegErrors = [
  /"\s*\}\}\s+[A-Za-z0-9А-Яа-я]/gm,
  // /(?!target="_blank")target="([^]+)"/gm,
  /<\w[^>]*>\s+\n*[A-Za-z0-9А-Яа-я]/gm,
  /[A-Za-z0-9А-Яа-я()][\t\f\cK ]+(?=<\u002f[^>]*>)/gm,
  /^\s*$\n/gm,
  /[A-Za-z0-9А-Яа-я]\n\s*[A-Za-z0-9А-Яа-я]/gm,
  /[A-Za-z0-9А-Яа-я]\s+\s+\s*[A-Za-z0-9А-Яа-я]/gm,
  // /(\s+&nbsp;)+|&nbsp;[\t\f\cK ]+/gm,
  // /alt=""|alt=''/gm,
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
  // /game_currency\s*("BTC"|"ETH"|"LTC"|"BCH"|"XRP"|"TRX"|"DOGE"|"USDT")/gm,
  // /\{\{\s*unsubscription_url\s*\}\}(?!&redirect_url=\{\{\s*redirect_url\s*\}\}&autologin_token=\{\{\s*autologin_token\s*\}\})/gm,
];
export const RegErrorDesc = [
  'пробел\\перенос после знака }',
  // 'неправильная ссылка',
  'перенос после тэга',
  'перенос/пробел перед закр тэгом',
  'лишний перенос',
  'перенос внутри контента/формулы',
  'больше 1 пробела',
  // 'пробел рядом с неразрывным',
  // 'пустой alt',
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
  // 'криптовалюта + game_currency',
  // 'неверная ссылка отписки'
];

export const regExpsToFind: Record<string, FindPropsObject> = {
  langs2: findLangs2,
  langs: findLangs,
  regContent: findUtmContent,
  regContentPixel: findUtmContentPixel,
  regCampaign: findUtmCampaign,
  regCampaignPixel: findUtmCampaignPixel,
  regRedir: findRedirectsProps,
  regLinks: findLinks,
  regSubscription: findSubscriptionProps,
  regLocales: findLocales,
};
