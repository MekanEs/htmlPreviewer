import { HTMLHint } from 'htmlhint';
import { Ruleset } from 'htmlhint/types';
import { editor } from 'monaco-editor';

export const verify = (code: string) => {
  const rulesets: Ruleset = {
    'doctype-first': false,
    'tag-pair': true,
    'tag-self-close': true,
    'tagname-lowercase': true,
    'tagname-specialchars': true,
    'attr-no-duplication': true,
    'attr-lowercase': true,
    'empty-tag-not-self-closed': false,
    'attr-value-double-quotes': true,
    'alt-require': true,
    'src-not-empty': true,
    'title-require': true,
  };
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
        glyphMarginClassName: e.type === 'error' ? 'errorIcon' : 'warningIcon',
        // glyphMarginHoverMessage: { value: e.message + '123', supportHtml: true },
        // linesDecorationsTooltip: e.message.normalize('NFC') + '321',
        inlineClassName: e.type === 'error' ? 'errorBackground' : 'warningBackground',
        className: e.type === 'error' ? 'errorBackground' : 'warningBackground',
        hoverMessage: {
          value: e.message.replace(/</gm, '').replace(/>/gm, ''),
          supportHtml: true,
        },
        zIndex: 1000,
      },
    };
  });
  return newDecorations;
};
