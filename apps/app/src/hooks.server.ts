import { sequence } from '@sveltejs/kit/hooks';
import { redirect, type Handle, type HandleServerError } from '@sveltejs/kit';
import { getSessionTokenCookie } from '$lib/server/auth';
import { validateSessionToken } from '$service/session';
import { paraglideMiddleware } from '$lib/paraglide/server';

const paraglideHandle: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request: localizedRequest, locale }) => {
		event.request = localizedRequest;
		return resolve(event, {
			transformPageChunk: ({ html }) => html.replace('%lang%', locale)
		});
	});

const corsHandler: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	// Get origin from headers (for checking cross-site requests)
	const origin = event.request.headers.get('origin');
	const isCrossSite = origin && new URL(origin).origin !== event.url.origin;

	// Block CSRF on all routes *except* the allowed ones
	if (
		isCrossSite &&
		!event.url.pathname.startsWith('/f/') &&
		!event.url.pathname.startsWith('/api/')
	) {
		return new Response('Forbidden: CSRF protection enabled', { status: 403 });
	}

	// Allow CORS headers only on permitted routes
	if (event.url.pathname.startsWith('/f/') || event.url.pathname.startsWith('/api/')) {
		response.headers.set('Access-Control-Allow-Origin', '*'); // Adjust for security
		response.headers.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
		response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
	}

	return response;
};

const sessionHandler: Handle = async ({ event, resolve }) => {
	const { cookies, locals } = event;
	const sessionToken = getSessionTokenCookie(cookies);
	if (!sessionToken) {
		return resolve(event);
	}
	const session = await validateSessionToken(sessionToken);

	if (session) {
		locals.session = session;
		locals.teamId = session.activeTeamId;
		locals.userId = session.userId;
	}

	const result = await resolve(event);

	if (result.status === 401 && !event.url.pathname.startsWith('/api/')) {
		redirect(303, '/auth/sign-in');
	}

	return result;
};

export const handle: Handle = sequence(corsHandler, paraglideHandle, sessionHandler);

export const handleErrors: HandleServerError = async ({ message }) => {
	const errorId = crypto.randomUUID();

	return {
		errorId,
		message
	};
};
