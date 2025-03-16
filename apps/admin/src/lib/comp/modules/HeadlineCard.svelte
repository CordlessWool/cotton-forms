<script lang="ts">
	import type { Snippet } from 'svelte';
	import ButtonGroup from '../form/ButtonGroup.svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	type Props = {
		headline: string;
		subline?: string;
		actions?: Snippet;
	} & HTMLAttributes<HTMLElement>;

	let { headline, subline, actions, ...props }: Props = $props();
</script>

<section {...props}>
	<div>
		<h1>{headline}</h1>
		{#if subline}
			<p>{subline}</p>
		{/if}
	</div>
	{#if actions}
		<ButtonGroup>
			{@render actions?.()}
		</ButtonGroup>
	{/if}
</section>

<style lang="postcss">
	@reference "tailwindcss/theme";

	h1 {
		@apply mb-0;
	}

	section {
		@apply col-span-full;
		@apply grid items-center gap-5;
		grid-template-columns: 1fr auto;
		@apply px-3 py-2;
	}

	p {
		@apply col-span-2;
	}
</style>
