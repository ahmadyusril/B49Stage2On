import * as Joi from 'joi';

export const createReplySchema = Joi.object({
    content: Joi.string(),
    image: Joi.string(),
})

export const updateReplySchema = Joi.object({
    content: Joi.string(),
    image: Joi.string(),
})