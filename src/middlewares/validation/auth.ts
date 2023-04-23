import Joi from "joi";

export const login = Joi.object().keys({
  email: Joi.string().required().min(10),
  password: Joi.string().required().min(4)
});
