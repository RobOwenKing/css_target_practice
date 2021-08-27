import { initInput } from './editor.js';
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
  inputCode: document.getElementById('input-code'),

  outputTarget: document.getElementById('output-target'),
  outputUser: document.getElementById('output-user')
};

const CHALLENGE = {};

initInput(UI, CHALLENGE);
/*
  Populates the <select> with <option>s based on the API
  and adds an Event listener to display chosen challenge
*/
initMenu(UI, CHALLENGE);
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
