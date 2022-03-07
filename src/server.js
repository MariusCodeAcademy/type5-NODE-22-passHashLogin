const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const { validateUser, printBody } = require('./middleware');
const { addUserDb, findUserByUsername } = require('./model/userModel');
const postsRoutes = require('./routes/postsRoutes');
const catRoutes = require('./routes/catRoutes');

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
    res.json({
      success: true,
      msg: 'login success',
    });
  } else {
    res.status(400).json({
      success: false,
      errors: [
        {
          message: 'password or username do not match',
        },
      ],
    });
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
    const respond = {
      success: false,
      errors: [
        {
          message: 'Something went wrong, try again later',
        },
      ],
    };
    res.status(500).json(respond);
    return;
  }
  // pakeisti kad butu atsakymas vartotojui su success
  res.json({
    success: true,
  });
});

app.use('/posts/', postsRoutes);
app.use('/categories/', catRoutes);

app.all('*', (req, res) => {
  res.status(404).json('Page not found, please try homepage');
});
// POST /validate (atsiusti situo adresu objekta)

// atsakyti su gautu objektu

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
