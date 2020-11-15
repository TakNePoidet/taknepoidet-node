import { Router } from 'express';
import staticRouter from './static';

export function useStaticRouter(): Router {
	return Router().use('/', staticRouter);
}

export default {};
