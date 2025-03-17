import { ReportType } from 'htmlhint/types';

import { editor } from '../../constants';
import { reportTypeToMarkerSeverity } from '../../types/typeTransform';
export const customValidationRules: ValidationRule[] = [
  {
    message: 'cryptocurrency with game_currency',
    regex: /game_currency\s*("BTC"|"ETH"|"LTC"|"BCH"|"XRP"|"TRX"|"DOGE"|"USDT")/gi,
  },
  {
    message: 'неверная ссылка отписки для ежедневок',
    regex:
      /\{\{\s*unsubscription_url\s*\}\}(?!&redirect_url=\{\{\s*redirect_url\s*\}\}&autologin_token=\{\{\s*autologin_token\s*\}\})/gi,
  },
  { message: 'пустой alt', regex: /alt=""|alt=''/gi, type: 'warning' as ReportType.error },
  { message: 'пробел рядом с неразрывным', regex: /(\s+&nbsp;)+|&nbsp;[\t\f\cK ]+/gi },
  { message: 'пробел В ссылке', regex: /(%3D|%3F|%26|%23)\s|\s(%3D|%3F|%26|%23)/gi },
  { message: 'пробел после знака }', regex: /"\s*\}\}\s+[A-Za-z0-9А-Яа-я]/gi },
  {
    message: 'пробел перед точкой',
    regex: /[\w\p{P}\p{S}\p{M}\p{N}] {1,4}\./giu,
    replace: { regex: /<style[\s\S]*?>[\s\S]*?<\/style>/gi, textToReplace: '' },
  },
];

interface ValidationRule {
  message: string;
  regex: RegExp;
  type?: keyof typeof reportTypeToMarkerSeverity;
  replace?: {
    regex: string | RegExp;
    textToReplace: string;
  };
}

export const CustomValidation = (model: editor.ITextModel) => {
  const htmlContent = model.getValue();
  const markers: editor.IMarkerData[] = [];

  customValidationRules.forEach(({ message, regex, type, replace }) => {
    let diff = 0;
    let newHtmlContent = htmlContent;
    if (replace) {
      newHtmlContent = newHtmlContent.replace(replace.regex, replace.textToReplace);
      diff = htmlContent.length - newHtmlContent.length;
    }

    let match;
    while ((match = regex.exec(newHtmlContent)) !== null) {
      const fullMatch = match[0];
      const positionStart = model.getPositionAt(match.index + diff);
      const positionEnd = model.getPositionAt(match.index + fullMatch.length + diff);

      markers.push({
        severity: reportTypeToMarkerSeverity[type ?? 'error'],
        message,
        startLineNumber: positionStart.lineNumber,
        startColumn: positionStart.column,
        endLineNumber: positionEnd.lineNumber,
        endColumn: positionEnd.column,
      });
    }
  });

  editor.setModelMarkers(model, 'custom', markers);
};
