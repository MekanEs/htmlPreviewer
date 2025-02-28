// Custom Emmet snippets for email templates
export const custom_snippets_emmet: {
  [name: string]: string
} = {
  b_nwrp: 'b[style="white-space: nowrap;"]',
  b_nwrp_white: 'b[style="white-space: nowrap; color: #ffffff;"]',
  span_nwrp: 'span[style="white-space: nowrap;"]',
  span_nwrp_white: 'span[style="white-space: nowrap; color: #ffffff;"]',
  table_email: 'table[width="100%" cellpadding="0" cellspacing="0" border="0"]',
  block1: 'tr>td>table_email',
  block2: 'table_email>tr>td',
  metapack: 'meta[http-equiv="Content-Type" content="text/html; charset=utf-8"]+meta[name="viewport" content="width=device-width, initial-scale=1.0"]+meta[http-equiv="X-UA-Compatible" content="IE=edge"]+meta[content="telephone=no" name="format-detection"]+meta[name="x-apple-disable-message-reformatting"]+meta[name="color-scheme" content="light dark"]+meta[name="supported-color-schemes" content="light dark"]'
}; 