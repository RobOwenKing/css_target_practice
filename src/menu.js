import { updateOutput } from './editor.js';

const loadChallenges = async () => {
  const response = await fetch('http://localhost:3000/challenges');
  const data = await response.json();

  return data;
};

const onLoadFail = (UI) => {
  UI.loading.classList.remove('display-block');
  UI.challengeForm.classList.remove('display-block');

  UI.loadError.classList.add('display-block');
};

const buildMenu = (data, UI) => {
  data.forEach((challenge) => {
    UI.challengeSelect.insertAdjacentHTML('beforeend', `<option value=${challenge.id}>${challenge.name}</option>`);
  })

  UI.loading.classList.remove('display-block');
  UI.challengeForm.classList.add('display-block');
};

const populateMenu = async (UI) => {
  let data = [];

  try {
    data = await loadChallenges();
  } catch(e) {
    onLoadFail(UI);
    return;
  }

  buildMenu(data, UI);
};

/**
 * Retrieves the challenge selected by the user
 * @see onFormSubmit()
*/
const loadChallenge = async (UI) => {
  const response = await fetch(`http://localhost:3000/challenges/${UI.challengeSelect.value}`);
  const data = await response.json();

  return data;
};

const setupChallenge = (newChallenge, UI, CHALLENGE) => {
  CHALLENGE.html = newChallenge.html;
  CHALLENGE.css = newChallenge.css;

  UI.htmlCode.innerHTML = Prism.highlight(CHALLENGE.html, Prism.languages.html, 'html');

  UI.inputTextarea.value = '';
  UI.inputCode.innerHTML = '';

  updateOutput(UI.outputTarget, CHALLENGE.css, CHALLENGE.html);
  updateOutput(UI.outputUser, ' ', CHALLENGE.html);
};

const displayChallenge = (UI) => {
  UI.header.classList.add('challenge');

  UI.menuDiv.classList.remove('display-flex');
  UI.challengeDiv.classList.add('display-flex');
};

/**
 * @param {Event} event - The submit event from addEventListener
*/
const onFormSubmit = async (UI, CHALLENGE, event) => {
  // Need to prevent default form submission behaviour
  event.preventDefault();

  let newChallenge;
  try {
    newChallenge = await loadChallenge(UI);
  } catch(e) {
    onLoadFail(UI);
    return;
  }

  setupChallenge(newChallenge, UI, CHALLENGE);
  displayChallenge(UI);
};

const resetTabsDisplayed = () => {
  const event = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true
  });

  document.querySelector('[data-tab-target="#challenge-html"]').dispatchEvent(event);
  document.querySelector('[data-tab-target="#output-target"]').dispatchEvent(event);
};

const onH1Click = (UI) => {
  UI.header.classList.remove('challenge');

  UI.menuDiv.classList.add('display-flex');
  UI.challengeDiv.classList.remove('display-flex');

  resetTabsDisplayed();
};

export const initMenu = (UI, CHALLENGE) => {
  populateMenu(UI);
  UI.challengeForm.addEventListener('submit', onFormSubmit.bind(null, UI, CHALLENGE));
  UI.h1.addEventListener('click', onH1Click.bind(null, UI));
};
