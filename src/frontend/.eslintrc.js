module.exports = {
	rules: {
		'import/no-unresolved': 'off',
		'import/extensions': [
			'error',
			'ignorePackages',
			{
				scss: '',
				ts: 'never'
			}
		]
	},
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.scss', '.ts']
			},
			webpack: {
				config: './webpack.config.js'
			}
		}
	},
	overrides: [
		{
			files: ['*.ts'],
			parserOptions: {
				project: './src/frontend/tsconfig.json'
			}
		},
		{
			files: ['*.vue'],
			parser: 'vue-eslint-parser',
			extends: [
				'plugin:vue/base',
				'plugin:vue/vue3-recommended',
				'plugin:vue/vue3-essential',
				'@vue/typescript',
				'prettier',
				'prettier/vue'
			],
			rules: {
				'vue/html-self-closing': 0,
				'vue/no-multiple-template-root': 'off',

				// 'vue/max-attributes-per-line': [
				// 	1,
				// 	{
				// 		singleline: 2,
				// 		multiline: {
				// 			max: 2,
				// 			allowFirstLine: false
				// 		}
				// 	}
				// ],
				'vue/html-indent': [
					'error',
					'tab',
					{
						attribute: 1,
						baseIndent: 1,
						closeBracket: 0,
						alignAttributesVertically: false,
						ignores: []
					}
				],
				'vue/max-attributes-per-line': [
					'error',
					{
						singleline: 2,
						multiline: {
							allowFirstLine: false
						}
					}
				],
				'vue/component-name-in-template-casing': 'off'
			}
		}
	]
};
