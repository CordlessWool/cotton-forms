import type { Actions, PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { fail, message, setError, superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import { sendVerificationMail } from '$lib/server/mail';
import { pathWithLang } from '$lib/helper/path';
import { getOTPById } from '$service/otp';
import { validOTP } from '$core/logic/auth';
import { verifyOTP } from '$core/logic/auth';
import { createSession } from '$service/session';
import { generateSessionToken, setSessionTokenCookie } from '$lib/server/auth';
import { OTPFormSchema, ThemeSchema } from '$lib/helper/form';
import { languageTag } from '$lib/paraglide/runtime.js';

const maskmail = (mail: string) => {
	const [name, domain] = mail.split('@');
	const half = Math.ceil(name.length / 2);
	return `${name.slice(0, half)}${'*'.repeat(half)}@${domain}`;
};

export const load: PageServerLoad = async ({ locals, params }) => {
	if (locals.userId) {
		redirect(302, pathWithLang('/'));
	}

	const otp = await getOTPById(params.hash);

	if (!validOTP(otp)) {
		redirect(302, pathWithLang('/login'));
	}

	const [verificationForm, resendForm] = await Promise.all([
		superValidate(valibot(OTPFormSchema)),
		superValidate(valibot(ThemeSchema))
	]);

	return {
		resendForm,
		verificationForm,
		email: maskmail(otp.email),
		tokenLength: otp.token.length,
		expiresAt: otp.expiresAt
	};
};

export const actions = {
	resend: async ({ params, request }) => {
		const { hash } = params;
		const form = await superValidate(request, valibot(ThemeSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		const otp = await getOTPById(hash);

		if (!validOTP(otp)) {
			redirect(302, pathWithLang('/auth/sign-in'));
		}

		await sendVerificationMail(otp.email, otp.token, languageTag(), form.data.theme);
		return message(form, 'Mail sent');
	},
	verify: async ({ params, request, cookies }) => {
		const { hash } = params;

		const form = await superValidate(request, valibot(OTPFormSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		const otp = await getOTPById(hash);
		console.log(otp, form.data.token);
		if (!verifyOTP(otp, form.data.token)) {
			setError(form, 'token', 'Token is invalid or expired');
			return fail(400, { form });
		}

		const sessionToken = generateSessionToken();
		const session = await createSession(sessionToken, otp.userId, otp.teamId);
		setSessionTokenCookie(cookies, sessionToken, session.expiresAt);
		redirect(302, pathWithLang('/'));
	}
} satisfies Actions;
