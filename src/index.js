import { initResizeable } from './resize.js';

/*
  Adds an Event listener to allow users to adjust
  the relative widths of the input and output
*/
initResizeable();

const inputTextarea = document.getElementById('input-textarea');
const inputCode = document.getElementById('input-code');

inputTextarea.addEventListener('input', (event) => {
  const codeToHighlight = inputTextarea.value;
  inputCode.innerHTML = Prism.highlight(codeToHighlight, Prism.languages.css, 'css');
});
