<script lang="ts">
	import { InputFrame, Button, SuperInput, Form } from '$lib/comp/form';
	import { Mail, Key } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms';
	import { valibot } from 'sveltekit-superforms/adapters';
	import * as m from '$lib/paraglide/messages';
	import { OTPSignInSchema } from '$core/models/user';
	import { Card } from '$lib/comp/core';

	let { data }: { data: PageData } = $props();

	const form = superForm(data.form, {
		validators: valibot(OTPSignInSchema)
	});
</script>

<main class="flex flex-col items-center justify-center gap-3 p-3 md:p-7">
	<Card>
		<h1>{m.signin()}</h1>
		<Form {form} action="?/otp">
			<InputFrame label="E-Mail" for="email">
				<Mail />
				<SuperInput {form} id="email" name="email" type="text" />
				<Button type="submit"><Key /></Button>
			</InputFrame>
		</Form>
	</Card>
</main>
