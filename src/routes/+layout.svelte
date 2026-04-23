<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.png';
	import { Canvas } from '@threlte/core';
	import Scene from '$lib/components/scene/Scene.svelte';
	import { navigateTo } from '$lib';
	import CubeNav from '$lib/components/layout/Nav.svelte';
	import EnterPrompt from '$lib/components/html/EnterPrompt.svelte';
	import FaceOverlay from '$lib/components/html/FaceOverlay.svelte';
	import Header from '$lib/components/layout/Header.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Sipe - Fullstack Developer</title>
</svelte:head>

<Scene />
<EnterPrompt />

<main>
	<div class="hint">Use keys 1-6 to rotate the cube</div>
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

	.hint {
		position: fixed;
		top: 6rem; /* Position just below the header */
		left: 50%;
		transform: translateX(-50%);
		font-size: 1rem;
		background: rgba(0, 0, 0, 0.8);
		color: white;
		padding: 10px;
		border-radius: 8px;
		animation: fadeinout 5s ease-in-out forwards;
		z-index: 1000; /* Ensure it sits on top of other content */
	}

	@keyframes fadeinout {
		0% {
			opacity: 0;
		}
		20% {
			opacity: 1;
		}
		80% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}

	/* Mobile responsive adjustments */
	@media (max-width: 480px) {
		.hint {
			display: none;
		}
	}
</style>
