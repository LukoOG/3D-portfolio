<script lang="ts">
	import { cubeState } from '$lib/states/cubeState.svelte';
	import type { Snippet } from 'svelte';
	let { children }: { children: Snippet } = $props();
</script>

{#if cubeState.isFacing}
	<div class="overlay">
		{@render children()}
	</div>
{/if}

<style>
  .overlay {
    position: fixed;
    inset: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: all;
    animation: fadein 0.3s ease;
  }

  @keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
</style>