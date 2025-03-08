import { OTPSchema } from '$core/models/otp';
import { THEME } from '$lib/defaults';
import * as v from 'valibot';
import type { U } from 'vitest/dist/chunks/environment.d8YfPkTm.js';

export const ThemeSchema = v.object({
	theme: v.optional(v.pipe(v.number(), v.enum(THEME)))
});

export const OTPFormSchema = v.object({
	...OTPSchema.entries,
	...ThemeSchema.entries
});
