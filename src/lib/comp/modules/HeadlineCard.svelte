<script lang="ts">
	import { Card } from '$lib/comp/core';
	import type { ComponentProps } from 'svelte';
	type Props = {
		headline: string;
		subline?: string;
	} & Omit<ComponentProps<typeof Card>, 'children'>;

	let { headline, subline, ...props }: Props = $props();
</script>

<Card {...props}>
	<h1>{headline}</h1>
	{#if subline}
		<p>{subline}</p>
	{/if}
</Card>

<style lang="postcss">
</style>
