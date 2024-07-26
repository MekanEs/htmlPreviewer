export const RegErrors = [
  /"\s*\}\}\s+[A-Za-z0-9А-Яа-я]/gm,
  /target="blank"/gm,
  /<\w[^>]*>\s+\n*[A-Za-z0-9А-Яа-я]/gm,
/[A-Za-z0-9А-Яа-я()][\t\f\cK ]+(?=<\u002f[^>]*>)/gm,
  /^\s*$\n/gm,
  /[A-Za-z0-9А-Яа-я]\s+\s+\s*[A-Za-z0-9А-Яа-я]/gm,
  /(\s+&nbsp;)|&nbsp;\s+/gm,
  /alt=""|alt=''/gm,
  /style='/gm,
  /[0-9][0-9][0-9][0-9]&/gm,
   /\?title=\{/gm,
  /\?title='/gm
];
export const RegErrorDesc = [
  'пробел\\перенос после знака }',
  'неправильная ссылка',
  'перенос после тэга',
  'перенос/пробел перед закр тэгом',
  'лишний перенос',
  'больше 1 пробела',
  'пробел рядом с неразрывным',
  'пустой alt',
  'кавычки тэга style',
  '4 числа подряд (необработанная вал формула)',
  "title для ежедневок",
  "title для техничек"
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

export const borderStyle = `* {outline: 1px solid #000;box-shadow: 0 0 2px #fff;}`;
