import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Sound Atlas API',
			version: '1.0.0',
			description: 'API documentation for the Sound Atlas app',
			contact: {
				name: 'Developer',
				email: 'developer@example.com',
			},
		},
		servers: [
			{
				url: 'http://localhost:5000',
				description: 'Development server',
			},
		],
	},
	// apis: ['./routes/*.js'],
	apis: ['./sound-atlas-backend/routes/*.js'],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

export const setupSwagger = (app) => {
	app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
