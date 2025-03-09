// Validation
export { CustomValidation } from './validation/customValidation';
export { validateCSSInStyleAttributes } from './validation/cssValidation';
export { verify } from './validation/linter';

// Hooks
export { useDebounce } from './hooks/useDebounce';
export { useRegMatcher } from './hooks/regMatcher';

// DOM Manipulation
export { addDataAttribute } from './dom/DataAttributeAdder';
export { addRule } from './dom/addRule';
export { createRange } from './dom/createRange';
export { FindInText } from './dom/findInText';
// Frame Controls
export { toggleFrameBorder } from './frame/toggleFrameBorder';
export { loadHandler } from './frame/loadHandler';
export { toggleImages } from './frame/toggleFrameBorder';

// Templating
export { registerHBZ } from './templating/registerHandlebars';
export { compileHbs } from './templating/newFile';
export { compileHandlebars } from './templating/compileHandlebars';
export { getLocalesFromJSONString, changeLocaleInJSON } from './templating/getLocaleFromJSON';

// Editor Settings
export { HTMLOptionsSetter } from './editor/htmlOptionsSetter';
export { themeSwitcher } from './editor/themeLoader';
