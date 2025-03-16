<script lang="ts">
	import { Input, InputFrame, Button } from '$lib/comp/form';
	import { Key, Mail } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms';
	import { valibot } from 'sveltekit-superforms/adapters';
	import * as m from '$lib/paraglide/messages';
	import { OTPSignUpSchema } from '$core/models/user';
	import { Card } from '$lib/comp/core';

	let { data }: { data: PageData } = $props();

	const { form, errors, enhance } = superForm(data.form, {
		validators: valibot(OTPSignUpSchema)
	});
</script>

<main class="flex flex-col items-center justify-center gap-3 p-3 md:p-7">
	<Card>
		<h1>{m.signup()}</h1>
		<form use:enhance method="POST" action="?/otp">
			<InputFrame label="E-Mail" for="email" error={$errors.email}>
				<Mail />
				<Input id="email" name="email" type="email" bind:value={$form.email} />
			</InputFrame>
			<InputFrame label="Name" for="fullname" error={$errors.name}>
				<Input id="fullname" name="name" type="text" bind:value={$form.name} />
				<Button type="submit"><Key /></Button>
			</InputFrame>
		</form>
	</Card>
</main>
