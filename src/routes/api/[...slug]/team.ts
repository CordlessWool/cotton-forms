import { Elysia } from 'elysia';
import { createTeam } from '$service/team';
import { authWithoutTeamMiddleware } from '$lib/helper/auth';
import * as v from 'valibot';
import { TeamSchema } from '$core/models/team';
import { addUserToTeam } from '$service/user';

export default new Elysia({ prefix: '/team' })
	.use(authWithoutTeamMiddleware(false))
	.post('/', async ({ body, session, error }) => {
		const data = v.parse(v.pick(TeamSchema, ['name', 'description']), body);
		const teamId = await createTeam(data, session.userId);

		if (!teamId) {
			throw error(500, 'Failed to create team');
		}

		await addUserToTeam(
			{
				teamId,
				role: 'owner'
			},
			session.userId
		);

		return {
			success: true,
			teamId
		};
	});
