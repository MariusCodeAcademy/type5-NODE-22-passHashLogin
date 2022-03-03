const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const { validateUser } = require('./middleware');
const { addUserDb, findUserByUsername } = require('./model/userModel');

const PORT = process.env.SERVER_PORT || 3000;

const app = express();

const users = [
  {
    id: 1,
    username: 'Mike',
    password: 'secret',
  },
  {
    id: 2,
    username: 'James',
    password: 'jam',
  },
];

// middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(printBody);

// musu pirma middleWare funkcija
function printBody(req, res, next) {
  // ['POST', 'PUT', 'PATCH'];
  // if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
  if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
    console.log('Request body we got:', req.body);
  }

  // next - viskas gerai perduodam koda vykdyti toliau
  next();
}
// sayHi - middleware tik siam routui
app.get('/users', (req, res) => {
  res.json(users);
});

// Get /users/:username (grazinti vartotoja kurio username === :username)
app.get('/users/:username', (req, res) => {
  const name = req.params.username;
  const userObjFound = users.find((usrObj) => usrObj.username === name);
  res.json(userObjFound);
});

app.post('/login', validateUser, async (req, res) => {
  // gauti uName ir pass su kuriai bandoma prisiloginti
  const { username, password } = req.body;

  // surasti vartotoja vardu username
  const usersArray = await findUserByUsername(username);
  const userObjFound = usersArray[0];
  // jei randam ziurim ar slaptazodziai sutampa// tikrinti slaptazodzius
  // verify password
  // if (bcrypt.compareSync(password, userObjFound.password)) {
  //   console.log('sutampa');
  // }
  console.log('userObjFound ===', userObjFound);
  //                                     "jill456", '' uzkuotuoda pass reiksme'
  if (userObjFound && bcrypt.compareSync(password, userObjFound.password)) {
    res.json('login success');
  } else {
    res.status(400).send('username or password not match');
  }
});

app.post('/register', validateUser, async (req, res) => {
  // gauti uName ir pass su kuriai bandoma PRISIREGISTRUOT
  const { username, password } = req.body;
  const passHash = bcrypt.hashSync(password, 10);
  // console.log('passHash ===', passHash);
  const newUser = {
    username,
    password: passHash,
  };
  const addResult = await addUserDb(newUser);
  if (addResult === false) {
    res.status(500);
    return;
  }
  res.json(addResult);
});

const schema = Joi.object({
  email: Joi.string().email().required(),
  town: Joi.string().pattern(new RegExp('[a-zA-Z]$')).required(),
  age: Joi.number().min(18).max(200).required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
});

app.post('/validate', async (req, res) => {
  const newUser = req.body;
  // validate input
  // abortEarly - jei lygu true tai radusi pirma klaida toliau nebetikrina
  try {
    await schema.validateAsync(newUser, { abortEarly: false });
  } catch (error) {
    console.log('klaida validuojant');
    console.log('error ===', error);

    res.status(400).json({
      error: 'Please check inputs',
      errors: error.details.map((dtl) => dtl.message),
    });
    return;
  }

  // const newUser = {
  //   email: 'james@james', // valid email, required
  //   town: 'Kaunas', // min 4,  max 30 , tik raides, required
  //   age: 25, // min 18 max 200, number, required
  //   gender: 'male', // galimi tik 2 varijantai 'male', 'female'
  // };
  // console.log(JSON.stringify(newUser));
  res.json(newUser);
});
// POST /validate (atsiusti situo adresu objekta)

// atsakyti su gautu objektu

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
