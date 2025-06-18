import { isAuthorized } from '$lib/server/auth';
import { getAllFormDefinitions } from '$service/form';
import type { LayoutServerLoad } from './$types';
import { sinitizeUserForClient } from '$core/logic/user';

export const load: LayoutServerLoad = async ({ locals }) => {
	isAuthorized(locals);

	const forms = await getAllFormDefinitions(locals.activeTeamId);

	return {
		forms,
		user: sinitizeUserForClient(locals.user)
	};
};
