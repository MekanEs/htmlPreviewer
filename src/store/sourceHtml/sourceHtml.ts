import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';

import { editor, initialJson, defaultTemplate } from '../../constants';
import { LS_SOURCEHTML, LS_SOURCEJSON } from '../../constants';
import { EditorSelection } from '../../types/types';
import { compileHbs, addDataAttribute } from '../../utils';

export interface IHtmlSlice {
  json: string;
  source: string;
  selection: EditorSelection;
  htmlWithDataAttr: string;
  htmlToSource: string;
  htmlToRender: string;
  langs: string[];
  images: string[];
  userSearchInput: string[];
  markers: Record<string, Omit<editor.IMarker, 'resource'>[]>;
}
const initialState: IHtmlSlice = {
  json: localStorage.getItem(LS_SOURCEJSON) ?? initialJson,
  source: localStorage.getItem(LS_SOURCEHTML) ?? defaultTemplate,
  selection: { from: 0, to: 0 },
  htmlWithDataAttr: addDataAttribute(localStorage.getItem(LS_SOURCEHTML) ?? defaultTemplate),
  htmlToRender: compileHbs(
    addDataAttribute(localStorage.getItem(LS_SOURCEHTML) ?? defaultTemplate),
    initialJson
  ),
  htmlToSource: compileHbs(localStorage.getItem(LS_SOURCEHTML) ?? defaultTemplate, initialJson),
  langs: [],
  images: [],
  userSearchInput: [],
  markers: {},
};

export const htmlSlice: Slice<IHtmlSlice> = createSlice({
  name: 'html',
  initialState,
  reducers: {
    setJson: (state, action: PayloadAction<string>) => {
      state.json = action.payload;
      state.htmlToRender = compileHbs(state.htmlWithDataAttr, state.json);
      state.htmlToSource = compileHbs(state.source, action.payload);
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
    },
    setImages: (state, action: PayloadAction<string[]>) => {
      state.images = action.payload;
    },
    setUserSearchInput: (state, action: PayloadAction<string>) => {
      state.userSearchInput = [action.payload];
    },
    setMarkers: (state, action: PayloadAction<Omit<editor.IMarker, 'resource'>[]>) => {
      //resource is non-serializable
      state.markers = action.payload.reduce(
        (stateObj, marker) => {
          if (!stateObj[marker.owner]) {
            stateObj[marker.owner] = [{ ...marker }];
          } else {
            stateObj[marker.owner].push(marker);
          }
          return stateObj;
        },
        {} as Record<string, Omit<editor.IMarker, 'resource'>[]>
      );
    },
  },
});
export const { actions: htmlActions, reducer: htmlReducer } = htmlSlice;
