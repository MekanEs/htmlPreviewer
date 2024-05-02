import { editor, IRange } from 'monaco-editor';
export const createRange = (
  selection: {
    from: number;
    to: number;
  },
  editor: editor.IStandaloneCodeEditor,
) => {
  const from = editor.getModel()?.getPositionAt(selection.from);
  const to = editor.getModel()?.getPositionAt(selection.to);

  if (from && to) {
    const range: IRange = {
      startLineNumber: from.lineNumber || 1,
      startColumn: from.column,
      endColumn: to.column,
      endLineNumber: to.lineNumber,
    };
    return range;
  }
};
