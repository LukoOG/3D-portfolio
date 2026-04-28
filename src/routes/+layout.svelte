<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import './layout.css';
	import favicon from '$lib/assets/favicon.png';
	import { Canvas } from '@threlte/core';
	import Scene from '$lib/components/scene/Scene.svelte';
	import { navigateTo } from '$lib';
	import Nav from '$lib/components/layout/Nav.svelte';
	import EnterPrompt from '$lib/components/html/EnterPrompt.svelte';
	import FaceOverlay from '$lib/components/html/FaceOverlay.svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import Hint from '$lib/components/html/Hint.svelte';

	let { children } = $props();
	let firstVisit = $state(false);

	const TWO_WEEKS = 1000 * 60 * 60 * 24 * 14;
	const key = 'lastVisit';

	onMount(() => {
		const currentTimestamp = Date.now();
		const value = JSON.stringify(currentTimestamp)
		if (browser) {
			try {
				let lastVisitTimeStamp = JSON.parse(localStorage.getItem(key));

				//First time visit or First visit in a long time
				if (!lastVisitTimeStamp || currentTimestamp - lastVisitTimeStamp > TWO_WEEKS) {
					firstVisit = true;
					localStorage.setItem(key, value);
				} else {
					localStorage.setItem(key, value);
				}
			} catch (e) {
				console.error(e);
			}
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Sipe - Fullstack Developer</title>
</svelte:head>

<Scene />
<EnterPrompt />

<main>
	<Hint visible={firstVisit} />
	<Header />
	<Nav />
	<FaceOverlay>
		{@render children?.()}
	</FaceOverlay>
</main>

<style>
	main {
		position: relative;
		z-index: 1;
		/* pointer-events: none; */
		/* box-sizing: content-box; */
	}
</style>
