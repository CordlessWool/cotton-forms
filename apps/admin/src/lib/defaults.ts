import { isProduction } from './helper/env';

export enum THEME {
	DARK,
	LIGHT
}
export const VERIFICATION_KEY_LENGTH = 3;

const { ORIGIN: ENV_ORIGIN = 'http://localhost:3011' } = process.env;

export const ORIGIN = ENV_ORIGIN.trim();
export const SESSION_SECRET = process.env.SESSION_SECRET || 'default_secret';

if (isProduction) {
	if (!process.env.SESSION_SECRET) {
		throw new Error('env SESSION_SECRET is not set');
	}
}
