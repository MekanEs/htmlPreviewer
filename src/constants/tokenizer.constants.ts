// Monaco editor tokenizer rules for HTML and Handlebars
export const tokenizer = {
  root: [
    [/\{\{!--/, 'comment.block.start.handlebars', '@commentBlock'],
    [/\{\{!/, 'comment.start.handlebars', '@comment'],
    [/\{\{/, { token: '@rematch', switchTo: '@handlebarsInSimpleState.root' }],
    [/<!DOCTYPE/, 'metatag.html', '@doctype'],
    [/<!--/, 'comment.html', '@commentHtml'],
    [/(<)(\w+)(\/>)/, ['delimiter.html', 'tag.html', 'delimiter.html']],
    [/(<)(script)/, ['delimiter.html', { token: 'tag.html', next: '@script' }]],
    [/(<)(style)/, ['delimiter.html', { token: 'tag.html', next: '@style' }]],
    [/(<)([:\w]+)/, ['delimiter.html', { token: 'tag.html', next: '@otherTag' }]],
    [/(<\/)(\w+)/, ['delimiter.html', { token: 'tag.html', next: '@otherTag' }]],
    [/</, 'delimiter.html'],
    [/\{/, 'delimiter.html'],
    [/[^<{]+/, ''],
  ],
  doctype: [
    [/\{\{/, { token: '@rematch', switchTo: '@handlebarsInSimpleState.comment' }],
    [/[^>]+/, 'metatag.content.html'],
    [/>/, 'metatag.html', '@pop'],
  ],
  comment: [
    [/\}\}/, 'comment.end.handlebars', '@pop'],
    [/./, 'comment.content.handlebars'],
  ],
  commentBlock: [
    [/--\}\}/, 'comment.block.end.handlebars', '@pop'],
    [/./, 'comment.content.handlebars'],
  ],
  commentHtml: [
    [/\{\{/, { token: '@rematch', switchTo: '@handlebarsInSimpleState.comment' }],
    [/-->/, 'comment.html', '@pop'],
    [/[^-]+/, 'comment.content.html'],
    [/./, 'comment.content.html'],
  ],
  otherTag: [
    [/\{\{/, { token: '@rematch', switchTo: '@handlebarsInSimpleState.otherTag' }],
    [/\/?>/, 'delimiter.html', '@pop'],
    [/"([^"]*)"/, 'attribute.value'],
    [/'([^']*)'/, 'attribute.value'],
    [/[\w-]+/, 'attribute.name'],
    [/=/, 'delimiter'],
    [/[ \t\r\n]+/, ''],
  ],
  script: [
    [/\{\{/, { token: '@rematch', switchTo: '@handlebarsInSimpleState.script' }],
    [/type/, 'attribute.name', '@scriptAfterType'],
    [/"([^"]*)"/, 'attribute.value'],
    [/'([^']*)'/, 'attribute.value'],
    [/[\w-]+/, 'attribute.name'],
    [/=/, 'delimiter'],
    [
      />/,
      {
        token: 'delimiter.html',
        next: '@scriptEmbedded.text/javascript',
        nextEmbedded: 'text/javascript',
      },
    ],
    [/[ \t\r\n]+/, ''],
    [
      /(<\/)(script\s*)(>)/,
      ['delimiter.html', 'tag.html', { token: 'delimiter.html', next: '@pop' }],
    ],
  ],
  scriptAfterType: [
    [/\{\{/, { token: '@rematch', switchTo: '@handlebarsInSimpleState.scriptAfterType' }],
    [/=/, 'delimiter', '@scriptAfterTypeEquals'],
    [
      />/,
      {
        token: 'delimiter.html',
        next: '@scriptEmbedded.text/javascript',
        nextEmbedded: 'text/javascript',
      },
    ],
    [/[ \t\r\n]+/, ''],
    [/<\/script\s*>/, { token: '@rematch', next: '@pop' }],
  ],
  scriptAfterTypeEquals: [
    [/\{\{/, { token: '@rematch', switchTo: '@handlebarsInSimpleState.scriptAfterTypeEquals' }],
    [/"([^"]*)"/, { token: 'attribute.value', switchTo: '@scriptWithCustomType.$1' }],
    [/'([^']*)'/, { token: 'attribute.value', switchTo: '@scriptWithCustomType.$1' }],
    [
      />/,
      {
        token: 'delimiter.html',
        next: '@scriptEmbedded.text/javascript',
        nextEmbedded: 'text/javascript',
      },
    ],
    [/[ \t\r\n]+/, ''],
    [/<\/script\s*>/, { token: '@rematch', next: '@pop' }],
  ],
  scriptWithCustomType: [
    [/\{\{/, { token: '@rematch', switchTo: '@handlebarsInSimpleState.scriptWithCustomType.$S2' }],
    [/>/, { token: 'delimiter.html', next: '@scriptEmbedded.$S2', nextEmbedded: '$S2' }],
  ],
};
