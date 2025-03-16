<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	type CustomProps = {
		children: Snippet;
		transparent?: boolean;
		inline?: boolean;
		button?: boolean;
		danger?: boolean;
	};

	type Props = CustomProps & HTMLAnchorAttributes;

	const {
		children,
		transparent = false,
		inline = false,
		danger = false,
		button = false,
		...props
	}: Props = $props();
</script>

<a class:button class:danger class:transparent={transparent || inline} class:inline {...props}>
	{@render children()}
</a>

<style src="../form/Button.css">
</style>
