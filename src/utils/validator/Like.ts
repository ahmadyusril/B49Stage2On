import * as Joi from 'joi';

export const likeSchema = Joi.object({
    user: Joi.number(),
    thread: Joi.number(),
});