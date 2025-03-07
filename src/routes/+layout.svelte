<script lang="ts">
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import { Toast, initNotifierContext } from '$lib/comp/notifier';
	import '../app.css';
	let { children } = $props();

	const notifications = initNotifierContext();
</script>

<ParaglideJS {i18n}>
	{@render children()}

	<div class="fixed right-4 bottom-4 z-50">
		{#each $notifications as toast (toast.id)}
			<Toast>
				{toast.message}
			</Toast>
		{/each}
	</div>
</ParaglideJS>
