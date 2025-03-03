import * as monaco from 'monaco-editor';
import { editor } from 'monaco-editor';
import { IRange } from 'monaco-editor';

export { monaco, editor };
export type { IRange };

// Add any editor-specific configuration constants here
export const editorDefaults = {
  wordWrap: 'on',
  minimap: { enabled: false, size: 'proportional' },
  fontSize: 14,
  readOnly: false,
};
