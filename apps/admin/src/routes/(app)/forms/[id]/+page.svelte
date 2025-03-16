<script lang="ts">
	import { Card, ItemList, InfoItem, Meta, NoData } from '$lib/comp/core';
	import { onMount } from 'svelte';
	import {
		HeadlineCard,
		CopyButton,
		DataCard,
		ToolbarLinkButton,
		Toolbar
	} from '$lib/comp/modules';
	import { File } from 'lucide-svelte';
	import type { PageData } from './$types';
	import * as m from '$lib/paraglide/messages';
	import type { FormRecord } from '$core/models/form';

	let { data }: { data: PageData } = $props();
	const { definition } = data;
	let formData = $state<FormRecord[]>([]);
	const loadData = async () => {
		const result = await fetch(`/api/form/${definition.key}/data`);
		if (result.ok) {
			const data = await result.json();
			formData.push(...data);
		}
	};

	onMount(async () => {
		await loadData();
	});
</script>

<main>
	<HeadlineCard
		class="col-span-full"
		headline={definition.name ?? `From-${definition.key}`}
		subline="FORM DETAILS AND DATA"
	/>

	<Card class="col-span-full">
		<ItemList wrap>
			<InfoItem label={m.key()}>{definition.key}<CopyButton content={definition.key} /></InfoItem>
			{#if definition.origins}
				{#each definition.origins as origin, i (origin)}
					<InfoItem label="origin {i + 1}">{origin}</InfoItem>
				{/each}
			{/if}

			{#if definition.schema}
				{#each definition.schema as schema, i (i)}
					<InfoItem label="field {i + 1}"
						><div class="divide-x divide-zinc-500">
							<span class="pr-3">{schema.label}</span>
							{#if schema.required}
								<Meta>required</Meta>
							{/if}
						</div>
					</InfoItem>
				{/each}
			{/if}
			<InfoItem class="col-span-full" label="Description" ref={definition.description}
				>{definition.description}</InfoItem
			>
		</ItemList>
	</Card>
	<Toolbar class="col-span-full">
		<ToolbarLinkButton
			title={formData.length === 0 ? 'No data' : 'Download CSV'}
			disabled={formData.length === 0}
			href="/api/form/{definition.key}/data/csv"><File />CSV</ToolbarLinkButton
		>
	</Toolbar>

	{#if formData.length === 0}
		<NoData class="col-span-full">No data available for this form.</NoData>
	{:else}
		{#each formData as data (data.id)}
			<DataCard {...data} />
		{/each}
	{/if}
</main>

<style lang="postcss">
	@reference "tailwindcss/theme";

	main {
		@apply grid auto-rows-min gap-3 lg:grid-cols-2 2xl:grid-cols-3;
	}
</style>
