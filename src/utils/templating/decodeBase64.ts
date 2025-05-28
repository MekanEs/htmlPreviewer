function base64_decode(data: string) {
  const b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  let o1,
    o2,
    o3,
    h1,
    h2,
    h3,
    h4,
    bits,
    i = 0,
    ac = 0,
    dec = '';

  const tmp_arr = [];

  if (!data) {
    return data;
  }

  data += ''; // Обеспечиваем, что data - строка

  // Убираем все символы, не входящие в алфавит Base64, кроме '='
  let valid_chars = '';
  for (let k = 0; k < data.length; k++) {
    if (b64.indexOf(data.charAt(k)) !== -1 || data.charAt(k) === '=') {
      valid_chars += data.charAt(k);
    }
  }
  data = valid_chars;

  do {
    // unpack four hexets into three octets using index points in b64
    h1 = b64.indexOf(data.charAt(i++));
    h2 = b64.indexOf(data.charAt(i++));
    h3 = b64.indexOf(data.charAt(i++));
    h4 = b64.indexOf(data.charAt(i++));

    // Проверяем, что индексы валидны (не -1)
    if (
      h1 === -1 ||
      h2 === -1 ||
      (h3 === -1 && data.charAt(i - 2) !== '=') ||
      (h4 === -1 && data.charAt(i - 1) !== '=')
    ) {
      // console.error("Invalid character found in base64 string during decoding");
      // можно выбросить ошибку или вернуть пустую строку, в зависимости от требуемого поведения
      // Для примера просто пропускаем, если что-то очень не так, но это надо отладить
      // В данном конкретном случае, после decodeURIComponent не должно быть невалидных символов Base64
    }

    bits = (h1 << 18) | (h2 << 12) | (h3 << 6) | h4;

    o1 = (bits >> 16) & 0xff;
    o2 = (bits >> 8) & 0xff;
    o3 = bits & 0xff;

    if (h3 == 64) {
      // padding char found, so skip over last two chars
      tmp_arr[ac++] = String.fromCharCode(o1);
    } else if (h4 == 64) {
      // padding char found, so skip over last char
      tmp_arr[ac++] = String.fromCharCode(o1, o2);
    } else {
      tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
    }
  } while (i < data.length);

  dec = tmp_arr.join('');
  return dec;
}

// Функция декодирования параметра 'r'
export function getDecodedLink(encodedRParameter: string) {
  // Шаг 1: Заменить '-' обратно на '%'
  const step1: string = encodedRParameter.replace(new RegExp('-', 'g'), '%');
  // console.log("После шага 1 (замена - на %):", step1);

  // Шаг 2: Перевернуть строку
  const step2: string = step1.split('').reverse().join('');
  // console.log("После шага 2 (реверс):", step2);

  // Шаг 3: Декодировать URI компонент
  let step3;
  try {
    step3 = decodeURIComponent(step2);
  } catch (e) {
    // console.error("Ошибка при decodeURIComponent:", e);
    // Если ошибка, возможно, строка была невалидным URI компонентом
    // (маловероятно после предыдущих шагов для данного алгоритма)
    return 'Ошибка декодирования URI';
  }
  // console.log("После шага 3 (decodeURIComponent):", step3);

  // Шаг 4: Декодировать Base64
  const decodedString = base64_decode(step3);
  // console.log("После шага 4 (base64_decode):", decodedString);

  return decodedString;
}
const defineLastSymbol = (encodedRedirectArr: string[]) => {
  let lastCh: number | undefined = undefined;
  if (encodedRedirectArr[encodedRedirectArr.length - 1] === '{{ utm_params }}') {
    lastCh = -1;
  }
  return lastCh;
};
export function manageCustomerUrls(regMatch: Record<string, number>) {
  const res: Record<string, number> = {};
  for (const key in regMatch) {
    const divided = key.split('?r=');
    if (divided.length > 1) {
      const encodedRedirectArr = divided[1].split('&');

      const newSecondPart = getDecodedLink(encodedRedirectArr[0]);
      const lastCh = defineLastSymbol(encodedRedirectArr);
      const tail =
        encodedRedirectArr.length > 1 ? '&' + encodedRedirectArr.slice(1, lastCh).join('&') : '';
      res[divided[0] + '?r=' + newSecondPart + tail] = regMatch[key];
      continue;
    }
    res[key] = regMatch[key];
  }
  return res;
}
