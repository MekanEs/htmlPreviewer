import { Hint } from "htmlhint/types";
import { editor } from "../constants";

export const decorationsMapper = (hintArray: Hint[]): editor.IModelDeltaDecoration[] => {
  return hintArray.map((hint) => {
    const { line, evidence, message, col, rule, type } = hint
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
}