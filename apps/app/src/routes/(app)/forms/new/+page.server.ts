import { FormDefinitionSchema } from '$core/models/form';
import { isAuthorized } from '$lib/server/auth';
import { createFormDefinition } from '$service/form';
import { fail, superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';

export const actions = {
	create: async ({ request, locals }) => {
		isAuthorized(locals);
		const form = await superValidate(request, valibot(FormDefinitionSchema));
		console.log({ form });
		if (!form.valid) {
			return fail(400, { form });
		}

		const newForm = await createFormDefinition(form.data, locals.activeTeamId);

		if (!newForm) {
			return fail(500, { form });
		}

		redirect(302, `/forms/${newForm.id}`);
	}
} satisfies Actions;
