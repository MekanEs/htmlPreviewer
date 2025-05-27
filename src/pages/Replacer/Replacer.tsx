import { Editor } from '@monaco-editor/react';
import { FC, useEffect, useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

type JSONOBJ = Record<string, Record<string, string | Record<string, string>>>;
const initialReplaceValues: JSONOBJ = {
  ru: {
    autologin_ru:
      'Данное письмо предназначается только тебе и содержит токен авторизации в твой аккаунт. Пересылать и копировать содержимое запрещено.',
    social_media_ru: `Telegram - ( https://t.me/irwin_casino )
X - ( https://x.com/irwin_casino )
VK - ( https://vk.com/irwin_casino )
Email - ( irwin@support.win )`,
    social_sport_ru: `Telegram - ( https://t.me/irwinsport )
X - ( https://x.com/irwin_casino )
VK - ( https://vk.com/irwin_casino )
Email - ( irwin@support.win )`,
    responsible_gaming_ru:
      'Азартные игры — это форма досуга, а не способ решения проблем. 18+. Играйте ответственно.',
  },
  es: {
    autologin_es:
      'Este mensaje está reservado exclusivamente para ti y contiene un token para iniciar sesión en tu cuenta. Queda terminantemente prohibido copiar o reenviar este mensaje.',
    social_media_es: `Telegram - ( https://t.me/irwincasino_en )
X - ( https://x.com/irwincasino_en )
Facebook - ( https://www.facebook.com/irwincasino.en/ )
Instagram - ( https://www.instagram.com/irwincasino_en/ )
Whatsapp - ( https://whatsapp.com/channel/0029VavHYV13WHTg5W5Ap60d )
Email - ( help-irwin@support.win )`,
    responsible_gaming_es: '',
  },
  pt: {
    autologin_pt:
      'Esta mensagem é exclusiva para você e contém um token para acessar a sua conta. É estritamente proibido copiar ou encaminhar esta mensagem.',
    social_media_pt: `Telegram - ( https://t.me/irwincasino_en )
X - ( https://x.com/irwincasino_en )
Facebook - ( https://www.facebook.com/irwincasino.en/ )
Instagram - ( https://www.instagram.com/irwincasino_en/ )
Whatsapp - ( https://whatsapp.com/channel/0029VavHYV13WHTg5W5Ap60d )
Email - ( help-irwin@support.win )`,
    responsible_gaming_pt: '',
  },
  de: {
    autologin_de:
      'Diese E-Mail ist ausschließlich für Sie bestimmt und enthält ein Token, mit dem Sie sich bei Ihrem Konto anmelden können. Es ist strengstens untersagt, diese E-Mail zu kopieren oder weiterzuleiten.',
    social_media_de: `Telegram - ( https://t.me/irwincasino_de )
X - ( https://x.com/irwincasino_de )
Instagram - ( https://www.instagram.com/irwincasino_de/ )
Whatsapp - ( https://whatsapp.com/channel/0029VavaiphD38CJGvk73E2d )
Email - ( help-irwin@support.win )`,
    responsible_gaming_de:
      'Glücksspiel ist Unterhaltung — keine Lösung. 18+. Spielen Sie verantwortungsbewusst.',
  },
  fr: {
    autologin_fr:
      'Ce courrier vous est exclusivement réservé et contient un jeton permettant de se connecter à votre compte. Il est strictement interdit de copier ou de réexpédier ce courrier.',
    social_media_fr: `Telegram - ( https://t.me/irwincasino_en )
X - ( https://x.com/irwincasino_en )
Facebook - ( https://www.facebook.com/irwincasino.en/ )
Instagram - ( https://www.instagram.com/irwincasino_en/ )
Whatsapp - ( https://whatsapp.com/channel/0029VavHYV13WHTg5W5Ap60d )
Email - ( help-irwin@support.win )`,
    responsible_gaming_fr:
      'Le jeu est un divertissement — pas une solution. 18+. Jouez de façon responsable.',
  },
  pl: {
    autologin_pl:
      'Niniejsza wiadomość jest przeznaczona wyłącznie dla Ciebie i zawiera token do zalogowania się na Twoje konto. Przesyłanie tej wiadomości dalej lub jej kopiowanie jest surowo zabronione.',
    social_media_pl: `Telegram - ( https://t.me/irwincasino_en )
X - ( https://x.com/irwincasino_en )
Facebook - ( https://www.facebook.com/irwincasino.en/ )
Instagram - ( https://www.instagram.com/irwincasino_en/ )
Whatsapp - ( https://whatsapp.com/channel/0029VavHYV13WHTg5W5Ap60d )
Email - ( help-irwin@support.win )`,
    responsible_gaming_pl: 'Hazard to rozrywka — nie rozwiązanie. 18+. Graj odpowiedzialnie.',
  },
  en: {
    autologin_en:
      'This email is reserved exclusively for you and contains a token to log into your account. It is strictly forbidden to copy or resend this email.',
    social_media_en: `Telegram - ( https://t.me/irwincasino_en )
X - ( https://x.com/irwincasino_en )
Facebook - ( https://www.facebook.com/irwincasino.en/ )
Instagram - ( https://www.instagram.com/irwincasino_en/ )
Whatsapp - ( https://whatsapp.com/channel/0029VavHYV13WHTg5W5Ap60d )
Email - ( help-irwin@support.win )`,
    responsible_gaming_en: 'Gambling is entertainment — not a solution. 18+. Play responsibly.',
  },
};
const LOCAL_STORAGE_KEY = 'replacerEditorReplaceValuesJson';
export const Replacer: FC = () => {
  const [sourceTXT, setSourceTXT] = useState<string>('');
  const [replaced, setReplaced] = useState<string>('');
  const [replaceValuesJsonString, setReplaceValuesJsonString] = useState<string>(() => {
    try {
      const storedValue = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedValue) {
        return storedValue;
      }
    } catch (error) {
      console.error("Error reading 'replaceValues' from localStorage:", error);
    }
    return JSON.stringify(initialReplaceValues, null, 2); // Значение по умолчанию
  });

  // Используем initialReplaceValues как начальное безопасное значение.
  // useEffect ниже обновит его, если replaceValuesJsonString (из localStorage или default) валиден.
  const [parsedReplaceValues, setParsedReplaceValues] = useState<JSONOBJ>(
    () => initialReplaceValues
  );
  const [jsonError, setJsonError] = useState<string | null>(null);

  // 3. useEffect для сохранения JSON-строки в localStorage при ее изменении
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, replaceValuesJsonString);
    } catch (error) {
      console.error("Error saving 'replaceValues' to localStorage:", error);
      // Можно добавить уведомление пользователю, если сохранение не удалось (например, закончилось место)
    }
  }, [replaceValuesJsonString]);

  // useEffect для парсинга JSON строки и обновления parsedReplaceValues
  useEffect(() => {
    try {
      const newParsedValues = JSON.parse(replaceValuesJsonString) as JSONOBJ;
      // Простая проверка, что это объект и не null.
      // Для более строгой валидации структуры (Record<string, Record<string, string>>)
      // потребовалась бы более сложная проверка здесь.
      if (typeof newParsedValues === 'object' && newParsedValues !== null) {
        // Дополнительная проверка структуры для большей надежности
        let isValidStructure = true;
        for (const langKey in newParsedValues) {
          if (Object.prototype.hasOwnProperty.call(newParsedValues, langKey)) {
            const langValue = newParsedValues[langKey];
            if (typeof langValue !== 'object' || langValue === null) {
              isValidStructure = false;
              break;
            }
            for (const itemKey in langValue) {
              if (Object.prototype.hasOwnProperty.call(langValue, itemKey)) {
                if (typeof langValue[itemKey] !== 'string') {
                  isValidStructure = false;
                  break;
                }
              }
            }
            if (!isValidStructure) break;
          }
        }

        if (isValidStructure) {
          setParsedReplaceValues(newParsedValues as Record<string, Record<string, string>>);
          setJsonError(null);
        } else {
          setJsonError('Invalid JSON structure: Expected Record<string, Record<string, string>>.');
          // Не обновляем parsedReplaceValues, если структура некорректна, чтобы сохранить последнее валидное состояние
        }
      } else {
        setJsonError('Invalid JSON: root must be an object and not null.');
        // Не обновляем parsedReplaceValues
      }
    } catch (error) {
      if (error instanceof Error) {
        setJsonError(`JSON Parse Error: ${error.message}`);
      } else {
        setJsonError('An unknown error occurred during JSON parsing.');
      }
      // Не обновляем parsedReplaceValues при ошибке парсинга
    }
  }, [replaceValuesJsonString]);

  // useEffect для обновления замененного текста
  useEffect(() => {
    let newTXT = sourceTXT;
    // Применяем замены только если JSON валиден (нет ошибки) и parsedReplaceValues существует
    if (parsedReplaceValues && !jsonError) {
      try {
        for (const lang in parsedReplaceValues) {
          if (
            Object.prototype.hasOwnProperty.call(parsedReplaceValues, lang) &&
            typeof parsedReplaceValues[lang] === 'object' &&
            parsedReplaceValues[lang] !== null
          ) {
            for (const key in parsedReplaceValues[lang]) {
              if (
                Object.prototype.hasOwnProperty.call(parsedReplaceValues[lang], key) &&
                typeof parsedReplaceValues[lang][key] === 'string'
              ) {
                // Убедимся, что значение - строка
                const reg = new RegExp(`{{{\\s*${key}\\s*}}}`, 'g');
                newTXT = newTXT.replaceAll(reg, parsedReplaceValues[lang][key]);
              }
            }
          }
        }
      } catch (e) {
        console.error('Error during replacement process:', e);
        // В случае ошибки во время замены (маловероятно с текущими проверками, но возможно)
        // можно откатиться к исходному тексту или показать сообщение.
        // newTXT = sourceTXT; // или specific error message
      }
    } else if (jsonError) {
      // Если есть ошибка в JSON, не производим замену, чтобы избежать непредсказуемого поведения.
      // Можно оставить newTXT равным sourceTXT или очистить поле результата.
      // newTXT = sourceTXT; // Уже так по умолчанию
    }
    setReplaced(newTXT);
  }, [sourceTXT, parsedReplaceValues, jsonError]); // jsonError добавлен в зависимости

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Контейнер для редакторов */}
      <PanelGroup
        autoSaveId="persistence"
        direction="horizontal"
        style={{
          display: 'flex',
          flexGrow: 1,
          borderTop: '1px solid #eee',
          borderBottom: '1px solid #eee',
        }}
      >
        <Panel
          minSize={20}
          style={{
            width: '33.33%',
            display: 'flex',
            flexDirection: 'column',
            borderRight: '1px solid #ccc',
          }}
        >
          <h4
            style={{
              margin: '5px 0',
              padding: '5px',
              textAlign: 'center',
              background: '#f0f0f0',
              borderBottom: '1px solid #ccc',
            }}
          >
            Replacement Rules (JSON)
          </h4>
          <div
            style={{ flexGrow: 1, overflow: 'hidden' /* Для корректной работы высоты Editor */ }}
          >
            <Editor
              options={{
                wordWrap: 'on',
                minimap: { enabled: true },
              }}
              height="100%"
              language="json"
              value={replaceValuesJsonString}
              onChange={str => setReplaceValuesJsonString(str ?? '')}
            />
          </div>
          {jsonError && (
            <div
              style={{
                color: 'red',
                padding: '8px',
                backgroundColor: '#ffebeb',
                borderTop: '1px solid red',
                fontSize: '0.9em',
                whiteSpace: 'pre-wrap',
                overflowY: 'auto',
                maxHeight: '100px',
              }}
            >
              {jsonError}
            </div>
          )}
        </Panel>
        <PanelResizeHandle>&gt;</PanelResizeHandle>
        <Panel
          minSize={20}
          style={{
            width: '33.33%',
            display: 'flex',
            flexDirection: 'column',
            borderRight: '1px solid #ccc',
          }}
        >
          <h4
            style={{
              margin: '5px 0',
              padding: '5px',
              textAlign: 'center',
              background: '#f0f0f0',
              borderBottom: '1px solid #ccc',
            }}
          >
            Source Text (Шаблоны)
          </h4>
          <Editor
            options={{
              wordWrap: 'on',
              minimap: { enabled: true },
            }}
            height="100%" // Занимает всю доступную высоту родителя
            language="text" // или html, в зависимости от содержимого
            onChange={str => setSourceTXT(str ?? '')}
            value={sourceTXT}
          />
        </Panel>

        <PanelResizeHandle>&gt;</PanelResizeHandle>

        <Panel defaultSize={33} minSize={20} style={{ display: 'flex', flexDirection: 'column' }}>
          <h4
            style={{
              margin: '5px 0',
              padding: '5px',
              textAlign: 'center',
              background: '#f0f0f0',
              borderBottom: '1px solid #ccc',
            }}
          >
            Replaced Text (Результат)
          </h4>
          <Editor
            options={{
              wordWrap: 'on',
              minimap: { enabled: true },
              readOnly: true, // Результат только для чтения
            }}
            height="100%"
            language="text" // или html
            value={replaced}
          />
        </Panel>
      </PanelGroup>
    </div>
  );
};
