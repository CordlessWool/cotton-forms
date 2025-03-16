import { AUTH, isAuthorized } from '$lib/server/auth';
import { fail, superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { valibot } from 'sveltekit-superforms/adapters';
import { TeamSchema } from '$core/models/team';
import { createTeam } from '$service/team';
import { redirect } from '@sveltejs/kit';
import { addUserToTeam } from '$service/user';
import { switchActiveTeam } from '$service/session';

export const load: PageServerLoad = async ({ locals }) => {
	isAuthorized(locals, AUTH.NO_TEAM);

	const createForm = await superValidate(valibot(TeamSchema));

	return {
		createForm
	};
};

export const actions = {
	create: async ({ request, locals }) => {
		isAuthorized(locals, AUTH.NO_TEAM);
		const form = await superValidate(request, valibot(TeamSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const teamId = await createTeam(form.data, locals.userId);
		await addUserToTeam(locals.userId, { teamId, role: 'admin' }, true);
		await switchActiveTeam(locals.session.id, teamId);

		return redirect(303, `/`);
	}
} satisfies Actions;
