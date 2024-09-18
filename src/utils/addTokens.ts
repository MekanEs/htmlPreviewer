// import { Monaco } from '@monaco-editor/react';

// export async function addToken(monaco: Monaco) {
// //   const allLangs = await monaco.languages.getLanguages();

// //   const { language: jsLang } = await allLangs.find(({ id }) => id === 'html').loader();
// //   const { language: bars } = await allLangs.find(({ id }) => id === 'handlebars').loader();

// //   for (const key in bars.tokenizer) {
// //     const value = bars.tokenizer[key];
// //     if (key === 'tokenizer') {
// //       for (const category in value) {
// //         const tokenDefs = value[category];
// //         // eslint-disable-next-line
// //         if (!jsLang.tokenizer.hasOwnProperty(category)) {
// //           jsLang.tokenizer[category] = [];
// //         }
// //         if (Array.isArray(tokenDefs)) {
// //           jsLang.tokenizer[category].unshift.apply(jsLang.tokenizer[category], tokenDefs);
// //         }
// //       }
// //     }
// //   }
// //   //   jsLang.tokenizer.handlebarsInEmbeddedState = bars.tokenizer.handlebarsInEmbeddedState;
// //   //   jsLang.tokenizer.handlebarsInSimpleState = bars.tokenizer.handlebarsInSimpleState;
// //   //   jsLang.tokenizer.handlebarsRoot = bars.tokenizer.handlebarsRoot;
// //   console.log(jsLang, bars);

// monaco.languages.registerCompletionItemProvider('html', {
//     provideCompletionItems: (model, position) => {
//       const suggestions = [
//         {
//             label: 'nwrp',
//             kind: monaco.languages.CompletionItemKind.Keyword,
//             insertText: ` <b style=""`,
//           };

//       ];
//       return { suggestions: suggestions}
//     }
//   })

// }
