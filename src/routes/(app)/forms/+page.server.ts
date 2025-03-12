import { FormDefinitionSchema } from '$core/models/form';
import { isAuthorized } from '$lib/server/auth';
import { createFormDefinition, getAllFormDefinitions } from '$service/form';
import { fail, superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	isAuthorized(locals);

	const createForm = await superValidate(valibot(FormDefinitionSchema));
	const definedForms = await getAllFormDefinitions(locals.teamId);
	return {
		definedForms,
		createForm
	};
};

export const actions = {
	create: async ({ request, locals }) => {
		isAuthorized(locals);
		const form = await superValidate(request, valibot(FormDefinitionSchema));
		if (!form.valid) return fail(400, { form });

		const newForm = await createFormDefinition(form.data, locals.teamId);

		if (!newForm) return fail(500, { form });

		return newForm;
	}
} satisfies Actions;
