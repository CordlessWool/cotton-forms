import { sequence } from '@sveltejs/kit/hooks';
import type { Handle } from '@sveltejs/kit';
import { i18n } from '$lib/i18n';
const handleParaglide: Handle = i18n.handle();

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

export const handle: Handle = sequence(handleParaglide, corsHandler);
