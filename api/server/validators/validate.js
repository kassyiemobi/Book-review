const Joi = require("joi");

exports.regValidation = Joi.object({
  firstName: Joi.string().min(3).max(15).required(),
  lastName: Joi.string().min(3).max(15).required(),
  email: Joi.string().min(5).max(45).required(),
  password: Joi.string().min(2).max(55).required(),
});

exports.loginValidation = Joi.object({
  email: Joi.string().min(5).max(45).required(),
  password: Joi.string().min(2).max(55).required(),
});
