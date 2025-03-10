import { FormDefinitionSchema } from '$core/models/form';
import { isAuthorized } from '$lib/server/auth';
import { getAllFormDefinitions } from '$service/form';
import { superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	isAuthorized(locals);

	const createForm = await superValidate(valibot(FormDefinitionSchema));
	const definedForms = await getAllFormDefinitions(locals.teamId);
	return {
		definedForms,
		createForm
	};
};
