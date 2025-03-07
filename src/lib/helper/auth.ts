import { Elysia, type Context } from 'elysia';
import { createSession, validateSessionToken } from '$service/session';
import { getAPIKeyByToken } from '$service/user';
import { isExpired } from './time';

import { ECODES } from '$core/exceptions/codes';

const getAPIToken = (request: Request) => {
	return request.headers.get('x-api-key');
};

const authWithAPIKey = async (token: string, error: Context['error']) => {
	const apiKey = await getAPIKeyByToken(token);
	if (!apiKey) {
		throw error(401, 'Unauthorized Access: Invalid API Key');
	}
	const session = await validateSessionToken(apiKey.token);
	if (!session) {
		const session = await createSession(token, apiKey.userId, apiKey.teamId);
		return { session, teamId: session.activeTeamId };
	}
	return { session, teamId: session.activeTeamId };
};

const authWithCookie = async ({ cookie, error }: Pick<Context, 'cookie' | 'error'>) => {
	const token = cookie.session.value;
	if (!token) {
		throw error(401, {
			code: ECODES.SESSION_TOKEN_MISSING,
			message: 'Unauthorized Access: Session token is missing'
		});
	}
	const session = await validateSessionToken(token);

	if (!session || isExpired(session.expiresAt)) {
		throw error(401, {
			code: ECODES.SESSION_TOKEN_EXPIRED,
			message: 'Unauthorized Access: Session token has expired'
		});
	}
	return { session, teamId: session.activeTeamId };
};

const getSession = async (
	{ request, cookie, error }: Pick<Context, 'cookie' | 'error' | 'request'>,
	allowApiKey: boolean
) => {
	if (allowApiKey) {
		const token = getAPIToken(request);
		if (token) {
			return await authWithAPIKey(token, error);
		}
	}
	return await authWithCookie({ cookie, error });
};

export const authMiddleware = (allowApiKey = true) => {
	return new Elysia().derive({ as: 'scoped' }, async ({ request, error, cookie }: Context) => {
		const { session, teamId } = await getSession({ request, cookie, error }, allowApiKey);
		if (!teamId) {
			throw error(401, {
				message: 'Unauthorized Access: TeamId is missing',
				code: ECODES.TEAM_ID_MISSING
			});
		}
		return { session, teamId };
	});
};

export const authWithoutTeamMiddleware = (allowApiKey = true) => {
	return new Elysia().derive({ as: 'scoped' }, async ({ request, error, cookie }: Context) => {
		const { session } = await getSession({ request, cookie, error }, allowApiKey);
		return { session };
	});
};
