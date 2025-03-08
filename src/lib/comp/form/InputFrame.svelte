<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		for?: string;
		label?: string;
		children: Snippet;
		info?: string | string[];
		error?: string | string[];
	};

	const { label, children, info, error, ...props }: Props = $props();

	const toString = (value: string | string[]) => {
		if (Array.isArray(value)) {
			return value.join(', ');
		}
		return value;
	};
</script>

<div class="frame">
	{#if label && props.for}
		<label for={props.for}>{label}</label>
	{/if}
	<div class="inputs">
		{@render children()}
	</div>
	{#if error}
		<small>{toString(error)}</small>
	{:else if info}
		<small>{toString(info)}</small>
	{:else}
		<small>&nbsp;</small>
	{/if}
</div>

<style>
	@reference "tailwindcss/theme";
	.frame {
		@apply grid gap-0;
	}
	label {
		@apply pl-1 text-sm text-zinc-600;
	}
	small {
		@apply pl-1 text-zinc-600;
	}

	:global(.dark) {
		label {
			@apply text-zinc-400;
		}
		small {
			@apply text-zinc-400;
		}

		.inputs {
			@apply bg-zinc-800;
			@apply border-zinc-800 focus-within:border-teal-600;
		}
	}

	.inputs {
		@apply border-s-5;
		@apply focus-within:border-teal-400;

		@apply flex flex-row flex-nowrap items-center gap-3;
		@apply w-full px-2 py-2;
		@apply border-zinc-100 bg-zinc-100;
		@apply rounded-md;
	}
</style>
