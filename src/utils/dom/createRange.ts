import { editor, IRange } from '../../constants';
import { EditorSelection } from '../../types/types';

export const createRange = (selection: EditorSelection, editor: editor.IStandaloneCodeEditor) => {
  const from = editor.getModel()?.getPositionAt(selection.from);
  const to = editor.getModel()?.getPositionAt(selection.to);

  if (!from || !to) return;

  const range: IRange = {
    startLineNumber: from.lineNumber || 1,
    startColumn: from.column,
    endColumn: to.column,
    endLineNumber: to.lineNumber,
  };
  return range;
};

export const createRangeDiff = (
  selection: EditorSelection,
  editor: editor.IStandaloneDiffEditor
) => {
  const from = editor.getModel()?.modified?.getPositionAt(selection.from);
  const to = editor.getModel()?.modified?.getPositionAt(selection.to);

  if (!from || !to) return;

  const range: IRange = {
    startLineNumber: from.lineNumber || 1,
    startColumn: from.column,
    endColumn: to.column,
    endLineNumber: to.lineNumber,
  };
  return range;
};
