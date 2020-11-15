import path from 'path';
import express, { Router } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { IS_DEV, WEBPACK_PORT } from '../config';

const router = Router();
if (IS_DEV) {
	router.use(
		'/assets',
		createProxyMiddleware({
			secure: false,
			changeOrigin: true,
			pathRewrite: {
				// '^/assets': '/assets',
			},
			target: `http://localhost:${WEBPACK_PORT}`
		})
	);
} else {
	const staticsPath = path.join(process.cwd(), 'dist', 'frontend');
	router.use('/assets', express.static(staticsPath));
}

export default router;
