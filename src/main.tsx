import { loader } from '@monaco-editor/react';
import { emmetHTML, registerCustomSnippets } from 'emmet-monaco-es';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { custom_snippets_emmet, monaco } from './constants';
import { MonacoEx } from './editor-ex/index.ts';
import { router } from './router/router.tsx';
import './App.scss';
import { store } from './store/store.ts';
import { addRule, registerHBZ } from './utils';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'json') {
      return new jsonWorker();
    }

    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new htmlWorker();
    }

    return new editorWorker();
  },
};

loader.config({ monaco });
loader.init().then(() => {
  monaco.languages.register({ id: 'html' });
  monaco.languages.register({ id: 'json' });
});

registerCustomSnippets('html', custom_snippets_emmet);
addRule();
registerHBZ();
emmetHTML(monaco, ['html']);
MonacoEx(monaco);
