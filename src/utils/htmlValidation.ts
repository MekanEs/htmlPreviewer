import { editor } from "../constants"
import {  reportTypeToMarkerSeverity } from "../types/typeTransform";

//  Hint = 1,
//     Info = 2,
//     Warning = 4,
//     Error = 8
export const htmlValidation = (model: editor.ITextModel)=>{
    const htmlContent = model.getValue();
const regex = /game_currency\s*("BTC"|"ETH"|"LTC"|"BCH"|"XRP"|"TRX"|"DOGE"|"USDT")/gi;
 let match;
 const markers = []
 while ((match = regex.exec(htmlContent)) !== null) {
    const fullMatch = match[0]
    const positionStart = model.getPositionAt(match.index)
    const positionEnd = model.getPositionAt(match.index+fullMatch.length)
markers.push({
      severity: reportTypeToMarkerSeverity["error"],
      message: "cryptocurrency with game_currency",
      startLineNumber: positionStart.lineNumber,
      startColumn: positionStart.column,
      endLineNumber: positionEnd.lineNumber,
      endColumn: positionEnd.column,
    })
}
editor.setModelMarkers(model, 'Custom', markers);
console.log(model,markers)
}