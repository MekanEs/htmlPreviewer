import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router.tsx';
import './App.css';
import { emmetHTML, registerCustomSnippets } from 'emmet-monaco-es'

import { loader } from '@monaco-editor/react';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { addRule } from './utils';
import { custom_snippets_emmet, monaco } from './constants.ts';
import { registerHBZ } from './utils/registerHandlebars.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
registerHBZ()
emmetHTML(
  monaco,
  ['html'],
)


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
loader.init().then(/* ... */);



registerCustomSnippets('html', custom_snippets_emmet)
addRule()
// await supabase.auth.signUp({
//   email: "mekan.es1997@gmail.com",
//   password: "password123",
// })