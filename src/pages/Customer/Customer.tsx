import { Editor } from '@monaco-editor/react';
import { FC, useEffect, useState } from 'react';

import { getEncodedLink } from '../../utils/templating/decodeBase64';

export const Customer: FC = () => {
  const [currentValue, setCurrentValue] = useState('');
  const [replaced, setReplaced] = useState('');

  useEffect(() => {
    const utmReplaced = currentValue.replaceAll(/(%3F|%26)utm_source[^"]+"/g, '&{{ utm_params }}"');
    const urlEncodeed = utmReplaced
      .replaceAll(/(%3F)/g, '&')
      .replaceAll(/%3D/g, '=')
      .replaceAll(/%26/g, '&');
    const newLinks = urlEncodeed.replaceAll(
      /href="([^"]+&redirect_url=\/)/g,
      'href="https://{{ select_mirror }}?r='
    );
    const paths = newLinks.match(/\?r=[^"&]+&/g);
    let encoded = newLinks;
    for (const path in paths) {
      const encodedPath = getEncodedLink(paths[+path].slice(3, -1));
      encoded = encoded.replace(paths[+path], `?r=${encodedPath}&`);
    }
    setReplaced(encoded);
  }, [currentValue]);
  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', gap: '12px' }}>
      <div style={{ width: '50%', height: '100vh' }}>
        <Editor
          options={{
            wordWrap: 'on',
            minimap: { enabled: true },
          }}
          theme="vs-dark"
          height="100%"
          language="html"
          value={currentValue}
          onChange={str => setCurrentValue(str ?? '')}
        />
      </div>
      <div style={{ width: '50%', height: '100vh' }}>
        <Editor
          options={{
            wordWrap: 'on',
            minimap: { enabled: true },
            readOnly: true, // Результат только для чтения
          }}
          theme="vs-dark"
          language="html"
          height="100%"
          value={replaced}
        />
      </div>
    </div>
  );
};
