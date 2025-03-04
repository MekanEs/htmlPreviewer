import { CSSDataV1 } from 'vscode-css-languageservice';

// Custom CSS properties and descriptions
export const customCssData: CSSDataV1 = {
  version: 1.1,
  properties: [
    {
      name: 'mso-ascii-font-family',
      description: 'Определяет шрифт для ASCII-текста (MS Office)',
    },
    {
      name: 'mso-padding-alt',
      description: 'Задаёт альтернативные отступы (MS Office)',
    },
    {
      name: 'mso-line-height-rule',
      description: 'Правило определения высоты строки (MS Office)',
    },
    {
      name: 'mso-table-lspace',
      description: 'Отступ слева у таблиц (MS Office)',
    },
    {
      name: 'mso-style-priority',
      description: 'Приоритет стиля (MS Office)',
    },
    {
      name: 'mso-table-rspace',
      description: 'Отступ справа у таблиц (MS Office)',
    },
    {
      name: 'vertical-align',
      description: 'Вертикальное выравнивание',
    },
    {
      name: 'align',
      description: 'Устаревшее свойство выравнивания',
    },
    {
      name: 'mso-hide',
      description: 'Устаревшее свойство выравнивания',
    },
    {
      name: 'supported-color-scheme',
      description: 'Устаревшее свойство выравнивания',
    },
  ],
};
