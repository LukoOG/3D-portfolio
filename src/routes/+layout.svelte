<script lang="ts">
	import { browser } from '$app/environment';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import './layout.css';
	import favicon from '$lib/assets/favicon.png';
	import Scene from '$lib/components/scene/Scene.svelte';
	import Nav from '$lib/components/layout/Nav.svelte';
	import EnterPrompt from '$lib/components/html/EnterPrompt.svelte';
	import FaceOverlay from '$lib/components/html/FaceOverlay.svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import Hint from '$lib/components/html/Hint.svelte';
	import { TOKEN_MAP } from './secret/lib/tokens';
	import { cubeState, enterFace, markVisited, persist, progress } from '$lib';
	import { KEY } from './secret/lib/key';

	let { children } = $props();
	let firstVisit = $state(false);

	const TWO_WEEKS = 1000 * 60 * 60 * 24 * 14;
	const key = 'lastVisit';

	beforeNavigate((navigation) => {
		if (navigation.to?.url.pathname == '/secret' && !progress.keyFound) {
			navigation.cancel();
			cubeState.mode = 'idle';
		}
	});

	onMount(() => {
		const currentTimestamp = Date.now();
		const value = JSON.stringify(currentTimestamp);
		if (browser) {
			try {
				let lastVisitTimeStamp = JSON.parse(localStorage.getItem(key)!);

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

	$effect(() => {
		const currentPathName = page.url.pathname;
		const key = currentPathName as keyof typeof TOKEN_MAP;

		if (!(key in TOKEN_MAP)) return;

		markVisited(TOKEN_MAP[key]);
	});

	function handleKeyDown(e: KeyboardEvent) {
		if (cubeState.activeFace != 'secret') {
			if (e.key === KEY) {
				progress.keyFound = true;
				persist();
			}
			if (e.key === 'Enter') enterFace();
		}
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Sipe - Fullstack Developer</title>
</svelte:head>

<Scene />
<EnterPrompt {handleKeyDown} />

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
