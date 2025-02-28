// Default HTML template
export const defaultTemplate = `<div>1234</div>
<div>1234</div>`;

// Default JSON data
export const initialJson = `{
   "locales": {
    "ru": true
  },
  "account_currency": "BTC",
  "game_currency": "EUR"
}`;

// Border style for preview mode
export const borderStyle = `* {outline: 1px solid #000;box-shadow: 0 0 2px #fff;}`;

// Image finding configuration
export const findImages = {
  regexp: /src="([^"]+)/g,
  replace: '\\',
}; 