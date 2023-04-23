import Joi from "joi";

export const getOrderById = Joi.object().keys({
    id: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required()
});

export const postOrder = Joi.object().keys({
  count: Joi.number().required(),
  productId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
  userId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required()
});

export const updateOrder = Joi.object().keys({
  id: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
  count: Joi.number(),
  productId: Joi.string().regex(/^[a-fA-F0-9]{24}$/),
  userId: Joi.string().regex(/^[a-fA-F0-9]{24}$/)
});

export const deleteOrder = Joi.object().keys({
    id: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required()
});
