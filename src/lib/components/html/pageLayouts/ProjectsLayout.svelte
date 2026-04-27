<script lang="ts">
	import { type Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div class="projects-root">
	{@render children?.()}
</div>

<style>
	.projects-root {
		position: relative;
		width: 100%;
		min-height: 90%;
		padding: 2rem 1.75rem 3rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}
</style>
