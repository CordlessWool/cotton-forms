<script lang="ts">
	import { Card } from '$lib/comp/core';
	import { InputFrame, Button, ButtonGroup, SuperInput, Form, SuperTextarea } from '$lib/comp/form';
	import * as m from '$lib/paraglide/messages';
	import { Plus, Trash2, BookPlus } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import { valibotClient } from 'sveltekit-superforms/adapters';
	import { FormDefinitionSchema, type FormDefinition } from '$core/models/form';
	import { HeadlineCard } from '$lib/comp/modules';
	import CreateFormCard from './CreateFormCard.svelte';

	interface NewForm {
		id: string;
		new: boolean;
	}

	let { data }: { data: PageData } = $props();

	let definedForms: (FormDefinition | NewForm)[] = $state(data.definedForms);

	const isNewForm = (form: FormDefinition | NewForm): form is NewForm => {
		return 'new' in form && form.new;
	};

	const addNewFormCard = () => {
		definedForms = [{ id: crypto.randomUUID(), new: true }, ...definedForms];
	};
</script>

<main>
	<HeadlineCard headline={m.forms_overview_title()}>
		{#snippet actions()}
			<Button type="button" onclick={addNewFormCard}><Plus />{m.forms_create_new()}</Button>
		{/snippet}
	</HeadlineCard>

	{#each definedForms as def (def.id)}
		{#if isNewForm(def)}
			<CreateFormCard form={data.createForm} />
		{:else}
			<Card>
				{def.name}
				{def.description}
			</Card>
		{/if}
	{/each}
</main>

<style lang="postcss">
	@reference "tailwindcss/theme";

	main {
		@apply grid auto-rows-min gap-3 md:grid-cols-2 xl:grid-cols-3;
	}
</style>
