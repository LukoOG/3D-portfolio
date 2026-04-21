<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { Canvas } from '@threlte/core';
	import Scene from '$lib/components/scene/Scene.svelte'

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<Scene />
<main>
	{@render children?.()}
</main>


<!-- <div class="scene-wrapper"> -->
	<Canvas>
		<Scene />
	</Canvas>


<style>
	.scene-wrapper {
		width: 100%;
		height: 100%;
		position: fixed;
		inset: 0;
		background: #050508;
	}
</style>