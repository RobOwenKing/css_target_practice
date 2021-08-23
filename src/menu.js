const loading = document.getElementById('loading');
const loadError = document.getElementById('load-error');
const challengeForm = document.getElementById('challenge-form');

const onLoadFail = () => {
  loading.classList.remove('display-content');
  loadError.classList.add('display-content');
};

const populateMenu = async () => {
  try {
    const response = await fetch('http://localhost:3000/challenges/1');

    if (!response.ok) {
      onLoadFail();
    }
  } catch(e) {
    onLoadFail();
  }
};

export const initMenu = () => {
  populateMenu();
};