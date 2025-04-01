/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import Handlebars from 'handlebars';

Handlebars.registerHelper('equals', function (orig: unknown, val: unknown, options) {
  if (orig !== val && !options.hash.includeZero) {
    return options.inverse(this);
  } else {
    return options.fn(this);
  }
});
Handlebars.registerHelper('and', function (orig: unknown, val: unknown, options) {
  console.log(orig, val);
  if (orig && val) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

Handlebars.registerHelper('or', function (orig: unknown, val: unknown, options) {
  console.log(Boolean(orig), val);
  if (orig || val) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});
export const compileHbs = (str: string, testData: string) => {
  try {
    const newStr = str.replaceAll('https://maxclientstatapi.com', 'baseUrl_maxclientstatapi.com');
    const template = Handlebars.compile(newStr);
    const data = JSON.parse(testData);
    return template(data);
  } catch (e) {
    console.log(e);
    return str;
  }
};
