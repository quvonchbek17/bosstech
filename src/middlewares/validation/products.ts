import Joi from "joi";

export const getProductById = Joi.object().keys({
    id: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required()
});

export const postProduct = Joi.object().keys({
  name: Joi.string().required(),
  price: Joi.string().required(),
  desc: Joi.string()
});

export const updateProduct = Joi.object().keys({
  id: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
  name: Joi.string(),
  price: Joi.string(),
  desc: Joi.string()
});

export const deleteProduct = Joi.object().keys({
    id: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required()
});
