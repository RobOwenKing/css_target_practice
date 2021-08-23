const loading = document.getElementById('loading');
const loadError = document.getElementById('load-error');
const challengeForm = document.getElementById('challenge-form');
const challengeSelect = document.getElementById('challenge-select');

const loadChallenges = async () => {
  const response = await fetch('http://localhost:3000/challenges');
  const data = await response.json();

  return data;
};

const onLoadFail = () => {
  loading.classList.remove('display-content');
  loadError.classList.add('display-content');
};

const buildMenu = (data) => {
  data.forEach((challenge) => {
    challengeSelect.insertAdjacentHTML('beforeend', `<option value=${challenge.id}>${challenge.name}</option>`);
  })

  loading.classList.remove('display-content');
  challengeForm.classList.add('display-content');
};

const populateMenu = async () => {
  let data = [];

  try {
    data = await loadChallenges();
  } catch(e) {
    onLoadFail();
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
  }

  console.log(challenge);
};

export const initMenu = () => {
  populateMenu();
  challengeForm.addEventListener('submit', onFormSubmit);
};
