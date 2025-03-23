import { FC } from 'react';

import { editor } from '../../constants';

import { MultiReplacer } from './MultiReplacer';

export const MultiReplacerContainer: FC<{
  editorRef: React.MutableRefObject<editor.IStandaloneCodeEditor | null>;
}> = ({ editorRef }) => {
  return (
    <div>
      <MultiReplacer id={1} editorRef={editorRef} />
      <MultiReplacer id={2} editorRef={editorRef} />
      <MultiReplacer id={3} editorRef={editorRef} />
      <MultiReplacer id={4} editorRef={editorRef} />
      <MultiReplacer id={5} editorRef={editorRef} />
      <MultiReplacer id={6} editorRef={editorRef} />
      <MultiReplacer id={7} editorRef={editorRef} />
      <MultiReplacer id={8} editorRef={editorRef} />
      <MultiReplacer id={9} editorRef={editorRef} />
      <MultiReplacer id={10} editorRef={editorRef} />
      <MultiReplacer id={11} editorRef={editorRef} />
    </div>
  );
};
