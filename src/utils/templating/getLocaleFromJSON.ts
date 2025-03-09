/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
export const getLocalesFromJSONString = (str: string) => {
  try {
    const locale: object = JSON.parse(str)?.locales;
    if (locale) {
      const localeString = Object.keys(locale)[0];
      return localeString;
    }
    return 'de';
  } catch (e) {
    console.log(e);
    return 'ru';
  }
};

export const changeLocaleInLocale = (str: string, newLocale: string) => {
  try {
    const jsonObject = JSON.parse(str);
    if (jsonObject?.locales) {
      jsonObject.locales = { [newLocale]: true };
    }
    return JSON.stringify(jsonObject, null, 2);
  } catch (e) {
    console.log(e);
    return str;
  }
};
