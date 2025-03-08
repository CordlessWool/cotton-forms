import { encodeBase32LowerCaseNoPadding } from '@oslojs/encoding';
import type { Cookies } from '@sveltejs/kit';

export function generateSessionToken(): string {
	const bytes = new Uint8Array(20);
	crypto.getRandomValues(bytes);
	const token = encodeBase32LowerCaseNoPadding(bytes);
	return token;
}

export function setSessionTokenCookie(cookies: Cookies, token: string, expiresAt: Date) {
	cookies.set('session', token, {
		expires: expiresAt,
		path: '/'
	});
}
