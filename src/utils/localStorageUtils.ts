export function loadJSONFromLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    if (item === null) {
      return defaultValue;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return JSON.parse(item) as T; // Добавляем as T, но основной упор на try/catch
  } catch (error) {
    console.error(`Error parsing localStorage key "${key}":`, error);
    localStorage.removeItem(key); // Очистить невалидное значение
    return defaultValue;
  }
}
