<script lang="ts">
	type Props = {
		links: Array<{ href: string; label: string }>;
	};

	let { links }: Props = $props();
</script>

<footer class="m-5 rounded-lg bg-white shadow-sm dark:bg-gray-800">
	<div class="mx-auto w-full max-w-screen-xl p-5 md:flex md:items-center md:justify-between">
		<span class="text-sm text-zinc-200 sm:text-center dark:text-zinc-700"
			>© 2023 <a href="https://flowbite.com/" class="hover:underline">Flowbite™</a>. All Rights
			Reserved.
		</span>
		<ul
			class="mt-3 flex flex-wrap items-center text-sm font-medium text-gray-500 sm:mt-0 dark:text-gray-400"
		>
			{#each links as link}
				<li>
					<a href={link.href} class="me-4 hover:underline md:me-6">{link.label}</a>
				</li>
			{/each}
		</ul>
	</div>
</footer>
