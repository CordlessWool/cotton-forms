import { isProduction } from '$lib/helper/env';
import type { PickNonNullable } from '$lib/helper/types';
import { encodeBase32LowerCaseNoPadding } from '@oslojs/encoding';
import { error, type Cookies } from '@sveltejs/kit';
import { redirect } from 'elysia';

export const SESSION_COOKIE_NAME = 'session';

export function generateSessionToken(): string {
	const bytes = new Uint8Array(20);
	crypto.getRandomValues(bytes);
	const token = encodeBase32LowerCaseNoPadding(bytes);
	return token;
}

export function setSessionTokenCookie(cookies: Cookies, token: string, expiresAt: Date) {
	cookies.set(SESSION_COOKIE_NAME, token, {
		expires: expiresAt,
		httpOnly: true,
		path: '/',
		secure: isProduction,
		sameSite: 'strict'
	});
}

export function getSessionTokenCookie(cookies: Cookies): string | undefined {
	return cookies.get(SESSION_COOKIE_NAME);
}

export class AuthenticationException extends Error {
	constructor(message: string) {
		super(message);
	}
}

export enum AUTH {
	NO_TEAM,
	TEAM_AND_USER
}

export function isAuthorized(
	locals: App.Locals,
	type: AUTH.NO_TEAM
): asserts locals is PickNonNullable<App.Locals, 'userId' | 'session'>;
export function isAuthorized(
	locals: App.Locals,
	type?: AUTH.TEAM_AND_USER
): asserts locals is PickNonNullable<App.Locals, 'userId' | 'teamId' | 'session'>;
export function isAuthorized(
	locals: App.Locals,
	type: AUTH = AUTH.TEAM_AND_USER
): asserts locals is PickNonNullable<App.Locals, 'userId' | 'teamId' | 'session'> {
	if (locals.session == null) {
		error(401, 'Not authenticated');
	}
	if (type === AUTH.TEAM_AND_USER && (locals.userId == null || locals.teamId == null)) {
		if (locals.teamId == null) {
			//TODO: think about this and other solutions
			redirect('/auth/team/create');
		}
		error(401, 'Not authenticated');
	} else if (type === AUTH.NO_TEAM && locals.userId == null) {
		error(401, 'Not authenticated');
	}
}
