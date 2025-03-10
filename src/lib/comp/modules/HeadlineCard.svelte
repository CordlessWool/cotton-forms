<script lang="ts">
	import { Card } from '$lib/comp/core';
	import type { ComponentProps, Snippet } from 'svelte';
	import ButtonGroup from '../form/ButtonGroup.svelte';
	type Props = {
		headline: string;
		subline?: string;
		actions?: Snippet;
	} & Omit<ComponentProps<typeof Card>, 'children'>;

	let { headline, subline, actions, ...props }: Props = $props();
</script>

<div {...props}>
	<h1>{headline}</h1>
	{#if actions}
		<ButtonGroup>
			{@render actions?.()}
		</ButtonGroup>
	{/if}
	{#if subline}
		<p>{subline}</p>
	{/if}
</div>

<style lang="postcss">
	@reference "tailwindcss/theme";
	div {
		@apply col-span-full;
		@apply grid items-center gap-5;
		grid-template-columns: 1fr auto;
		@apply px-3 py-2 pb-5;
	}

	p {
		@apply col-span-2;
	}
</style>
