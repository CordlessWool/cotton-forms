<script lang="ts" module>
	import BookOpenIcon from '@lucide/svelte/icons/book-open';
	import BotIcon from '@lucide/svelte/icons/bot';
	import ChartPieIcon from '@lucide/svelte/icons/chart-pie';
	import FrameIcon from '@lucide/svelte/icons/frame';
	import LifeBuoyIcon from '@lucide/svelte/icons/life-buoy';
	import MapIcon from '@lucide/svelte/icons/map';
	import SendIcon from '@lucide/svelte/icons/send';
	import Settings2Icon from '@lucide/svelte/icons/settings-2';
	import SquareTerminalIcon from '@lucide/svelte/icons/square-terminal';

	const data = {
		navMain: [
			{
				title: 'Dashboard',
				url: '#',
				icon: SquareTerminalIcon,
				isActive: true
			},
			{
				title: 'Models',
				url: '#',
				icon: BotIcon,
				items: [
					{
						title: 'Genesis',
						url: '#'
					},
					{
						title: 'Explorer',
						url: '#'
					},
					{
						title: 'Quantum',
						url: '#'
					}
				]
			},
			{
				title: 'Documentation',
				url: '#',
				icon: BookOpenIcon,
				items: [
					{
						title: 'Introduction',
						url: '#'
					},
					{
						title: 'Get Started',
						url: '#'
					},
					{
						title: 'Tutorials',
						url: '#'
					},
					{
						title: 'Changelog',
						url: '#'
					}
				]
			},
			{
				title: 'Settings',
				url: '#',
				icon: Settings2Icon,
				items: [
					{
						title: 'General',
						url: '#'
					},
					{
						title: 'Team',
						url: '#'
					},
					{
						title: 'Billing',
						url: '#'
					},
					{
						title: 'Limits',
						url: '#'
					}
				]
			}
		],
		navSecondary: [
			{
				title: 'Support',
				url: '#',
				icon: LifeBuoyIcon
			},
			{
				title: 'Feedback',
				url: '#',
				icon: SendIcon
			}
		]
	};
</script>

<script lang="ts">
	import NavMain from './nav-main.svelte';
	import NavProjects from './nav-projects.svelte';
	import NavSecondary from './nav-secondary.svelte';
	import NavUser from './nav-user.svelte';
	import * as Sidebar from '$lib/comp/ui/sidebar/index.js';
	import CommandIcon from '@lucide/svelte/icons/command';
	import type { ComponentProps } from 'svelte';

	type Props = {
		user: ComponentProps<typeof NavUser>['user'];
		nav: ComponentProps<typeof NavMain>['items'];
		forms: ComponentProps<typeof NavProjects>['projects'];
	} & ComponentProps<typeof Sidebar.Root>;
	let { ref = $bindable(null), user, nav, forms, ...restProps }: Props = $props();
</script>

<Sidebar.Root bind:ref variant="inset" {...restProps}>
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton size="lg">
					{#snippet child({ props })}
						<a href="##" {...props}>
							<div
								class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
							>
								<CommandIcon class="size-4" />
							</div>
							<div class="grid flex-1 text-left text-sm leading-tight">
								<span class="truncate font-medium">Acme Inc</span>
								<span class="truncate text-xs">Enterprise</span>
							</div>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>
	<Sidebar.Content>
		<NavMain items={nav} />
		<NavProjects label="Forms" projects={forms} />
		<NavSecondary items={data.navSecondary} class="mt-auto" />
	</Sidebar.Content>
	<Sidebar.Footer>
		<NavUser {user} />
	</Sidebar.Footer>
</Sidebar.Root>
