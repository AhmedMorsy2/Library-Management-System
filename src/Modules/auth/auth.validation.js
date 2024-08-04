import Joi from "joi";

const signupVal = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(16).required(),
});

const signinVal = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(16).required(),
});
export { signupVal, signinVal };
