const URL = 'http://localhost:3000';

const radioContEl = document.getElementById('radio');
const formEl = document.forms.newPost;

// parsisiusti visas kategorijas su fetch
// sugeneruoti jas formoj nurodant value ir name
async function getCategories() {
  const resp = await fetch(`${URL}/categories`);
  const dataInJs = await resp.json();
  console.log('dataInJs ===', dataInJs);
  if (dataInJs.success === true) {
    renderRadios(dataInJs.data, radioContEl);
  }
}

//<label for="cat1">Art</label>
//<input type="radio" name="category_id" value="1" id="cat1" />
function renderRadios(dataArr, dest) {
  dest.innerHTML = '';
  dataArr.forEach((catObj) => {
    const labelEl = document.createElement('label');
    labelEl.textContent = catObj.name;
    labelEl.setAttribute('for', catObj.name);
    const inputEl = document.createElement('input');
    inputEl.name = 'category_id';
    inputEl.id = catObj.name;
    inputEl.type = 'radio';
    inputEl.value = catObj.category_id;
    dest.append(labelEl, inputEl);
  });
}

formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  const { title, body, category_id } = formEl.elements;

  //surinkti inputus is formos
  const newPostObj = {
    title: title.value,
    body: body.value,
    category_id: category_id.value,
  };
  console.log('newPostObj ===', newPostObj);
  createNewPost(newPostObj);
  // siusiuti juos su fettch i naujo posto sukurima
});

async function createNewPost(newPostObj) {
  // fetch /posts metodas POST
  const token = localStorage.getItem('login_token');
  // jei nera token nutraukiam veikla
  if (token === null) throw new Error('token not found');

  const resp = await fetch(`${URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newPostObj),
  });
  const dataInJs = await resp.json();
  console.log('dataInJs ===', dataInJs);
  if (dataInJs.success === true) {
    handleSuccess();
  } else {
    handleError();
  }
}

function handleSuccess() {
  //<h4 class="alert">Sveikiname postas sukurtas</h4>
  const alertEl = document.createElement('h4');
  alertEl.className = 'alert';
  alertEl.textContent = 'Sveikiname postas sukurtas';
  // ideti i dom
  document.body.prepend(alertEl);
  setTimeout(() => {
    alertEl.remove();
  }, 3000);
  // pasalinti formoje ivestus duomenis
  formEl.reset();
}

function handleError() {}

getCategories();
