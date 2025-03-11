<script lang="ts">
	import type { PageData } from './$types';
	import { Card } from '$lib/comp/core';
	import { InputFrame, Button, ButtonGroup, SuperInput, Form, SuperTextarea } from '$lib/comp/form';
	import { superForm } from 'sveltekit-superforms';
	import { valibotClient } from 'sveltekit-superforms/adapters';
	import * as m from '$lib/paraglide/messages';
	import { TeamSchema } from '$core/models/team';
	import { Users } from 'lucide-svelte';
	import { notifier } from '$lib/comp/notifier';

	let { data }: { data: PageData } = $props();

	const form = superForm(data.createForm, {
		validators: valibotClient(TeamSchema),
		onError: () => {
			notifier.error('Unexpected error');
		}
	});
</script>

<main class="flex flex-col items-center justify-center gap-3 p-3 md:p-7">
	<Card>
		<h1>{m.team_create_title()}</h1>
		<Form {form} action="?/create">
			<InputFrame label="Name" for="create-name">
				<SuperInput {form} id="create-name" name="name" />
			</InputFrame>
			<SuperTextarea label="Description" {form} name="description" />
			<ButtonGroup>
				<Button type="submit"><Users />{m.team_create()}</Button>
			</ButtonGroup>
		</Form>
	</Card>
</main>
