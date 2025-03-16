<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	import { ShieldCheck, Send, Shell, CircleX } from 'lucide-svelte';
	import { InputFrame, KeyInput, Button, ThemeHiddenInput } from '$lib/comp/form';
	import * as m from '$lib/paraglide/messages';

	const { data }: { data: PageData } = $props();
	let sendMailFailed = $state(false);
	const {
		form: verifyForm,
		enhance: verifyEnhance,
		errors: verifyErrors,
		submitting: verifySubmitting
	} = superForm(data.verificationForm);
	const { enhance: resendEnhance, submitting: resendSubmitting } = superForm(data.resendForm, {
		onError: () => {
			sendMailFailed = true;
		}
	});
</script>

<main class="flex flex-col items-center justify-center">
	<h1 class="mb-4 text-2xl font-bold">{m.verification_headline()}</h1>

	<p>{m.verification_description()}</p>
	<form
		method="POST"
		action="?/resend"
		use:resendEnhance
		class="mb-7 flex flex-row items-center gap-3"
	>
		<p class=" text-xl">{data.email}</p>
		<ThemeHiddenInput />
		<Button
			disabled={$resendSubmitting}
			class="text-sm"
			transparent
			error={sendMailFailed}
			type="submit"
			>{#if $resendSubmitting}
				<Shell class="animate-spin" size={14} />{m.verification_sending()}
			{:else if sendMailFailed}
				<CircleX size={14} />{m.verification_resend_failed()}
			{:else}<Send size={14} />{m.verification_resend()}{/if}
		</Button>
	</form>
	<form class="flex flex-col items-center gap-3" action="?/verify" method="POST" use:verifyEnhance>
		<InputFrame error={$verifyErrors.token?.[0]}>
			<KeyInput type="text" name="token" length={data.tokenLength} bind:value={$verifyForm.token} />
		</InputFrame>
		<Button disabled={$verifySubmitting} class="text-lg"
			><ShieldCheck class={$verifySubmitting ? 'animate-spin' : ''} />{m.verify()}</Button
		>
	</form>
</main>
