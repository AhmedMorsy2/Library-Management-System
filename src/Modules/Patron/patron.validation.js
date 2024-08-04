import Joi from "joi";

const addPatronVal = Joi.object({
  name: Joi.string().required(),
  contact_information: Joi.object({
    phone_number: Joi.number().min(9).required(),
    address: Joi.string().required(),
  }),
});
export { addPatronVal };
