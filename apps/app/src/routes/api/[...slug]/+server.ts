import { Elysia } from 'elysia';
import form from './form';
import type { RequestHandler } from './$types';
import { AuthService } from './authMiddleware';

const app = new Elysia({ prefix: '/api' }).use(AuthService).use(form);

export const GET: RequestHandler = ({ request, locals }) =>
	app.state('session', locals.session).handle(request);
export const POST: RequestHandler = ({ request, locals }) =>
	app.state('session', locals.session).handle(request);
export const DELETE: RequestHandler = ({ request, locals }) =>
	app.state('session', locals.session).handle(request);
export const PATCH: RequestHandler = ({ request, locals }) =>
	app.state('session', locals.session).handle(request);
export const OPTIONS: RequestHandler = ({ request, locals }) =>
	app.state('session', locals.session).handle(request);
export const fallback: RequestHandler = ({ request, locals }) =>
	app.state('session', locals.session).handle(request);
