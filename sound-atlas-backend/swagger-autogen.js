import swaggerAutogen from 'swagger-autogen';
const swaggerAutogenInstance = swaggerAutogen();

const doc = {
	info: {
		title: 'Sound Atlas API',
		description: 'API documentation for Sound Atlas',
	},
	host: 'localhost:5000',
	schemes: ['http'],
	components: {
		schemas: {
			Pagination: {
				type: 'object',
				properties: {
					page: { type: 'number' },
					pages: { type: 'number' },
					per_page: { type: 'number' },
					items: { type: 'number' },
					urls: {
						type: 'object',
						properties: {
							last: { type: 'string' },
							next: { type: 'string' },
						},
					},
				},
			},
			MusicItem: {
				type: 'object',
				properties: {
					id: { type: 'number' },
					title: { type: 'string' },
					country: { type: 'string' },
					year: { type: 'string' },
					format: {
						type: 'array',
						items: { type: 'string' },
					},
					genre: {
						type: 'array',
						items: { type: 'string' },
					},
					thumb: { type: 'string' },
					cover_image: { type: 'string' },
					resource_url: { type: 'string' },
				},
			},
			ApiTopArtistResponse: {
				type: 'object',
				properties: {
					pagination: { $ref: '#/components/schemas/Pagination' },
					results: {
						type: 'array',
						items: { $ref: '#/components/schemas/MusicItem' },
					},
				},
			},
			Release: {
				type: 'object',
				properties: {
					id: { type: 'number', example: 32803992 },
					title: { type: 'string', example: 'Bed Chem' },
					role: { type: 'string', example: 'Main' },
					year: { type: 'number', example: 2025 },
					resource_url: { type: 'string', example: 'https://api.discogs.com/releases/32803992' },
					thumb: {
						type: 'string',
						example:
							'https://i.discogs.com/nxKGNiArC7JVxaRzN_yjiZtoAF3_28kXKoka3YhW_CM/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTMyODAz/OTkyLTE3MzY1MTg0/OTUtMzE4Mi5qcGVn.jpeg',
					},
				},
				required: ['id', 'title', 'role', 'year', 'resource_url', 'thumb'],
			},
			Favorite: {
				type: 'object',
				properties: {
					_id: { type: 'string', example: '678552f18bebf7be99c21b3d' },
					userId: { type: 'string', example: 'user_2rVcziV84zTPADpKjCC4eIymeQv' },
					favoriteAlbum: {
						$ref: '#/components/schemas/Release',
						description: 'Details of the favorite album',
					},
					createdAt: { type: 'string', format: 'date-time', example: '2025-01-13T17:52:49.800Z' },
					updatedAt: { type: 'string', format: 'date-time', example: '2025-01-13T17:52:49.800Z' },
					__v: { type: 'number', example: 0 },
				},
				required: ['_id', 'userId', 'favoriteAlbum', 'createdAt', 'updatedAt'],
			},
		},
	},
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/favorites.routes.js', './routes/artist.routes.js'];

swaggerAutogen(outputFile, endpointsFiles);
