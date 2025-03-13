import { Editor } from '@monaco-editor/react';
import { FC, useEffect, useState } from 'react';
const replaceValues: Record<string, Record<string, string>> = {
  ru: {
    autologin_ru:
      'Данное письмо предназначается только тебе и содержит токен авторизации в твой аккаунт. Пересылать и копировать содержимое запрещено.',
    social_media_ru: `Telegram - ( https://t.me/irwin_casino )
X - ( https://x.com/irwin_casino )
VK - ( https://vk.com/irwin_casino )
Email - ( irwin@support.win )`,
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
  },
  de: {
    autologin_de:
      'Diese E-Mail ist ausschließlich für Sie bestimmt und enthält ein Token, mit dem Sie sich bei Ihrem Konto anmelden können. Es ist strengstens untersagt, diese E-Mail zu kopieren oder weiterzuleiten.',
    social_media_de: `Telegram - ( https://t.me/irwincasino_de )
X - ( https://x.com/irwincasino_de )
Instagram - ( https://www.instagram.com/irwincasino_de/ )
Whatsapp - ( https://whatsapp.com/channel/0029VavaiphD38CJGvk73E2d )
Email - ( help-irwin@support.win )`,
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
  },
};
export const Replacer: FC = () => {
  const [sourceTXT, setSourceTXT] = useState('');
  const [replaced, setReplaced] = useState('');
  useEffect(() => {
    let newTXT = sourceTXT;
    for (const lang in replaceValues) {
      for (const key in replaceValues[lang]) {
        const reg = new RegExp(`{{{\\s*${key}\\s*}}}`);
        newTXT = newTXT.replaceAll(reg, replaceValues[lang][key]);
      }
    }
    setReplaced(newTXT);
  }, [sourceTXT]);
  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex' }}>
      <Editor
        options={{
          wordWrap: 'on',
          minimap: { enabled: true },
        }}
        width={'50%'}
        onChange={str => setSourceTXT(str ?? '')}
        value={sourceTXT}
      />
      <Editor
        options={{
          wordWrap: 'on',
          minimap: { enabled: true },
        }}
        width={'50%'}
        value={replaced}
      />
    </div>
  );
};
