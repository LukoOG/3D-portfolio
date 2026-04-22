<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Canvas } from '@threlte/core';
	import Scene from '$lib/components/scene/Scene.svelte';
	import { navigateTo } from '$lib';
	import CubeNav from '$lib/components/layout/Nav.svelte';
	import EnterPrompt from '$lib/components/html/EnterPrompt.svelte';
	import FaceOverlay from '$lib/components/html/FaceOverlay.svelte';
	import Header from '$lib/components/layout/Header.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<Scene />
<EnterPrompt />

<main>
	<Header />
	<CubeNav />
	<FaceOverlay>
		{@render children?.()}
	</FaceOverlay>
</main>

<style>
	main {
		position: relative;
		z-index: 1;
		/* pointer-events: none; */
	}
</style>
