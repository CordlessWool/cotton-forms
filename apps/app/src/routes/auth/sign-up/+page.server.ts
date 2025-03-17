import { fail, superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import type { PageServerLoad, Actions } from './$types';
import { OTPSignUpSchema } from '$core/models/user';
import { createUser } from '$service/user';
import { redirect } from '@sveltejs/kit';
import { defineNewOTPFromUser } from '$core/logic/auth';
import { createOTP } from '$service/otp';
import { sendVerificationMail } from '$lib/server/mail';

export const load: PageServerLoad = async () => {
	const form = await superValidate(valibot(OTPSignUpSchema));
	return { form };
};

export const actions: Actions = {
	otp: async ({ request }) => {
		const form = await superValidate(request, valibot(OTPSignUpSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		// Handle form submission
		const { email, name } = form.data;
		const user = await createUser({
			email,
			name
		});
		const newOTP = defineNewOTPFromUser(user);
		const OTPId = await createOTP(newOTP);
		await sendVerificationMail(user.email, newOTP.token);

		if (!user) {
			return fail(500, { form });
		}

		return redirect(303, `/auth/otp/verify/${OTPId}`);
	}
};
