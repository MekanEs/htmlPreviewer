import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { initialJson, LS_SOURCEHTML, str } from '../../constants';
import { EditorSelection } from '../../types/types';
import { compileHbs, addDataAttribute } from '../../utils';

interface IHtmlSlice {
  json: string;
  source: string;
  selection: EditorSelection;
  htmlWithDataAttr: string;
  htmlToRender: string;
  langs: string[];
}

const initialState: IHtmlSlice = {
  json: initialJson,
  source: localStorage.getItem(LS_SOURCEHTML) || str,
  selection: { from: 0, to: 0 },
  htmlWithDataAttr: addDataAttribute(localStorage.getItem(LS_SOURCEHTML) || str),
  htmlToRender: compileHbs(
    addDataAttribute(localStorage.getItem(LS_SOURCEHTML) || str),
    initialJson,
  ),
  langs: [],
};

export const htmlSlice: Slice<IHtmlSlice> = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setJson: (state, action: PayloadAction<string>) => {
      state.json = action.payload;
      state.htmlToRender = compileHbs(state.htmlWithDataAttr, state.json);
    },
    setSourceHtml: (state, action: PayloadAction<string>) => {
      state.source = action.payload;
    },
    setCompiledHTMl: (state, action: PayloadAction<string>) => {
      state.htmlWithDataAttr = addDataAttribute(action.payload);
      state.htmlToRender = compileHbs(state.htmlWithDataAttr, state.json);
    },
    setSelection: (state, action: PayloadAction<EditorSelection>) => {
      state.selection = action.payload;
    },
    setLangs: (state, action: PayloadAction<string[]>) => {
      state.langs = action.payload;
    },
  },
});
export const { actions: htmlActions, reducer: htmlReducer } = htmlSlice;
