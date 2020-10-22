import path from 'path';
import express, { Router } from 'express';
import { IS_DEV, WEBPACK_PORT } from '../config';

const router = Router();

if (IS_DEV) {
	const { createProxyMiddleware } = require('http-proxy-middleware');
	router.use(
		'/assets',
		createProxyMiddleware({
			pathRewrite: {
				// '^/assets': '/assets',
			},
			target: `http://localhost:${WEBPACK_PORT}`,
		})
	);
} else {
	const staticsPath = path.join(process.cwd(), 'dist', 'frontend');
	router.use('/assets', express.static(staticsPath));
}
export default router;