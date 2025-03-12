<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import { Sidebar, SidebarItem, ToggleTheme, SidebarList } from '$lib/comp/layout';
	import { Button } from '$lib/comp/form';
	import { Plus } from 'lucide-svelte';
	type Props = {
		data: LayoutData;
		children: Snippet;
	};

	const { children, data }: Props = $props();
</script>

<div class="layout">
	<Sidebar>
		<SidebarList>
			{#each data.forms as form (form.id)}
				<SidebarItem href="/form/{form.id}">{form.name}</SidebarItem>
			{/each}
		</SidebarList>
		<SidebarList separate>
			<SidebarItem href="/">Overview</SidebarItem>
			<SidebarItem href="/forms">Forms</SidebarItem>
			<SidebarItem href="/api-keys">API Keys</SidebarItem>
		</SidebarList>
		<ToggleTheme />
	</Sidebar>
	{@render children()}
</div>

<style lang="postcss">
	@reference 'tailwindcss/theme'

	:global(body) {
		@apply h-full p-0;
	}

	.layout {
		display: grid;
		grid-template-columns: auto 1fr;
		flex-direction: row;
		@apply box-border h-screen w-screen gap-5 p-3;
	}
</style>
