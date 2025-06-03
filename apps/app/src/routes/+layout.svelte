<script lang="ts">
	import { notifier, Toast } from '$lib/comp/notifier';
	import '../app.css';
	let { children } = $props();
</script>

{@render children()}

<div class="fixed right-4 bottom-4 z-50">
	{#each $notifier as toast (toast.id)}
		<Toast>
			{toast.message}
		</Toast>
	{/each}
</div>
