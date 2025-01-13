export default {
	testEnvironment: 'node',
	coverageThreshold: {
		global: {
			branches: 80,
			functions: 80,
			lines: 80,
			statements: 80,
		},
	},
	setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
	testMatch: ['**/__tests__/**/*.test.js'],
	collectCoverage: true,
	extensionsToTreatAsEsm: ['.js'], // Treat .js files as ES Modules
	transform: {}, // Do not use Babel or other transformations
	testEnvironmentOptions: {
		customExportConditions: ['node', 'node-addons'],
	},
};
