import { goto } from '$app/navigation';
import { i18n } from '$lib/i18n';
import type { HandleClientError } from '@sveltejs/kit';
export const reroute = i18n.reroute();

export const handleError: HandleClientError = async ({ status, message }) => {
	console.log(status, message);
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
