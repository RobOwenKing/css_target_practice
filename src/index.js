import { initMenu } from './menu.js';
import { initResizeable } from './resize.js';
import { initTabs } from './tabs.js';

const UI = {
  header: document.querySelector('header'),

  menuDiv: document.getElementById('menu'),
  loading: document.getElementById('loading'),
  loadError: document.getElementById('load-error'),
  challengeForm: document.getElementById('challenge-form'),
  challengeSelect: document.getElementById('challenge-select'),

  challengeDiv: document.getElementById('challenge'),
  htmlCode: document.getElementById('html-code'),
  inputTextarea: document.getElementById('input-textarea'),
  inputCode: document.getElementById('input-code'),

  outputTarget: document.getElementById('output-target')
};


const htmlCode = document.getElementById('html-code');
const inputTextarea = document.getElementById('input-textarea');
const inputPre = document.getElementById('input-pre');
const inputCode = document.getElementById('input-code');
const outputUser = document.getElementById('output-user');

const html = '<p>Test!</p>';

/* https://stackoverflow.com/a/61421435 */
const updateOutput = (css, iframe) => {
  const iframeHTML = `
    <!doctype html>
    <html>
      <head>
        <style>${css}</style>
      </head>
      <body>${html}</body>
    </html>`;
  iframe.src = 'data:text/html,' + encodeURIComponent(iframeHTML);
};

inputTextarea.addEventListener('input', (event) => {
  const userCSS = inputTextarea.value;
  inputCode.innerHTML = Prism.highlight(userCSS, Prism.languages.css, 'css');
  updateOutput(userCSS, outputUser);
});

inputTextarea.addEventListener('scroll', (event) => {
  inputPre.scrollTop = inputTextarea.scrollTop;
});

htmlCode.innerHTML = Prism.highlight(html, Prism.languages.html, 'html');

/*
  Populates the <select> with <option>s based on the API
  and adds an Event listener to display chosen challenge
*/
initMenu(UI);
/*
  Adds an Event listener to allow users to adjust
  the relative widths of the input and output
*/
initResizeable();
/*
  Add Event listeners so users can change input/output displays
  eg: switch from seeing html-code to input-code
*/
initTabs();
