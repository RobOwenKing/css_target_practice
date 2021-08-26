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

const loadChallenges = async () => {
  const response = await fetch('http://localhost:3000/challenges');
  const data = await response.json();

  return data;
};

const onLoadFail = () => {
  UI.loading.classList.remove('display-block');
  UI.challengeForm.classList.remove('display-block');

  UI.loadError.classList.add('display-block');
};

const buildMenu = (data) => {
  data.forEach((challenge) => {
    UI.challengeSelect.insertAdjacentHTML('beforeend', `<option value=${challenge.id}>${challenge.name}</option>`);
  })

  UI.loading.classList.remove('display-block');
  UI.challengeForm.classList.add('display-block');
};

const populateMenu = async () => {
  let data = [];

  try {
    data = await loadChallenges();
  } catch(e) {
    onLoadFail();
    return;
  }

  buildMenu(data);
};

/**
 * Retrieves the challenge selected by the user
 * @see onFormSubmit()
*/
const loadChallenge = async () => {
  const response = await fetch(`http://localhost:3000/challenges/${UI.challengeSelect.value}`);
  const data = await response.json();

  return data;
};

const displayTarget = (challenge) => {
  const iframeHTML = `
    <!doctype html>
    <html>
      <head>
        <style>${challenge.css}</style>
      </head>
      <body>${challenge.html}</body>
    </html>`;
  UI.outputTarget.src = 'data:text/html,' + encodeURIComponent(iframeHTML);
};

const setupChallenge = (challenge) => {
  UI.htmlCode.innerHTML = Prism.highlight(challenge.html, Prism.languages.html, 'html');

  UI.inputTextarea.value = '';
  UI.inputCode.innerHTML = '';

  displayTarget(challenge);
};

const displayChallenge = () => {
  UI.header.classList.add('challenge');

  UI.menuDiv.classList.remove('display-flex');
  UI.challengeDiv.classList.add('display-flex');
};

/**
 * @param {Event} event - The submit event from addEventListener
*/
const onFormSubmit = async (event) => {
  // Need to prevent default form submission behaviour
  event.preventDefault();

  let challenge;
  try {
    challenge = await loadChallenge();
  } catch(e) {
    onLoadFail();
    return;
  }

  setupChallenge(challenge);
  displayChallenge();
};

export const initMenu = () => {
  populateMenu();
  UI.challengeForm.addEventListener('submit', onFormSubmit);
};
