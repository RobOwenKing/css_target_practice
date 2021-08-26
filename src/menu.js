const header = document.querySelector('header');

const menuDiv = document.getElementById('menu');
const loading = document.getElementById('loading');
const loadError = document.getElementById('load-error');
const challengeForm = document.getElementById('challenge-form');
const challengeSelect = document.getElementById('challenge-select');

const challengeDiv = document.getElementById('challenge');
const htmlCode = document.getElementById('html-code');
const inputTextarea = document.getElementById('input-textarea');
const inputCode = document.getElementById('input-code');

const outputTarget = document.getElementById('output-target');

const loadChallenges = async () => {
  const response = await fetch('http://localhost:3000/challenges');
  const data = await response.json();

  return data;
};

const onLoadFail = () => {
  loading.classList.remove('display-block');
  challengeForm.classList.remove('display-block');

  loadError.classList.add('display-block');
};

const buildMenu = (data) => {
  data.forEach((challenge) => {
    challengeSelect.insertAdjacentHTML('beforeend', `<option value=${challenge.id}>${challenge.name}</option>`);
  })

  loading.classList.remove('display-block');
  challengeForm.classList.add('display-block');
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
  const response = await fetch(`http://localhost:3000/challenges/${challengeSelect.value}`);
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
  outputTarget.src = 'data:text/html,' + encodeURIComponent(iframeHTML);
};

const setupChallenge = (challenge) => {
  htmlCode.innerHTML = Prism.highlight(challenge.html, Prism.languages.html, 'html');

  inputTextarea.value = '';
  inputCode.innerHTML = '';

  displayTarget(challenge);
};

const displayChallenge = () => {
  header.classList.add('challenge');

  menuDiv.classList.remove('display-flex');
  challengeDiv.classList.add('display-flex');
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
  challengeForm.addEventListener('submit', onFormSubmit);
};
