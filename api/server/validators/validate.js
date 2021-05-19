const Joi = require("joi");

exports.regValidation = Joi.object({
  first_name: Joi.string().min(3).max(15).required(),
  last_name: Joi.string().min(3).max(15).required(),
  email: Joi.string().min(5).max(45).required(),
  password: Joi.string().min(2).max(55).required(),
  role: Joi.string().min(2).max(55)
  
});

exports.loginValidation = Joi.object({
  email: Joi.string().min(5).max(45).required(),
  password: Joi.string().min(2).max(55).required(),
});
