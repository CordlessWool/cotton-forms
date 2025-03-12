import { SESSION_COOKIE_NAME } from '$lib/server/auth';
import { validateSessionToken } from '$service/session';
import { getAPIKeyByToken } from '$service/user';
import { Elysia, error, type Context } from 'elysia';

const authWithSessionCookie = async (ctx: Context) => {
	const cookie = ctx.cookie[SESSION_COOKIE_NAME];
	if (!cookie.value) return null;
	const session = await validateSessionToken(cookie.value);

	if (!session || !session.activeTeamId) return null;
	return {
		teamId: session.activeTeamId,
		userId: session.userId
	};
};

export const AuthService = new Elysia().derive({ as: 'global' }, async (ctx: Context) => {
	const { headers } = ctx;
	const apiKey = headers['x-api-key'];

	if (!apiKey) {
		const data = await authWithSessionCookie(ctx);
		if (data) {
			return data;
		}
		throw error(401, 'Missing API key');
	}

	const tokenObj = await getAPIKeyByToken(apiKey);

	if (!tokenObj) {
		throw error(401, 'Invalid API key');
	}

	const { teamId, userId } = tokenObj;

	return { teamId, userId };
});
