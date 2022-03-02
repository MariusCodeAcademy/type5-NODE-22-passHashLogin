const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

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

app.get('/users', (req, res) => {
  res.json(users);
});

// Get /users/:username (grazinti vartotoja kurio username === :username)
app.get('/users/:username', (req, res) => {
  const name = req.params.username;
  const userObjFound = users.find((usrObj) => usrObj.username === name);
  res.json(userObjFound);
});

app.post('/login', (req, res) => {
  // gauti uName ir pass su kuriai bandoma prisiloginti
  const { username, password } = req.body;
  // surasti vartotoja vardu username
  const userObjFound = users.find((usrObj) => usrObj.username === username);
  // jei randam ziurim ar slaptazodziai sutampa// tikrinti slaptazodzius
  if (userObjFound && userObjFound.password === password) {
    res.json('login success');
  } else {
    res.status(400).send('username or password not match');
  }
});

app.post('/register', (req, res) => {
  // gauti uName ir pass su kuriai bandoma PRISIREGISTRUOT
  const { username, password } = req.body;
  const newUser = {
    username,
    password,
  };
  users.push(newUser);
  res.send('register success');
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
