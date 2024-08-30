import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { initialJson, str } from '../../constants';
import { EditorSelection } from '../../types/types';
import { compileHbs, addDataAttribute } from '../../utils';

interface IEditorOptionsSlice {
  json: string;
  source: string;
  selection: EditorSelection;
  htmlWithDataAttr: string;
  htmlToRender: string;
}

const initialState: IEditorOptionsSlice = {
  json: initialJson,
  source: str,
  selection: { from: 0, to: 0 },
  htmlWithDataAttr: addDataAttribute(str),
  htmlToRender: compileHbs(addDataAttribute(str), initialJson),
};

export const editorOptionsSlice: Slice<IEditorOptionsSlice> = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setJson: (state, action: PayloadAction<string>) => {
      state.json = action.payload;
      state.htmlToRender = compileHbs(state.htmlWithDataAttr, state.json);
    },
  },
});
export const { actions: htmlActions, reducer: htmlReducer } = editorOptionsSlice;
