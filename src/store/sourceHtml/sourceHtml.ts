import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';

import { editor, initialJson, defaultTemplate } from '../../constants';
import { LS_SOURCEHTML, LS_SOURCEJSON } from '../../constants';
import { EditorSelection } from '../../types/types';
import { changeLocaleInJSON, getLocalesFromJSONString } from '../../utils';

export interface IHtmlSlice {
  json: string;
  source: string;
  selection: EditorSelection;
  langs: string[];
  activeLang: string;
  images: string[];
  markers: Record<string, Omit<editor.IMarker, 'resource'>[]>;
}
const initialState: IHtmlSlice = {
  json: localStorage.getItem(LS_SOURCEJSON) ?? initialJson,
  source: localStorage.getItem(LS_SOURCEHTML) ?? defaultTemplate,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  activeLang: getLocalesFromJSONString(localStorage.getItem(LS_SOURCEJSON) ?? initialJson),
  selection: { from: 0, to: 0 },
  langs: [],
  images: [],
  markers: {},
};

export const htmlSlice: Slice<IHtmlSlice> = createSlice({
  name: 'html',
  initialState,
  reducers: {
    setJson: (state, action: PayloadAction<string>) => {
      state.json = action.payload;
    },
    setActiveLang: (state, action: PayloadAction<string>) => {
      state.activeLang = action.payload;
    },
    seNewLangToJSON: state => {
      state.json = changeLocaleInJSON(state.json, state.activeLang);
    },
    setSourceHtml: (state, action: PayloadAction<string>) => {
      state.source = action.payload;
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
