<script lang="ts">
	import { FormDefinitionSchema, type FormDefinition } from '$core/models/form';
	import { Card } from '$lib/comp/core';
	import { InputFrame, Button, ButtonGroup, SuperInput, Form, SuperTextarea } from '$lib/comp/form';
	import { BookPlus, Trash2 } from 'lucide-svelte';
	import * as m from '$lib/paraglide/messages';

	import { superForm, type SuperValidated } from 'sveltekit-superforms';
	import { valibotClient } from 'sveltekit-superforms/adapters';

	type Props = {
		form: SuperValidated<FormDefinition>;
	};

	let { ...props }: Props = $props();

	const form = superForm(props.form, {
		validators: valibotClient(FormDefinitionSchema)
	});
</script>

<Card>
	<Form {form} action="/?create">
		<InputFrame label="Name" for="create-name">
			<SuperInput {form} id="create-name" name="name" />
		</InputFrame>
		<SuperTextarea label="Description" {form} name="description" />
		<ButtonGroup>
			<Button type="submit"><BookPlus />{m.forms_add()}</Button>
			<Button type="button" onclick="danger"><Trash2 /></Button>
		</ButtonGroup>
	</Form>
</Card>
