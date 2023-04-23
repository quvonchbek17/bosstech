import Joi from "joi";

export const getUserById = Joi.object().keys({
    id: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required()
});

export const postUser = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().required().min(10),
  password: Joi.string().required().min(4)
});

export const updateUser = Joi.object().keys({
  name: Joi.string(),
  email: Joi.string().min(10),
  password: Joi.string().min(4)
});

export const deleteUser = Joi.object().keys({
    id: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required()
});
