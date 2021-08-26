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

const displayTarget = (challenge, UI) => {
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

const setupChallenge = (challenge, UI) => {
  UI.htmlCode.innerHTML = Prism.highlight(challenge.html, Prism.languages.html, 'html');

  UI.inputTextarea.value = '';
  UI.inputCode.innerHTML = '';

  displayTarget(challenge, UI);
};

const displayChallenge = (UI) => {
  UI.header.classList.add('challenge');

  UI.menuDiv.classList.remove('display-flex');
  UI.challengeDiv.classList.add('display-flex');
};

/**
 * @param {Event} event - The submit event from addEventListener
*/
const onFormSubmit = async (UI, event) => {
  // Need to prevent default form submission behaviour
  event.preventDefault();

  let challenge;
  try {
    challenge = await loadChallenge(UI);
  } catch(e) {
    onLoadFail(UI);
    return;
  }

  setupChallenge(challenge, UI);
  displayChallenge(UI);
};

export const initMenu = (UI) => {
  populateMenu(UI);
  UI.challengeForm.addEventListener('submit', onFormSubmit.bind(null, UI));
};
