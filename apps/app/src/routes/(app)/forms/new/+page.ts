import type { PageLoad } from './$types';
import { FormDefinitionSchema } from '$core/models/form';
import { superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';

export const load: PageLoad = async () => {
	const createForm = await superValidate(valibot(FormDefinitionSchema));
	return {
		createForm
	};
};
