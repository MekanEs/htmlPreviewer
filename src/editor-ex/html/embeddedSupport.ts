/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {
  LanguageService,
  TokenType,
  Range,
  Position as HtmlPosition,
  TextDocument,
} from 'vscode-html-languageservice';

import { Position } from '../monaco';

import { LanguageRange, getContentRegions, getDirectiveRegion } from './languageRegion';
import { toLsPosition } from './utils';

export interface HTMLDocumentRegions {
  versionId: number;
  getEmbeddedDocument(languageId: string, ignoreAttributeValues?: boolean): TextDocument;
  getLanguageRanges(range: Range): LanguageRange[];
  getLanguageAtPosition(position: Position): string | undefined;
  getRegionAtPosition(position: Position): EmbeddedRegion | undefined;
  getLanguagesInDocument(): string[];
  getImportedScripts(): string[];
}

export const CSS_STYLE_RULE = '__';

export interface EmbeddedRegion {
  languageId: string | undefined;
  start: number;
  end: number;
  type?: 'tag' | 'attribute' | 'content';
  appendContent?: (value: string) => string;
}

export function getDocumentRegions(
  languageService: LanguageService,
  document: TextDocument
): HTMLDocumentRegions {
  const regions: EmbeddedRegion[] = [];
  const scanner = languageService.createScanner(document.getText());
  let lastTagName = '';
  let lastAttributeName: string | null = null;
  let languageIdFromType: string | undefined = undefined;
  const importedScripts: string[] = [];

  let token = scanner.scan();
  while (token !== TokenType.EOS) {
    switch (token) {
      case TokenType.StartTag:
        lastTagName = scanner.getTokenText();
        lastAttributeName = null;
        languageIdFromType = 'javascript';
        break;
      case TokenType.Styles:
        regions.push({
          languageId: 'css',
          start: scanner.getTokenOffset(),
          end: scanner.getTokenEnd(),
        });
        break;
      case TokenType.Script:
        regions.push({
          languageId: languageIdFromType,
          start: scanner.getTokenOffset(),
          end: scanner.getTokenEnd(),
        });
        break;
      case TokenType.AttributeName:
        lastAttributeName = scanner.getTokenText();
        break;
      case TokenType.AttributeValue:
        if (lastAttributeName === 'src' && lastTagName.toLowerCase() === 'script') {
          let value = scanner.getTokenText();
          if (value.startsWith("'") || value.startsWith('"')) {
            value = value.substr(1, value.length - 1);
          }
          importedScripts.push(value);
        } else if (lastAttributeName === 'type' && lastTagName.toLowerCase() === 'script') {
          if (
            /["'](module|(text|application)\/(java|ecma)script|text\/babel)["']/.test(
              scanner.getTokenText()
            )
          ) {
            languageIdFromType = 'javascript';
          } else if (/["']text\/typescript["']/.test(scanner.getTokenText())) {
            languageIdFromType = 'typescript';
          } else {
            languageIdFromType = undefined;
          }
        } else {
          const attributeLanguageId = getAttributeLanguage(lastAttributeName!);
          if (attributeLanguageId) {
            let start = scanner.getTokenOffset();
            let end = scanner.getTokenEnd();
            const firstChar = document.getText()[start];
            if (firstChar === "'" || firstChar === '"') {
              start++;
              end--;
            }
            regions.push({ languageId: attributeLanguageId, start, end, type: 'attribute' });
          }

          const directiveRegion = getDirectiveRegion(lastAttributeName!, scanner, document);
          if (directiveRegion) regions.push(directiveRegion);
        }
        lastAttributeName = null;
        break;
      case TokenType.Content:
        // eslint-disable-next-line no-case-declarations
        const contentRegions = getContentRegions(scanner, document);
        if (contentRegions) regions.push(...contentRegions);
        break;
    }
    token = scanner.scan();
  }
  return {
    versionId: document.version,
    getLanguageRanges: (range: Range) => getLanguageRanges(document, regions, range),
    getEmbeddedDocument: (languageId: string, ignoreAttributeValues: boolean) =>
      getEmbeddedDocument(document, regions, languageId, ignoreAttributeValues),
    getLanguageAtPosition: (position: Position) =>
      getLanguageAtPosition(document, regions, position),
    getLanguagesInDocument: () => getLanguagesInDocument(document, regions),
    getImportedScripts: () => importedScripts,
    getRegionAtPosition: (position: Position) => getRegionAtPosition(document, regions, position),
  };
}

function getLanguageRanges(
  document: TextDocument,
  regions: EmbeddedRegion[],
  range: Range
): LanguageRange[] {
  const result: LanguageRange[] = [];
  let currentPos = range ? range.start : HtmlPosition.create(0, 0);
  let currentOffset = range ? document.offsetAt(range.start) : 0;
  const endOffset = range ? document.offsetAt(range.end) : document.getText().length;
  for (const region of regions) {
    if (region.end > currentOffset && region.start < endOffset) {
      const start = Math.max(region.start, currentOffset);
      const startPos = document.positionAt(start);
      if (currentOffset < region.start) {
        result.push({
          start: currentPos,
          end: startPos,
          languageId: 'html',
        });
      }
      const end = Math.min(region.end, endOffset);
      const endPos = document.positionAt(end);
      if (end > region.start) {
        result.push({
          start: startPos,
          end: endPos,
          languageId: region.languageId,
          type: region.type,
        });
      }
      currentOffset = end;
      currentPos = endPos;
    }
  }
  if (currentOffset < endOffset) {
    const endPos = range ? range.end : document.positionAt(endOffset);
    result.push({
      start: currentPos,
      end: endPos,
      languageId: 'html',
    });
  }
  return result;
}

function getLanguagesInDocument(_document: TextDocument, regions: EmbeddedRegion[]): string[] {
  const result = [];
  for (const region of regions) {
    if (region.languageId && result.indexOf(region.languageId) === -1) {
      result.push(region.languageId);
      if (result.length === 3) {
        return result;
      }
    }
  }
  result.push('html');
  return result;
}

function getLanguageAtPosition(
  document: TextDocument,
  regions: EmbeddedRegion[],
  position: Position
): string | undefined {
  const offset = document.offsetAt(toLsPosition(position));
  for (const region of regions) {
    if (region.start <= offset) {
      if (offset <= region.end) {
        return region.languageId;
      }
    } else {
      break;
    }
  }
  return 'html';
}

function getRegionAtPosition(
  document: TextDocument,
  regions: EmbeddedRegion[],
  position: Position
): EmbeddedRegion | undefined {
  const offset = document.offsetAt(toLsPosition(position));

  for (const region of regions) {
    if (region.start <= offset) {
      if (offset <= region.end) {
        return region;
      }
    } else {
      break;
    }
  }
  return;
}

function getEmbeddedDocument(
  document: TextDocument,
  contents: EmbeddedRegion[],
  languageId: string,
  ignoreAttributeValues: boolean
): TextDocument {
  let currentPos = 0;
  const oldContent = document.getText();
  let result = '';
  let lastSuffix = '';
  let padding = '';
  let appendContentCount = 0;
  for (const c of contents) {
    if (c.languageId === languageId && (!ignoreAttributeValues || c.type != 'attribute')) {
      if (shouldAppendContent(currentPos, c.start, oldContent)) {
        result += padding;
        padding = '';
      }

      result = substituteWithWhitespace(
        result,
        currentPos,
        c.start,
        oldContent,
        lastSuffix,
        getPrefix(c)
      );

      const value = oldContent.substring(c.start, c.end);
      if (c.appendContent) {
        padding += `;${c.appendContent(value)}`;
        appendContentCount++;
      }
      result += value;
      currentPos = c.end;
      lastSuffix = getSuffix(c);
    }
  }

  if (padding) result += padding;

  result = substituteWithWhitespace(
    result,
    currentPos,
    oldContent.length,
    oldContent,
    lastSuffix,
    ''
  );

  result += Array(appendContentCount).fill('}').join('');
  return TextDocument.create(document.uri, languageId, document.version, result);
}

function getPrefix(c: EmbeddedRegion) {
  if (c.type == 'attribute') {
    switch (c.languageId) {
      case 'css':
        return CSS_STYLE_RULE + '{';
      case 'javascript':
        if (c.appendContent) return '{';
    }
  }
  return '';
}
function getSuffix(c: EmbeddedRegion) {
  if (c.type == 'attribute' || c.type == 'content') {
    switch (c.languageId) {
      case 'css':
        return '}';
      case 'javascript':
        return ';';
    }
  }
  return '';
}

function substituteWithWhitespace(
  result: string,
  start: number,
  end: number,
  oldContent: string,
  before: string,
  after: string
) {
  let accumulatedWS = 0;
  result += before;
  for (let i = start + before.length; i < end; i++) {
    const ch = oldContent[i];
    if (ch === '\n' || ch === '\r') {
      // only write new lines, skip the whitespace
      accumulatedWS = 0;
      result += ch;
    } else {
      accumulatedWS++;
    }
  }
  result = append(result, ' ', accumulatedWS - after.length);
  result += after;
  return result;
}

function append(result: string, str: string, n: number): string {
  while (n > 0) {
    if (n & 1) {
      result += str;
    }
    n >>= 1;
    str += str;
  }
  return result;
}

function getAttributeLanguage(attributeName: string): string | null {
  const match = attributeName.match(/^(style)$|^(on\w+)$/i);
  if (!match) {
    return null;
  }
  return match[1] ? 'css' : 'javascript';
}
function shouldAppendContent(start: number, end: number, oldContent: string) {
  for (let i = start; i < end; i++) {
    const ch = oldContent[i];
    if (ch === '\n') {
      return true;
    }
  }

  return false;
}
