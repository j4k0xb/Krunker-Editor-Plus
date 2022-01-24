// ==UserScript==
// @name        Krunker Editor+
// @version     4.13.2
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

const bundle = loadBundle();
let script;

document.addEventListener('DOMContentLoaded', async () => {
  eval(await bundle); // eslint-disable-line
  dispatchEvent(
    new CustomEvent('editor-plus-init', { detail: script.textContent })
  );
});

const observer = new MutationObserver(mutations => {
  for (const { addedNodes } of mutations) {
    for (const node of addedNodes) {
      if (
        node.textContent &&
        node.textContent.includes('Krunker.io') &&
        node.nodeType === Node.TEXT_NODE
      ) {
        observer.disconnect();
        script = node.parentElement;
        script.type = 'text/blocked';
      }
    }
  }
});

observer.observe(document, { childList: true, subtree: true });

async function loadBundle() {
  const commitURL =
    'https://api.github.com/repos/j4k0xb/Krunker-Editor-Plus/commits?per_page=1';
  const lastModified = GM_getValue('lastModified') || 0;

  const commit = (
    await (await fetch(commitURL, { cache: 'no-store' })).json()
  )[0].commit;
  const commitDate = Date.parse(commit.committer.date);

  if (commitDate !== lastModified) return updateBundle(commitDate);

  return GM_getValue('bundle');
}

async function updateBundle(date) {
  const bundleURL =
    'https://raw.githubusercontent.com/j4k0xb/Krunker-Editor-Plus/master/bundle.js';
  const bundle = await (await fetch(bundleURL, { cache: 'no-store' })).text();

  GM_setValue('bundle', bundle);
  GM_setValue('lastModified', date);

  return bundle;
}
