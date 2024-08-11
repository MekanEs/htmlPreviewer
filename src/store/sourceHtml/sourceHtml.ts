import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { initialJson, str } from '../../constants';
import { EditorSelection } from '../../types/types';
import { compileHbs, addDataAttribute } from '../../utils';

interface IHtmlSlice {
  json: string;
  source: string;
  selection: EditorSelection;
  htmlWithDataAttr: string;
  htmlToRender: string;
}

const initialState: IHtmlSlice = {
  json: initialJson,
  source: str,
  selection: { from: 0, to: 0 },
  htmlWithDataAttr: addDataAttribute(str),
  htmlToRender: compileHbs(addDataAttribute(str), initialJson),
};

export const htmlSlice: Slice<IHtmlSlice> = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setJson: (state, action: PayloadAction<string>) => {
      state.json = action.payload;
    },
    setSourceHtml: (state, action: PayloadAction<string>) => {
      state.source = action.payload;
      state.htmlWithDataAttr = addDataAttribute(state.source);
      state.htmlToRender = compileHbs(state.htmlWithDataAttr, state.json);
    },
    setSelection: (state, action: PayloadAction<EditorSelection>) => {
      state.selection = action.payload;
    },
  },
});
export const { actions: htmlActions, reducer: htmlReducer } = htmlSlice;
