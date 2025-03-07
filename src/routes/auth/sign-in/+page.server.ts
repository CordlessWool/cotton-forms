import { fail, setError, superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';
import { OTPSignInSchema } from '$core/models/user';
import { createOTP } from '$service/otp';
import { defineNewOTPFromUser } from '$core/logic/auth';
import { sendVerificationMail } from '$lib/server/mail';
import { getUserByEmail } from '$service/user';
import { redirect, type Actions } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	const form = await superValidate(valibot(OTPSignInSchema));
	return { form };
};

export const actions: Actions = {
	otp: async ({ request }) => {
		const form = await superValidate(request, valibot(OTPSignInSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const { data } = form;

		const user = await getUserByEmail(data.email);

		if (!user) {
			return setError(form, 'email', 'User not found');
		}

		const newOTP = defineNewOTPFromUser(user);
		await createOTP(newOTP);
		await sendVerificationMail(user.email, newOTP.token);

		return redirect(301, '/auth/otp/verify');
	}
};
