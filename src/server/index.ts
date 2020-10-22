import express, { NextFunction, Response } from 'express';
import asetsManifest from './libs/assetsManifest';
import { APP_SERVER_PORT } from './config';
import router from './router';
const app = express();
app.set('view engine', 'pug');
app.set('view options', { doctype: 'html' });

app.use((_, response: Response, next: NextFunction) => {
	response.locals.assetsManifest = asetsManifest();
	next();
});

app.use(router);
app.get('/**', (_, res: Response) => {
	res.render('pages/index', {
		title: 'TakNePoidet',
	});
});
app.listen(APP_SERVER_PORT, () => {
	console.log(`http://localhost:${APP_SERVER_PORT}`);
});
