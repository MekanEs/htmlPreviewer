import { createSelector } from "@reduxjs/toolkit";
import { IHtmlSlice } from "../../store/sourceHtml/sourceHtml";

const selectSelf = (state: IHtmlSlice) => state.htmlToRender
export const memoizedHtmlToRender =createSelector(selectSelf, (state) => state)