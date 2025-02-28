import { FindPropsObject } from './types/types';
import * as monaco from 'monaco-editor';
import { editor } from 'monaco-editor';
import { IRange } from 'monaco-editor';
import { CSSDataV1 } from 'vscode-css-languageservice';
import { LS_SOURCEJSON } from './constants/localStorage';

export { monaco }
export { editor }
export type { IRange }




export const str = `<div>1234</div>
<div>1234</div>`;
export const initialJson = (): string => {
  let savedJson = JSON.parse(localStorage.getItem(LS_SOURCEJSON) || '')
  if (savedJson.length === 0) {
    savedJson = `{
   "locales": {
    "ru": true
  },
  "account_currency": "BTC",
  "game_currency": "EUR"
}
`;
  }
  return savedJson
}
export const borderStyle = `* {outline: 1px solid #000;box-shadow: 0 0 2px #fff;}`;


export const findImages: FindPropsObject = {
  regexp: /src="([^"]+)/g,
  replace: '\\',
};

export const custom_snippets_emmet: {
  [name: string]: string
} = {
  b_nwrp: 'b[style="white-space: nowrap;"]',
  b_nwrp_white: 'b[style="white-space: nowrap; color: #ffffff;"]',
  span_nwrp: 'span[style="white-space: nowrap;"]',
  span_nwrp_white: 'span[style="white-space: nowrap; color: #ffffff;"]',
  table_email: 'table[width="100%" cellpadding="0" cellspacing="0" border="0"]',
  block1: 'tr>td>table_email',
  block2: 'table_email>tr>td',
  metapack: 'meta[http-equiv="Content-Type" content="text/html; charset=utf-8"]+meta[name="viewport" content="width=device-width, initial-scale=1.0"]+meta[http-equiv="X-UA-Compatible" content="IE=edge"]+meta[content="telephone=no" name="format-detection"]+meta[name="x-apple-disable-message-reformatting"]+meta[name="color-scheme" content="light dark"]+meta[name="supported-color-schemes" content="light dark"]'
}

export const customCssData: CSSDataV1 = {
  "version": 1.1,
  "properties": [
    {
      "name": "mso-ascii-font-family",
      "description": "Определяет шрифт для ASCII-текста (MS Office)"
    },
    {
      "name": "mso-padding-alt",
      "description": "Задаёт альтернативные отступы (MS Office)"
    },
    {
      "name": "mso-line-height-rule",
      "description": "Правило определения высоты строки (MS Office)"
    },
    {
      "name": "mso-table-lspace",
      "description": "Отступ слева у таблиц (MS Office)"
    },
    {
      "name": "mso-style-priority",
      "description": "Приоритет стиля (MS Office)"
    },
    {
      "name": "mso-table-rspace",
      "description": "Отступ справа у таблиц (MS Office)"
    },
    {
      "name": "vertical-align",
      "description": "Вертикальное выравнивание"
    },
    {
      "name": "align",
      "description": "Устаревшее свойство выравнивания"
    }
  ]
}

