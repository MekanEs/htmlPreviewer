import Handlebars from 'handlebars';

import { addDataAttribute } from '../dom/DataAttributeAdder';

export const compileHandlebars = (str: string, testData: string, mode = true) => {
  try {
    let newStr = addDataAttribute(str);
    if (mode) {
      newStr = newStr.replaceAll('https://maxclientstatapi.com', 'baseUrl_maxclientstatapi.com');
    }
    const template = Handlebars.compile(newStr);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = JSON.parse(testData);
    return template(data);
  } catch (e) {
    console.log(e);
    return str;
  }
};
