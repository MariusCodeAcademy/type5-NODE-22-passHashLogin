console.log('login');

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
}
