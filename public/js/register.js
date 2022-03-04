// 1. uzdedam formai eventa
console.log('register');
const BASE_URL = 'http://localhost:3000';
const formEl = document.forms.register;
const errorsContainerEl = document.querySelector('.errors');

// sustabdyti formos nustatytahi siuntima ir perkrovima
formEl.addEventListener('submit', (event) => {
  event.preventDefault();
  // console.log('js is in control');
  const loginUserData = {
    username: formEl.elements.username.value,
    password: formEl.elements.password.value,
  };
  console.log('loginUser ===', loginUserData);
  // validation
  // TODO:
  registerUser(loginUserData);
});
// 2. surenkam input duomenis
// 3. kuriam registerUser fn
async function registerUser(loginUserData) {
  console.log('loginUserData ===', loginUserData);
  const resp = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginUserData),
  });
  // pasiverciam gauta atsakyma i js objekta ar masyva ar stringa
  const respInJs = await resp.json();
  console.log('respInJs ===', respInJs);
  if (respInJs.success === false) {
    handleErrors(respInJs.errors);
  }
  if (respInJs.success === true) {
    window.location.replace(`index.html?username=${loginUserData.username}`);
  }
}
// 4. jei yra klaidu tai handleErrors
// 5. jei nera klaidu tai redirect i index.html

function handleErrors(erorrArray) {
  errorsContainerEl.innerHTML = '';
  console.log('erorrArray ===', erorrArray);
  erorrArray.forEach((err) => {
    errorsContainerEl.innerHTML += `<p>${err.message}</p>`;
  });
}
