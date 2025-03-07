<script lang="ts">
	import { Input, InputFrame, Button } from '$lib/comp/form';
	import { Mail } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms';
	import { valibot } from 'sveltekit-superforms/adapters';
	import * as m from '$lib/paraglide/messages';
	import { OTPSignInSchema } from '$core/models/user';
	import { Card } from '$lib/comp/core';

	let { data }: { data: PageData } = $props();

	const { form, errors, enhance } = superForm(data.form, {
		validators: valibot(OTPSignInSchema)
	});
</script>

<main class="flex flex-col items-center justify-center gap-3 p-3 md:p-7">
	<Card>
		<h1>{m.signin()}</h1>
		<form use:enhance method="POST" action="?/otp">
			<InputFrame label="E-Mail" for="email" error={$errors.email}>
				<Mail />
				<Input id="email" name="email" type="text" bind:value={$form.email} />
			</InputFrame>
		</form>
	</Card>
</main>
