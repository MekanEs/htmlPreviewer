import { Listener } from "htmlhint/htmlparser"
import { Rule, Ruleset } from "htmlhint/types"
export const ruleset: Ruleset = {
    'doctype-first': false,
    'tag-pair': true,
    'tag-self-close': true,
    'tagname-lowercase': true,
    'attr-unsafe-chars': false,
    'tagname-specialchars': true,
    'attr-no-duplication': true,
    'attr-lowercase': true,
    'empty-tag-not-self-closed': false,
    'attr-value-double-quotes': true,
    'alt-require': true,
    'src-not-empty': true,
    'title-require-custom': true,
    'inline-style-disabled': false,
    'tr-in-table': true,
    'style-property:value': true,
    'target-attribute-values': true
};
export const trInTable: Rule = {
    id: 'tr-in-table',
    description: '<tr> must be present in <table> tag.',
    init(parser, reporter) {
        const selfClosedTags = parser.makeMap(
            'area,base,basefont,bgsound,br,col,frame,hr,img,input,isindex,link,meta,param,embed,track,command,source,keygen,wbr'
        )
        const stack: string[] = []
        const onTagStart: Listener = (event) => {
            const tagName = event.tagName.toLowerCase()


            // console.log(event.attrs.filter(el=>el.name==='style'));
            if (tagName === 'tr') {
                const stackLastIndex = stack.length - 1
                if (stack[stackLastIndex] !== 'table' && stack[stackLastIndex] !== 'tbody' && stack[stackLastIndex] !== 'thead') {
                    reporter.error(
                        `<tr> must be presented in <table>, <tbody> or <thead> tag, now in [ ${stack[stackLastIndex]} ]`,
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


export const targetAttributesValues: Rule = {
    id: 'target-attribute-values',
    description: 'target attibute values can be _blank|_self|_parent|_top|framename',
    init(parser, reporter) {



        const onTagStart: Listener = (event) => {

            const target = event.attrs.filter(el => el.name === 'target')[0]
            if (target?.value && target.value !== '_blank' && target.value !== '_self' && target.value !== '_parent' && target.value !== '_top' && target.value !== 'framename') {
                reporter.warn(
                    `invalid target value [ ${target.value} ]`,
                    event.line,
                    target.index + event.col + event.tagName.length + 1,
                    this,
                    target.raw
                )
            }
        }

        parser.addListener('tagstart', onTagStart)
    }
}



export const titleRequire: Rule = {
    id: 'title-require-custom',
    description: '<title> must be present in <head> tag.',
    init(parser, reporter) {
        let headBegin = false;
        let hasTitle = false;
        const titleStack: string[] = []
        const onTagStart: Listener = (event) => {
            const tagName = event.tagName.toLowerCase();
            if (tagName === 'head') {
                headBegin = true;
            }
            else if (tagName === 'title' && headBegin) {
                hasTitle = true;
            }

            titleStack.push(tagName)
        };
        const onTagEnd: Listener = (event) => {
            const tagName = event.tagName.toLowerCase();
            if (hasTitle && tagName === 'title') {
                const lastEvent = event.lastEvent;
                console.log(lastEvent)
                if (!lastEvent) return
                if (lastEvent.type === "text" && /[\w]/.test(lastEvent.raw || '') === true || titleStack[titleStack.length - 1] !== 'title') {
                    reporter.error('<title></title> must be empty.', event.line, event.col, this, event.raw);
                }
            }
            else if (tagName === 'head') {
                if (hasTitle === false) {
                    reporter.error('<title> must be present in <head> tag.', event.line, event.col, this, event.raw);
                }
                parser.removeListener('tagstart', onTagStart);
                parser.removeListener('tagend', onTagEnd);
            }
        };
        parser.addListener('tagstart', onTagStart);
        parser.addListener('tagend', onTagEnd);
    },
};

// const styleProperty: Rule = {
//   id: 'style-property:value',
//   description: 'every property should have value',
//   init(parser, reporter) {



//     const onTagStart: Listener = (event) => {

//       const styleString = event.attrs.filter(el => el.name === 'style' && el.value !== '')
//       const reported = styleString[0]?.value?.split(';')?.map(el => {
//         const ind = el.indexOf('https:')
//         if (ind > 0) {
//           el = el.slice(ind, ind + 6)
//         }
//         return el
//       })?.filter(el => el.split(':').length > 2)
//       if (reported?.length > 0) {
//         reported.forEach(el => {
//           reporter.error(
//             `property or value should be presented: [${el}]`,
//             event.line,
//             styleString[0].index + event.col + event.tagName.length + 2,
//             this,
//             event.raw
//           )
//         })
//       }
//     }


//     parser.addListener('tagstart', onTagStart)
//   },
// }