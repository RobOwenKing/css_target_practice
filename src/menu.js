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
  console.log(data);
};

export const initMenu = () => {
  populateMenu();
};
