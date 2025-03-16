<script lang="ts">
	import { Copy } from 'lucide-svelte';
	import { Button } from '../form';
	import type { ComponentProps, Snippet } from 'svelte';

	type Props = {
		content: string;
		children?: Snippet;
	} & Omit<ComponentProps<typeof Button>, 'children' | 'inline' | 'onclick'>;

	const { content, title = 'copy', children, ...props }: Props = $props();
</script>

<Button {...props} {title} inline onclick={() => navigator.clipboard.writeText(content)}>
	{@render children?.()}
	<Copy />
</Button>
