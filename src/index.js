import { initResizeable } from './resize.js';

/*
  Adds an Event listener to allow users to adjust
  the relative widths of the input and output
*/
initResizeable();

const inputTextarea = document.getElementById('input-textarea');
const inputPre = document.getElementById('input-pre');
const inputCode = document.getElementById('input-code');
const outputUser = document.getElementById('output-user');

const html = '<p>Test!</p>';

/* https://stackoverflow.com/a/61421435 */
const updateOutputUserDoc = (css) => {
  const iframeHTML = `
    <!doctype html>
    <html>
      <head>
        <style>${css}</style>
      </head>
      <body>${html}</body>
    </html>`;
  outputUser.src = 'data:text/html,' + encodeURIComponent(iframeHTML);
};

inputTextarea.addEventListener('input', (event) => {
  const codeToHighlight = inputTextarea.value;
  inputCode.innerHTML = Prism.highlight(codeToHighlight, Prism.languages.css, 'css');
  updateOutputUserDoc(codeToHighlight);
});

inputTextarea.addEventListener('scroll', (event) => {
  inputPre.scrollTop = inputTextarea.scrollTop;
});

const mapCharsToEscape = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#039;'
};

/* https://stackoverflow.com/a/4835406 */
const escapeHtml = (htmlString) => {
  return htmlString.replace(/[&<>"']/g, function(m) { return mapCharsToEscape[m]; });
};

/* Based on method used in https://www.youtube.com/watch?v=5L6h_MrNvsk by Web Dev Simplified */
const tabs = document.querySelectorAll('[data-tab-target]');
tabs.forEach(tab => {
  tab.addEventListener('click', event => {
    const toHide = document.querySelector(`${tab.dataset.tabType} .display-content`);
    toHide.classList.remove('display-content');

    const toDisplay = document.querySelector(tab.dataset.tabTarget);
    toDisplay.classList.add('display-content');
  })
})
