const populateMenu = async () => {
  const data = await fetch('http://localhost:3000/challenges/1')
      .then(response => response.json());

  console.log(data);
};

export const initMenu = () => {
  populateMenu();
};
