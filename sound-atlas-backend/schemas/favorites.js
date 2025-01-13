import Joi from 'joi';

export const saveFavoriteSchema = Joi.object({
	userId: Joi.string().required().messages({
		'any.required': 'User ID is required',
	}),
	favoriteAlbum: Joi.object({
		id: Joi.number().required().messages({
			'any.required': 'Album ID is required',
		}),
		title: Joi.string().required(),
		role: Joi.string().required(),
		year: Joi.number().required(),
		resource_url: Joi.string().uri().required(),
		thumb: Joi.string().uri().required(),
	})
		.required()
		.messages({
			'any.required': 'Favorite album details are required',
		}),
});

export const removeFavoriteSchema = Joi.object({
	userId: Joi.string().required().messages({
		'any.required': 'User ID is required',
	}),
});
