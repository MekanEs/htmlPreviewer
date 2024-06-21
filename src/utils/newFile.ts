import Handlebars from 'handlebars';

Handlebars.registerHelper('equals', (orig: unknown, val: unknown, options) => {
  return orig === val ? options.fn(this) : options.inverse(this);
});
export const compileHbs = (str: string, testData: string) => {
  const template = Handlebars.compile(str);
  const data = JSON.parse(testData);
  return template(data);
};
