<script lang="ts">
	import { FormDefinitionSchema } from '$core/models/form';
	import { Form as FForm } from '$lib/comp/form';
	import * as Form from '$lib/comp/ui/form/index.js';
	import { Input } from '$lib/comp/ui/input/index.js';
	import * as m from '$lib/paraglide/messages';
	import { Textarea } from '$lib/comp/ui/textarea/index.js';
	import { superForm, type SuperValidated } from 'sveltekit-superforms';
	import { valibotClient } from 'sveltekit-superforms/adapters';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const form = superForm(data.createForm, {
		validators: valibotClient(FormDefinitionSchema)
	});
	const { form: formData } = form;
</script>

<FForm {form} action="?/create">
	<Form.Field {form} name="name">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Username</Form.Label>
				<Input {...props} bind:value={$formData.name} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="description">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Username</Form.Label>
				<Textarea {...props} bind:value={$formData.description} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>Submit</Form.Button>
	<!-- <InputFrame label="Name" for="create-name">
		<SuperInput {form} id="create-name" name="name" />
	</InputFrame>
	<SuperTextarea label="Description" {form} name="description" />
	<Button type="submit"><ClipboardPlus />{m.forms_add()}</Button> -->
</FForm>
