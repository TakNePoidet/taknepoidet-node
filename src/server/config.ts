import * as dotenv from 'dotenv';
import * as findUp from 'find-up';

export const IS_DEV = process.env.NODE_ENV !== 'production';
dotenv.config({ path: findUp.sync('.env') });

if (!IS_DEV) {
	const { parsed: envConfig } = dotenv.config({
		path: findUp.sync('.env.prod')
	});
	Object.keys(envConfig).forEach((key) => {
		if (envConfig && envConfig.hasOwnProperty(key)) {
			process.env[key] = envConfig[key];
		}
	});
}
export const APP_SERVER_PORT = process.env.APP_SERVER_PORT || 3000;
export const WEBPACK_PORT = 8085;
