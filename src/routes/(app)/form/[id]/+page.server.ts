import { isAuthorized } from '$lib/server/auth';
import { getFormDefinition } from '$service/form';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, locals }) => {
	isAuthorized(locals);

	const { id } = params;
	const definition = await getFormDefinition(id, locals.teamId);

	if (!definition) {
		error(404, 'Form not found');
	}

	return { definition };
};
