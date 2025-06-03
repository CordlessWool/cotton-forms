import { goto } from '$app/navigation';
import type { HandleClientError } from '@sveltejs/kit';

import type { Reroute } from '@sveltejs/kit';
import { deLocalizeUrl } from '$lib/paraglide/runtime';

export const reroute: Reroute = (request) => {
	return deLocalizeUrl(request.url).pathname;
};

export const handleError: HandleClientError = async ({ status, message }) => {
	if (status === 401) {
		// Handle unauthorized error
		return goto('/auth/sign-in');
	}

	const errorId = crypto.randomUUID();

	return {
		errorId,
		message
	};
};
