<script lang="ts">
	const {
		children,
		transparent = false,
		inline = false,
		error = false,
		danger = false,
		disabled = false,
		...props
	} = $props();
</script>

<button
	disabled={error === true || disabled === true}
	class:error
	class:danger
	class:transparent={transparent || inline}
	class:inline
	{...props}
>
	{@render children()}
</button>

<style lang="postcss">
	@reference "tailwindcss/theme";

	button {
		@apply flex flex-row items-center justify-center gap-2 text-nowrap;
		@apply cursor-pointer px-3 py-2;
		@apply rounded-md focus:ring-2 focus:ring-teal-600 focus:outline-none;
	}

	/* button :global(svg) {
		height: 1.615em;
		width: 1.615em;
	} */

	button.inline {
		@apply mx-1 inline rounded-xs p-0;
	}

	button:enabled {
		@apply transform transition-all duration-300 ease-in-out hover:scale-105;
	}

	button:not(.transparent) {
		@apply bg-teal-400 shadow-md;

		&.danger {
			@apply bg-red-400;
		}

		&:enabled {
			@apply hover:bg-teal-500;
		}
	}

	button.transparent {
		@apply bg-transparent text-teal-700;

		&.danger {
			@apply text-red-700;
		}

		&:enabled {
			@apply hover:text-teal-800;
		}
	}

	:global(.dark) {
		button:not(.transparent) {
			@apply bg-teal-800 hover:bg-teal-700;

			&:enabled {
				@apply hover:bg-teal-700;
			}

			&.danger {
				@apply bg-red-700 hover:bg-red-600;
			}
		}

		button.transparent {
			@apply text-teal-600;

			&:enabled {
				@apply hover:text-teal-500;
			}

			&.danger {
				@apply text-red-400;
			}
		}
	}
</style>
