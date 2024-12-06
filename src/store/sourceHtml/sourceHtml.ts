import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { initialJson, LS_SOURCEHTML,  str } from '../../constants';
import { EditorSelection } from '../../types/types';
import { compileHbs, addDataAttribute } from '../../utils';

export interface IHtmlSlice {
  json: string;
  source: string;
  selection: EditorSelection;
  htmlWithDataAttr: string;
  htmlToSource:string;
  htmlToRender: string;
  langs: string[];
  images:string[]
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
  htmlToSource:compileHbs(
    localStorage.getItem(LS_SOURCEHTML) || str,
    initialJson,
  ),
  langs: [],
  images:[]
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
      state.htmlToSource = compileHbs(action.payload, state.json);
    },
    setSelection: (state, action: PayloadAction<EditorSelection>) => {
      state.selection = action.payload;
    },
    setLangs: (state, action: PayloadAction<string[]>) => {
      state.langs = action.payload;
    },setImages: (state, action: PayloadAction<string[]>) => {
      state.images = action.payload;
    },
  },
});
export const { actions: htmlActions, reducer: htmlReducer } = htmlSlice;
