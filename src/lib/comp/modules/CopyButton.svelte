<script lang="ts">
	import { Copy } from 'lucide-svelte';
	import { Button } from '../form';
	import type { ComponentProps } from 'svelte';

	type Props = {
		content: string;
	} & Omit<ComponentProps<typeof Button>, 'children'>;

	const { content, title = 'copy', ...props }: Props = $props();
</script>

<Button {...props} {title} onclick={() => navigator.clipboard.writeText(content)}>
	<Copy />
</Button>
