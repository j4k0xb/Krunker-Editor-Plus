// ==UserScript==
// @name        Krunker Editor+
// @version     4.13.0
// @author      Jakob#8686
// @description Custom features for the Krunker Map Editor
// @match       *://*.krunker.io/editor.html*
// @run-at      document-start
// @grant       GM_setValue
// @grant       GM_getValue
// @iconURL     https://i.imgur.com/WdYKPAE.png
// @icon64URL   https://i.imgur.com/ZNkUU6K.png
// @downloadURL https://github.com/j4k0xb/Krunker-Editor-Plus/raw/master/userscript.user.js
// @updateURL   https://github.com/j4k0xb/Krunker-Editor-Plus/raw/master/userscript.meta.js
// ==/UserScript==

const bundleURL = 'https://raw.githubusercontent.com/j4k0xb/Krunker-Editor-Plus/master/bundle.js';

async function patch(elem) {
  observer.disconnect();
  const src = elem.textContent;
  elem.textContent = '';

  /* eslint-disable */
  eval(await loadBundle());
  dispatchEvent(new CustomEvent('editor-plus-init', { detail: src }));
}

async function loadBundle() {
  const lastModified = GM_getValue('lastModified') || 0;
  const now = Date.now();

  if (now - lastModified > 30 * 60e3) {
    try {
      const bundle = await (await fetch(bundleURL, { cache: 'no-store' })).text();
      GM_setValue('bundle', bundle);
      GM_setValue('lastModified', now);
      return bundle;
    } catch (error) { }
  }

  return GM_getValue('bundle');
}

const observer = new MutationObserver(mutations => {
  for (const { addedNodes } of mutations) {
    for (const node of addedNodes) {
      if (node.textContent?.includes('KE=')) return patch(node);
    }
  }
});

observer.observe(document, { childList: true, subtree: true });
document.addEventListener('beforescriptexecute', ({ target }) => {
  if (target.textContent?.includes('KE=')) patch(target)
});
