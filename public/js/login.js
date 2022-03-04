console.log('login');
const BASE_URL = 'http://localhost:3000';
const formEl = document.forms.login;

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
  loginUser(loginUserData);
});
// pasiimti inputu reiksmes i objekta

// 3. siunciam su fetch prisijungimo duomenis i back end /login
async function loginUser(loginUserData) {
  console.log('we are tryin to login with ===', loginUserData);
  // siunciam post request ir pridedam formoje ivestu duomenis
  const resp = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginUserData),
  });
  // pasiverciam gauta atsakyma i js objekta ar masyva ar stringa
  const respInJs = await resp.json();
  console.log('respInJs ===', respInJs);
}
