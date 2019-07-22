// Disallow webpage index,follow if in development
document.URL.includes('test.speedupamercica.com') ?
  document.head.append('<meta name="robots" content="noindex,nofollow" />')
  : null;
