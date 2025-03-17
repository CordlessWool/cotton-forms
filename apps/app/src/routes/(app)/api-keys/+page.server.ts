import { isAuthorized } from '$lib/server/auth';
import { createApiKey, deleteApiKey, getApiKeys } from '$service/user';
import { fail, superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { valibot } from 'sveltekit-superforms/adapters';
import { ApiKeySchema } from '$core/models/apiKey';
import { generateApiKey } from '$core/logic/user';

export const load: PageServerLoad = async ({ locals }) => {
	isAuthorized(locals);

	const [apiKeys] = await Promise.all([getApiKeys(locals.teamId)]);

	return {
		apiKeys
	};
};

export const actions = {
	create: async ({ locals }) => {
		isAuthorized(locals);
		const newKey = generateApiKey(locals.userId, locals.teamId);
		const id = await createApiKey(newKey);

		const form = await superValidate(
			{
				id,
				...newKey
			},
			valibot(ApiKeySchema)
		);

		if (!form.valid) {
			return fail(400, { form });
		}

		return {
			form
		};
	},
	delete: async ({ request, locals }) => {
		isAuthorized(locals);

		const form = await superValidate(request, valibot(ApiKeySchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const { id } = form.data;

		try {
			await deleteApiKey(id, locals.teamId);
		} catch (error) {
			return fail(500, { form, error });
		}

		return { form };
	}
} satisfies Actions;
