<script lang="ts">
	import { Card, ItemList, InfoItem, Meta } from '../core';

	type Props = {
		id: string;
		createdAt: Date | string;
		data: Record<string, unknown>;
	};

	let { createdAt, data }: Props = $props();
</script>

<Card>
	<div class="flex h-full grid-cols-1 flex-col gap-y-3">
		<ItemList class="grow">
			{#each Object.entries(data) as [label, content]}
				<InfoItem {label}>{content}</InfoItem>
			{/each}
		</ItemList>
		<ul class="flex shrink flex-row justify-end">
			<li><Meta>{new Date(createdAt).toLocaleString()}</Meta></li>
		</ul>
	</div>
</Card>
