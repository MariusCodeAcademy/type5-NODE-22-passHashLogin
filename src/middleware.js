require('dotenv').config();
const Joi = require('joi');
const jwt = require('jsonwebtoken');

async function validatePost(req, res, next) {
  // validation
  const schema = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    body: Joi.string().min(5).required(),
    category_id: Joi.number().min(1).max(10).required(),
  });
  // username min3 max 30 skaiciai ir raides privalomas laukas
  // password min 5 max 30 privalomas
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next(); // patikrinom viskas gerai
  } catch (error) {
    const formatedError = error.details.map((detail) => ({
      field: detail.context.key,
      message: detail.message,
    }));
    const resposnseToSend = {
      success: false,
      errors: formatedError,
    };
    res.status(400).json(resposnseToSend);
  }
}
async function validateUser(req, res, next) {
  // validation
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).alphanum().required(),
    password: Joi.string().min(5).max(30).required(),
  });
  // username min3 max 30 skaiciai ir raides privalomas laukas
  // password min 5 max 30 privalomas
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next(); // patikrinom viskas gerai
  } catch (error) {
    const formatedError = error.details.map((detail) => ({
      field: detail.context.key,
      message: detail.message,
    }));
    const resposnseToSend = {
      success: false,
      errors: formatedError,
    };
    res.status(400).json(resposnseToSend);
  }
}
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

function validateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const tokenGotFromUser = authHeader && authHeader.split(' ')[1];
  // console.log('tokenGotFromUser ===', tokenGotFromUser);
  if (!tokenGotFromUser) return res.status(401).json('no token');
  // patikrinti ar token geras
  // jwt.verify(tokne to check, secret, callback fh);
  jwt.verify(
    tokenGotFromUser,
    process.env.JWT_TOKEN_SECRET,
    (err, tokenPayload) => {
      /// token negaliojantis arba netinkamas
      if (err) return res.status(403).json('token not valid');
      // jei reikia pernesti info apie token (token esancia info)
      // console.log('user ===', user);
      req.username = tokenPayload.username;
      next();
    },
  );
}

module.exports = {
  validateUser,
  printBody,
  validatePost,
  validateToken,
};
