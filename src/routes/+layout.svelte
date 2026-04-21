<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Canvas } from '@threlte/core';
	import Scene from '$lib/components/scene/Scene.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<Scene />

<main>
	{@render children?.()}
</main>

<style>
	main {
		position: relative;
		z-index: 1;
		pointer-events: none;
	}
</style>
