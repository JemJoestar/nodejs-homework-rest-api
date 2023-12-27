const Joi = require("joi");

exports.createSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  password: Joi.string().min(8).max(32).required(),
  email: Joi.string().email().required(),
});

exports.loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(32).required()
})

exports.updateSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  password: Joi.string().min(8).max(32),
  email: Joi.string().email(),
}).min(1);
