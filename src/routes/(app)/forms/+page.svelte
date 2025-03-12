<script lang="ts">
	import { Card, InfoItem, Anchor } from '$lib/comp/core';
	import { Button } from '$lib/comp/form';
	import * as m from '$lib/paraglide/messages';
	import { FileText, Plus } from 'lucide-svelte';
	import type { PageData } from './$types';

	import { CopyButton, HeadlineCard } from '$lib/comp/modules';
	import CreateFormCard from './CreateFormCard.svelte';
	import type { FormDefinition } from '$core/models/form';
	import ItemList from '$lib/comp/core/ItemList.svelte';
	import ButtonGroup from '$lib/comp/form/ButtonGroup.svelte';

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

	const removeForm = (id: string) => {
		definedForms = definedForms.filter((form) => form.id !== id);
	};

	const replaceForm = (form: FormDefinition, old: NewForm) => {
		definedForms = definedForms.map((f) => (f.id === old.id ? form : f));
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
			<CreateFormCard
				form={data.createForm}
				onremoved={() => removeForm(def.id)}
				oncreated={(data: FormDefinition) => replaceForm(data, def)}
			/>
		{:else}
			{@const { id, name, key, description } = def}
			<Card>
				<div class="grid-cols-[1fr min] grid grid-flow-row gap-5">
					<ItemList>
						<InfoItem label={m.name()} ref={name}>{name}</InfoItem>
						<InfoItem label={m.key()}>{key}<CopyButton content={key} /></InfoItem>
					</ItemList>
					<ButtonGroup vertical class="col-start-2">
						<Anchor button href="/forms/{id}" title={m.forms_open()}>
							<FileText />
						</Anchor>
					</ButtonGroup>
					{#if description}
						<ItemList class="col-span-2">
							<InfoItem label={m.description()} ref={description}>{description}</InfoItem>
						</ItemList>
					{/if}
				</div>
			</Card>
		{/if}
	{/each}
</main>

<style lang="postcss">
	@reference "tailwindcss/theme";

	main {
		@apply grid auto-rows-min gap-5 lg:grid-cols-2 2xl:grid-cols-3;
	}
</style>