export const tokenizer = {
  root: [
    [/\{\{!--/, "comment.block.start.handlebars", "@commentBlock"],
    [/\{\{!/, "comment.start.handlebars", "@comment"],
    [/\{\{/, { token: "@rematch", switchTo: "@handlebarsInSimpleState.root" }],
    [/<!DOCTYPE/, "metatag.html", "@doctype"],
    [/<!--/, "comment.html", "@commentHtml"],
    [/(<)(\w+)(\/>)/, ["delimiter.html", "tag.html", "delimiter.html"]],
    [/(<)(script)/, ["delimiter.html", { token: "tag.html", next: "@script" }]],
    [/(<)(style)/, ["delimiter.html", { token: "tag.html", next: "@style" }]],
    [/(<)([:\w]+)/, ["delimiter.html", { token: "tag.html", next: "@otherTag" }]],
    [/(<\/)(\w+)/, ["delimiter.html", { token: "tag.html", next: "@otherTag" }]],
    [/</, "delimiter.html"],
    [/\{/, "delimiter.html"],
    [/[^<{]+/, '']
    // text
  ],
  doctype: [
    [
      /\{\{/,
      {
        token: "@rematch",
        switchTo: "@handlebarsInSimpleState.comment"
      }
    ],
    [/[^>]+/, "metatag.content.html"],
    [/>/, "metatag.html", "@pop"]
  ],
  comment: [
    [/\}\}/, "comment.end.handlebars", "@pop"],
    [/./, "comment.content.handlebars"]
  ],
  commentBlock: [
    [/--\}\}/, "comment.block.end.handlebars", "@pop"],
    [/./, "comment.content.handlebars"]
  ],
  commentHtml: [
    [
      /\{\{/,
      {
        token: "@rematch",
        switchTo: "@handlebarsInSimpleState.comment"
      }
    ],
    [/-->/, "comment.html", "@pop"],
    [/[^-]+/, "comment.content.html"],
    [/./, "comment.content.html"]
  ],
  otherTag: [
    [
      /\{\{/,
      {
        token: "@rematch",
        switchTo: "@handlebarsInSimpleState.otherTag"
      }
    ],
    [/\/?>/, "delimiter.html", "@pop"],
    [/"([^"]*)"/, "attribute.value"],
    [/'([^']*)'/, "attribute.value"],
    [/[\w-]+/, "attribute.name"],
    [/=/, "delimiter"],
    [/[ \t\r\n]+/, '']
    // whitespace
  ],
  // -- BEGIN <script> tags handling
  // After <script
  script: [
    [
      /\{\{/,
      {
        token: "@rematch",
        switchTo: "@handlebarsInSimpleState.script"
      }
    ],
    [/type/, "attribute.name", "@scriptAfterType"],
    [/"([^"]*)"/, "attribute.value"],
    [/'([^']*)'/, "attribute.value"],
    [/[\w-]+/, "attribute.name"],
    [/=/, "delimiter"],
    [
      />/,
      {
        token: "delimiter.html",
        next: "@scriptEmbedded.text/javascript",
        nextEmbedded: "text/javascript"
      }
    ],
    [/[ \t\r\n]+/, ''],
    // whitespace
    [
      /(<\/)(script\s*)(>)/,
      ["delimiter.html", "tag.html", { token: "delimiter.html", next: "@pop" }]
    ]
  ],
  // After <script ... type
  scriptAfterType: [
    [
      /\{\{/,
      {
        token: "@rematch",
        switchTo: "@handlebarsInSimpleState.scriptAfterType"
      }
    ],
    [/=/, "delimiter", "@scriptAfterTypeEquals"],
    [
      />/,
      {
        token: "delimiter.html",
        next: "@scriptEmbedded.text/javascript",
        nextEmbedded: "text/javascript"
      }
    ],
    // cover invalid e.g. <script type>
    [/[ \t\r\n]+/, ''],
    // whitespace
    [/<\/script\s*>/, { token: "@rematch", next: "@pop" }]
  ],
  // After <script ... type =
  scriptAfterTypeEquals: [
    [
      /\{\{/,
      {
        token: "@rematch",
        switchTo: "@handlebarsInSimpleState.scriptAfterTypeEquals"
      }
    ],
    [
      /"([^"]*)"/,
      {
        token: "attribute.value",
        switchTo: "@scriptWithCustomType.$1"
      }
    ],
    [
      /'([^']*)'/,
      {
        token: "attribute.value",
        switchTo: "@scriptWithCustomType.$1"
      }
    ],
    [
      />/,
      {
        token: "delimiter.html",
        next: "@scriptEmbedded.text/javascript",
        nextEmbedded: "text/javascript"
      }
    ],
    // cover invalid e.g. <script type=>
    [/[ \t\r\n]+/, ''],
    // whitespace
    [/<\/script\s*>/, { token: "@rematch", next: "@pop" }]
  ],
  // After <script ... type = $S2
  scriptWithCustomType: [
    [
      /\{\{/,
      {
        token: "@rematch",
        switchTo: "@handlebarsInSimpleState.scriptWithCustomType.$S2"
      }
    ],
    [
      />/,
      {
        token: "delimiter.html",
        next: "@scriptEmbedded.$S2",
        nextEmbedded: "$S2"
      }
    ],
    [/"([^"]*)"/, "attribute.value"],
    [/'([^']*)'/, "attribute.value"],
    [/[\w-]+/, "attribute.name"],
    [/=/, "delimiter"],
    [/[ \t\r\n]+/, ''],
    // whitespace
    [/<\/script\s*>/, { token: "@rematch", next: "@pop" }]
  ],
  scriptEmbedded: [
    [
      /\{\{/,
      {
        token: "@rematch",
        switchTo: "@handlebarsInEmbeddedState.scriptEmbedded.$S2",
        nextEmbedded: "@pop"
      }
    ],
    [/<\/script/, { token: "@rematch", next: "@pop", nextEmbedded: "@pop" }]
  ],
  // -- END <script> tags handling
  // -- BEGIN <style> tags handling
  // After <style
  style: [
    [
      /\{\{/,
      {
        token: "@rematch",
        switchTo: "@handlebarsInSimpleState.style"
      }
    ],
    [/type/, "attribute.name", "@styleAfterType"],
    [/"([^"]*)"/, "attribute.value"],
    [/'([^']*)'/, "attribute.value"],
    [/[\w-]+/, "attribute.name"],
    [/=/, "delimiter"],
    [
      />/,
      {
        token: "delimiter.html",
        next: "@styleEmbedded.text/css",
        nextEmbedded: "text/css"
      }
    ],
    [/[ \t\r\n]+/, ''],
    // whitespace
    [
      /(<\/)(style\s*)(>)/,
      ["delimiter.html", "tag.html", { token: "delimiter.html", next: "@pop" }]
    ]
  ],
  // After <style ... type
  styleAfterType: [
    [
      /\{\{/,
      {
        token: "@rematch",
        switchTo: "@handlebarsInSimpleState.styleAfterType"
      }
    ],
    [/=/, "delimiter", "@styleAfterTypeEquals"],
    [
      />/,
      {
        token: "delimiter.html",
        next: "@styleEmbedded.text/css",
        nextEmbedded: "text/css"
      }
    ],
    // cover invalid e.g. <style type>
    [/[ \t\r\n]+/, ''],
    // whitespace
    [/<\/style\s*>/, { token: "@rematch", next: "@pop" }]
  ],
  // After <style ... type =
  styleAfterTypeEquals: [
    [
      /\{\{/,
      {
        token: "@rematch",
        switchTo: "@handlebarsInSimpleState.styleAfterTypeEquals"
      }
    ],
    [
      /"([^"]*)"/,
      {
        token: "attribute.value",
        switchTo: "@styleWithCustomType.$1"
      }
    ],
    [
      /'([^']*)'/,
      {
        token: "attribute.value",
        switchTo: "@styleWithCustomType.$1"
      }
    ],
    [
      />/,
      {
        token: "delimiter.html",
        next: "@styleEmbedded.text/css",
        nextEmbedded: "text/css"
      }
    ],
    // cover invalid e.g. <style type=>
    [/[ \t\r\n]+/, ''],
    // whitespace
    [/<\/style\s*>/, { token: "@rematch", next: "@pop" }]
  ],
  // After <style ... type = $S2
  styleWithCustomType: [
    [
      /\{\{/,
      {
        token: "@rematch",
        switchTo: "@handlebarsInSimpleState.styleWithCustomType.$S2"
      }
    ],
    [
      />/,
      {
        token: "delimiter.html",
        next: "@styleEmbedded.$S2",
        nextEmbedded: "$S2"
      }
    ],
    [/"([^"]*)"/, "attribute.value"],
    [/'([^']*)'/, "attribute.value"],
    [/[\w-]+/, "attribute.name"],
    [/=/, "delimiter"],
    [/[ \t\r\n]+/, ''],
    // whitespace
    [/<\/style\s*>/, { token: "@rematch", next: "@pop" }]
  ],
  styleEmbedded: [
    [
      /\{\{/,
      {
        token: "@rematch",
        switchTo: "@handlebarsInEmbeddedState.styleEmbedded.$S2",
        nextEmbedded: "@pop"
      }
    ],
    [/<\/style/, { token: "@rematch", next: "@pop", nextEmbedded: "@pop" }]
  ],
  // -- END <style> tags handling
  handlebarsInSimpleState: [
    [/\{\{\{?/, "delimiter.handlebars"],
    [/\}\}\}?/, { token: "delimiter.handlebars", switchTo: "@$S2.$S3" }],
    { include: "handlebarsRoot" }
  ],
  handlebarsInEmbeddedState: [
    [/\{\{\{?/, "delimiter.handlebars"],
    [
      /\}\}\}?/,
      {
        token: "delimiter.handlebars",
        switchTo: "@$S2.$S3",
        nextEmbedded: "$S3"
      }
    ],
    { include: "handlebarsRoot" }
  ],
  handlebarsRoot: [
    [/"[^"]*"/, "string.handlebars"],
    [/[#/][^\s}]+/, "keyword.helper.handlebars"],
    [/else\b/, "keyword.helper.handlebars"],
    [/[\s]+/, ''],
    [/[^}]/, "variable.parameter.handlebars"]
  ]
}