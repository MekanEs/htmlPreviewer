import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';

import { editorMode, frameMode } from '../types.ts';
import { LS_FONTSIZEKEY } from '../../constants/localStorage.ts';

export interface IOptionsSlice {
    editors: {
        mode: editorMode
    }
    fontSize: number,
    frameMode: frameMode,
    miniMap: {
        enabled: boolean
    }
}
const savedFontSize = Number(localStorage.getItem(LS_FONTSIZEKEY));
const initialState: IOptionsSlice = {
    editors: {
        mode: 'html'
    },
    fontSize: savedFontSize || 12,
    miniMap: {
        enabled: true
    },
    frameMode: "stats"
};

export const optionsSlice: Slice<IOptionsSlice> = createSlice({
    name: 'options',
    initialState,
    reducers: {
        setEditorMode: (state, action: PayloadAction<editorMode>) => {
            state.editors.mode = action.payload
        },
        setFontSize: (state, action: PayloadAction<number>) => {
            state.fontSize = action.payload
        },
        setFrameMode: (state, action: PayloadAction<frameMode>) => {
            state.frameMode = action.payload
        },
        setMiniMapEnabled: (state, action: PayloadAction<boolean>) => {
            state.miniMap.enabled = action.payload
        }
    },
});
export const { actions: optionsActions, reducer: optionsReducer } = optionsSlice;
