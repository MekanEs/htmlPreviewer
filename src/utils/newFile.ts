import Handlebars from 'handlebars';

Handlebars.registerHelper('equals', (orig: unknown, val: unknown, options) => {
if(orig!==val && !options.hash.includeZero){
return options.inverse(this);
}else{
return options.fn(this);
}

});
export const compileHbs = (str: string, testData: string) => {
  const template = Handlebars.compile(str);
  const data = JSON.parse(testData);
  return template(data);
};
