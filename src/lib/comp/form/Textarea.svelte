<script lang="ts">
	import Label from './Label.svelte';
	import type { HTMLTextareaAttributes } from 'svelte/elements';

	type Props = {
		label?: string;
	} & Omit<HTMLTextareaAttributes, 'defaultValue'>;

	let { label, value = $bindable(), ...props }: Props = $props();
</script>

<div>
	{#if label}
		<Label>{label}</Label>
	{/if}

	<textarea bind:value {...props}></textarea>
</div>

<style lang="postcss">
	@reference 'tailwindcss/theme';
	textarea {
		all: unset;
		@apply box-border w-full;
		@apply border-s-5;
		@apply border-zinc-700 bg-zinc-700 focus:border-teal-600;
		@apply focus:border-teal-400;
		@apply px-1 py-3;
		@apply rounded-md;
		@apply border-zinc-100 bg-zinc-100;
	}

	:global(.dark) {
		textarea {
			@apply border-zinc-700 bg-zinc-700 focus:border-teal-600;
		}
	}
</style>
