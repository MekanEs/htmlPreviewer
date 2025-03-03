import { HTMLHint } from 'htmlhint';
import type { Hint } from 'htmlhint/types';
import { editor } from 'monaco-editor';

import { ruleset } from '../../constants';
import { reportTypeToMarkerSeverity } from '../../types/typeTransform';

export const verify = (model: editor.ITextModel) => {
  const results = HTMLHint.verify(model.getValue(), ruleset);

  if (model) {
    const markers: editor.IMarkerData[] = [];
    results.forEach((hint: Hint) => {
      markers.push({
        severity: reportTypeToMarkerSeverity[hint.type], // можно мапить severity в зависимости от diag.severity
        message: hint.message,
        startLineNumber: hint.line,
        startColumn: hint.col,
        endLineNumber: hint.line,
        endColumn: hint.col + +hint.raw.length,
      });
    });
    editor.setModelMarkers(model, 'html', markers);
  }
};
