<script lang="ts">
	import { Card, InfoItem, ItemList } from '$lib/comp/core';
	import { Button } from '$lib/comp/form';
	import { CopyButton, HeadlineCard } from '$lib/comp/modules';
	import { Plus } from 'lucide-svelte';
	import type { ApiKey } from '$core/models/apiKey';

	import type { PageData } from './$types';
	import Form from '$lib/comp/form/Form.svelte';
	import { superForm } from 'sveltekit-superforms/client';

	let { data }: { data: PageData } = $props();

	const form = superForm(
		{},
		{
			onResult: async ({ result }) => {
				console.log(result);
				if (result.type === 'success' && result.data) {
					data.apiKeys.unshift(result.data as ApiKey);
				}
			}
		}
	);
</script>

<main>
	<HeadlineCard headline="API Keys">
		{#snippet actions()}
			<Form {form} action="?/create">
				<Button type="submit"><Plus />Create API Key</Button>
			</Form>
		{/snippet}
	</HeadlineCard>
	{#each data.apiKeys as apiKey (apiKey.id)}
		<Card
			><ItemList>
				<InfoItem label="token">
					<div class="flex">
						<span class="overflow-hidden text-nowrap text-ellipsis">{apiKey.token}</span>
						<CopyButton class="shrink-0" content={apiKey.token} />
					</div>
				</InfoItem></ItemList
			></Card
		>
	{/each}
</main>

<style lang="postcss">
	@reference "tailwindcss/theme";

	main {
		@apply grid auto-rows-min gap-5 lg:grid-cols-2 2xl:grid-cols-3;
	}
</style>
