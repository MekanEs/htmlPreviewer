import React, { FC, useState, useEffect } from 'react'; // Добавляем useEffect

import { editor } from '../../constants';
import { Button } from '../common/Button'; // Предполагаемый путь

import { MultiReplacer } from './MultiReplacer';

const LOCAL_STORAGE_KEY = 'replacerCount';
const DEFAULT_REPLACER_COUNT = 10;
const MIN_REPLACER_COUNT = 1;

export const MultiReplacerContainer: FC<{
  editorRef: React.MutableRefObject<editor.IStandaloneCodeEditor | null>;
}> = ({ editorRef }) => {
  const getInitialCount = () => {
    try {
      const savedCount = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedCount !== null) {
        const parsedCount = parseInt(savedCount, 10);
        if (!isNaN(parsedCount) && parsedCount >= MIN_REPLACER_COUNT) {
          return parsedCount;
        }
      }
    } catch (error) {
      console.error('Error reading from localStorage', error);
    }
    return DEFAULT_REPLACER_COUNT;
  };

  const [replacerCount, setReplacerCount] = useState(getInitialCount);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, String(replacerCount));
    } catch (error) {
      // Обработка ошибок localStorage, если необходимо
      console.error('Error writing to localStorage', error);
    }
  }, [replacerCount]);

  const addReplacer = () => setReplacerCount(prev => prev + 1);

  // Убеждаемся, что не удаляем ниже минимального значения
  const removeReplacer = () => setReplacerCount(prev => Math.max(MIN_REPLACER_COUNT, prev - 1));

  return (
    <div style={{ width: '100%', overflowY: 'scroll' }}>
      {Array.from({ length: replacerCount }, (_, i) => (
        <MultiReplacer key={i + 1} id={i + 1} editorRef={editorRef} />
      ))}
      <div style={{ padding: '10px', display: 'flex', gap: '10px' }}>
        <Button onClick={addReplacer}>Add Replacer</Button>
        {replacerCount > MIN_REPLACER_COUNT && (
          <Button onClick={removeReplacer} variant="secondary">
            Remove Last
          </Button>
        )}
      </div>
    </div>
  );
};
