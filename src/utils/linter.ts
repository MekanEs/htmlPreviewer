import { HTMLHint } from 'htmlhint';
import { editor,  rulesets } from '../constants';
import type { Hint } from 'htmlhint/types';
import { reportTypeToMarkerSeverity } from '../types/typeTransform';





export const HTMLHintInstance = HTMLHint
export const verify = (code: string, model?: editor.ITextModel | null) => {
  const results = HTMLHintInstance.verify(code, rulesets);


  if (model) {
    const markers: editor.IMarkerData[] = [];
    results.forEach((hint: Hint) => {
      markers.push({
        severity: reportTypeToMarkerSeverity[hint.type], // можно мапить severity в зависимости от diag.severity
        message: hint.message,
        startLineNumber: hint.line,
        startColumn: hint.col,
        endLineNumber: hint.line,
        endColumn: hint.col + hint.evidence.length - 1,
      });
    })
    editor.setModelMarkers(model, 'html', markers);
  }


};


