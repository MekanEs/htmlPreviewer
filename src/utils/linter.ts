import { HTMLHint } from 'htmlhint';
import { editor } from 'monaco-editor';
import { rulesets } from '../constants';
import { Rule } from 'htmlhint/types';
import { Listener } from 'htmlhint/htmlparser';

const HTMLHintInstance = HTMLHint
export const verify = (code: string) => {
  const results = HTMLHintInstance.verify(code, rulesets);
  

  const newDecorations: editor.IModelDeltaDecoration[] = results.map((hint) => {
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
  return newDecorations;
};


export const rule: Rule = {
  id: 'tr-in-table',
  description: '<tr> must be present in <table> tag.',
  init(parser, reporter) {
    const selfClosedTags = parser.makeMap(
      'area,base,basefont,bgsound,br,col,frame,hr,img,input,isindex,link,meta,param,embed,track,command,source,keygen,wbr'
    )
    const stack: string[] = []
    const onTagStart: Listener = (event) => {
      const tagName = event.tagName.toLowerCase()


      if (tagName === 'tr') {
        const stackLastIndex = stack.length - 1
        if (stack[stackLastIndex] !== 'table' && stack[stackLastIndex] !== 'tbody') {
          reporter.error(
            '<tr> must be presented in <table> or <tbody> tag',
            event.line,
            event.col,
            this,
            event.raw
          )
        }
      }
      if (!selfClosedTags[tagName]) {
        stack.push(tagName)
      }
    }
    const onTagEnd: Listener = (event) => {
      const tagName = event.tagName.toLowerCase()
      const stackLastIndex = stack.length - 1
      if (tagName === stack[stackLastIndex]) {
        stack.pop()
      }
    }
   
    parser.addListener('tagstart', onTagStart)
    parser.addListener('tagend', onTagEnd)
  },
}

export const addRule = () => {
  HTMLHint.addRule(rule)
  console.log('addingRules', HTMLHintInstance.defaultRuleset)

}