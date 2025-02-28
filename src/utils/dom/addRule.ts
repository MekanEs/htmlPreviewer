
import { HTMLHint } from 'htmlhint';
import { targetAttributesValues, titleRequire, trInTable } from '../../constants';




export const addRule = () => {
  HTMLHint.addRule(targetAttributesValues)
  HTMLHint.addRule(trInTable)
  HTMLHint.addRule(titleRequire)
}


