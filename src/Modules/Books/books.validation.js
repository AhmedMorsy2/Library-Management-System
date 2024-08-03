import Joi from "joi";

const booksVal = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  status: Joi.string(),
  ISBN: Joi.number().required(),
});

export { booksVal };
