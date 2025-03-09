import { isProduction } from '$lib/helper/env';
import type { PickNonNullable } from '$lib/helper/types';
import { encodeBase32LowerCaseNoPadding } from '@oslojs/encoding';
import { error, type Cookies } from '@sveltejs/kit';

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

export function isAuthorized(
	locals: App.Locals
): asserts locals is PickNonNullable<App.Locals, 'userId' | 'teamId'> {
	if (locals.userId === undefined || locals.teamId === undefined) {
		error(401, 'Not authenticated');
	}
}
