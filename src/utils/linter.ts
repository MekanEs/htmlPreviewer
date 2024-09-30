import { HTMLHint } from 'htmlhint';
import { editor } from 'monaco-editor';
import { rulesets } from '../constants';
export const verify = (code: string) => {
  const results = HTMLHint.verify(code, rulesets);
 
  const newDecorations: editor.IModelDeltaDecoration[] = results.map((hint) => {
    const {line, evidence,message,col,rule,type}=hint
    return {
      range: {
        startLineNumber: line,
        startColumn: col,
        endLineNumber: line,
        endColumn: col + evidence.length - 1,
      },
      options: {
        className: type === 'error' ? 'errorBackground' : 'warningBackground',
        hoverMessage: {
          value: `<div>${message
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;')}</div>
            <div><a href=${rule.link}>${rule.link}</a></div>`,
          supportHtml: true,
        },

        zIndex: 1000,
      },
    };
  });
  return newDecorations;
};
