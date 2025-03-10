import { isAuthorized } from '$lib/server/auth';
import { getAllFormDefinitions } from '$service/form';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	isAuthorized(locals);

	const forms = await getAllFormDefinitions(locals.teamId);

	return {
		forms
	};
};
