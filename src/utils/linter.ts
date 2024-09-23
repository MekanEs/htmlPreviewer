import { HTMLHint } from 'htmlhint';
import { editor } from 'monaco-editor';
import { rulesets } from '../constants';
export const verify = (code: string) => {
  const results = HTMLHint.verify(code, rulesets);
 
  const newDecorations: editor.IModelDeltaDecoration[] = results.map((e) => {
    return {
      range: {
        startLineNumber: e.line,
        startColumn: e.col,
        endLineNumber: e.line,
        endColumn: e.col + e.evidence.length - 1,
      },
      options: {
        className: e.type === 'error' ? 'errorBackground' : 'warningBackground',
        hoverMessage: {
          value: `<div>${e.message
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;')}</div>
            <div><a href=${e.rule.link}>${e.rule.link}</a></div>`,
          supportHtml: true,
        },

        zIndex: 1000,
      },
    };
  });
  return newDecorations;
};
