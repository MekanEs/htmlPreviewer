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
export const compileHbs = (str: string, testData: string) => {
  try{
 const template = Handlebars.compile(str);
  const data = JSON.parse(testData);
 
  return template(data);
  }
  catch(e){
    console.log(e)
    return str
  }
 
};
