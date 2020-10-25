module.exports = {
	overrides: [
		{
			files: ['*.ts'],
			parserOptions: {
				project: './src/server/tsconfig.json'
			}
		}
	]
};
