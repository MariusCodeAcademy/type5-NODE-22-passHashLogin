const Joi = require('joi');

async function validateUser(req, res, next) {
  // validation
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).alphanum()
      .required(),
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

module.exports = {
  validateUser,
};
