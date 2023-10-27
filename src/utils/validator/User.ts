import * as Joi from "joi";

export const createUserSchema = Joi.object({
    full_name: Joi.string().required(),
	username: Joi.string().required(),
	email: Joi.string().required(),
	password: Joi.string().required(),
	profile_picture: Joi.string(),
	profile_description: Joi.string(),
});