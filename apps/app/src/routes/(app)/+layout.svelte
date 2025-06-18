<script lang="ts">
	import type { Snippet } from 'svelte';
	import AppSidebar from '$lib/comp/app-sidebar.svelte';
	import * as Breadcrumb from '$lib/comp/ui/breadcrumb/index.js';
	import { Separator } from '$lib/comp/ui/separator/index.js';
	import * as Sidebar from '$lib/comp/ui/sidebar/index.js';
	import type { LayoutData } from './$types';
	import type { FormDefinition } from '$core/models';
	import { ClipboardType, ClipboardPlus, LayoutDashboard } from '@lucide/svelte';

	type Props = {
		data: LayoutData;
		children: Snippet;
	};

	const nav = [
		{
			title: 'Dashboard',
			url: '/',
			icon: LayoutDashboard
		},
		{
			title: 'New Form',
			url: '/forms/new',
			icon: ClipboardPlus
		}
	];

	const transformFormToNavItem = (form: FormDefinition) => {
		return {
			name: form.name || form.key,
			url: `/app/forms/${form.id}`,
			icon: ClipboardType
		};
	};

	const { children, data }: Props = $props();
</script>

<Sidebar.Provider>
	<AppSidebar user={data.user} forms={data.forms.map(transformFormToNavItem)} {nav} />
	<Sidebar.Inset>
		<header class="flex h-16 shrink-0 items-center gap-2">
			<div class="flex items-center gap-2 px-4">
				<Sidebar.Trigger class="-ml-1" />
				<Separator orientation="vertical" class="mr-2 data-[orientation=vertical]:h-4" />
				<Breadcrumb.Root>
					<Breadcrumb.List>
						<Breadcrumb.Item class="hidden md:block">
							<Breadcrumb.Link href="#">Building Your Application</Breadcrumb.Link>
						</Breadcrumb.Item>
						<Breadcrumb.Separator class="hidden md:block" />
						<Breadcrumb.Item>
							<Breadcrumb.Page>Data Fetching</Breadcrumb.Page>
						</Breadcrumb.Item>
					</Breadcrumb.List>
				</Breadcrumb.Root>
			</div>
		</header>
		<!-- <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
			<div class="grid auto-rows-min gap-4 md:grid-cols-3">
				<div class="bg-muted/50 aspect-video rounded-xl"></div>
				<div class="bg-muted/50 aspect-video rounded-xl"></div>
				<div class="bg-muted/50 aspect-video rounded-xl"></div>
			</div>
			<div class="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min"></div>
		</div> -->
		{@render children()}
	</Sidebar.Inset>
</Sidebar.Provider>
