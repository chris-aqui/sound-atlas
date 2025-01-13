import Joi from 'joi';

export const validate = (schema) => (req, res, next) => {
	const options = { abortEarly: false, allowUnknown: true, stripUnknown: true };
	const { error, value } = schema.validate(req.body, options);

	if (error) {
		const message = error.details.map((detail) => detail.message).join(', ');
		return res.status(400).json({ error: message });
	}

	req.body = value; // Sanitize input
	next();
};
