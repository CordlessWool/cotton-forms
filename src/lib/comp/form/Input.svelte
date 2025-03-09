<script>
	let { value = $bindable(), type = 'text', ...props } = $props();
</script>

<input bind:value {type} {...props} />

<style>
	@reference "tailwindcss/theme";
	input {
		all: unset;
		@apply w-full border-0 bg-transparent py-1;
		@apply outline-none focus:ring-0;
	}
</style>
