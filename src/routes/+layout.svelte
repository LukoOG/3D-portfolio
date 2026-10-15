<script lang="ts">
	import { browser } from '$app/environment';
	import { beforeNavigate, goto } from '$app/navigation';
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
	import { cubeState, enterFace, hydrate, markVisited, nudgeLocked, persist, progress } from '$lib';
	import { getKey } from './secret/lib/key.svelte';
	import { getMeta } from '$lib/utils/meta';
	import type { FaceName } from '$lib/utils/face';

	let { children } = $props();

	let meta = $derived(getMeta(page.url.pathname, page.data));

	// first path segment → the cube face that hosts it
	const ROUTE_FACES: Record<string, FaceName> = {
		projects: 'projects',
		about: 'about',
		contact: 'contact',
		lab: 'lab',
		secret: 'secret'
	};

	/** A shared link like /projects/snapr should open that page, not park on the cube. */
	function openFaceFromUrl() {
		const face = ROUTE_FACES[page.url.pathname.split('/')[1]];
		if (!face) return; // the home URL keeps the cube as its intro

		if (face === 'secret' && !progress.cipherSolved) {
			if (progress.keyFound) {
				// they know the way in: turn to the face so the cipher prompt shows
				cubeState.activeFace = 'secret';
				cubeState.mode = 'navigating';
			} else {
				goto('/', { replaceState: true });
			}
			return;
		}

		cubeState.activeFace = face;
		cubeState.mode = 'entered'; // zooms in from the cube, so the transition still plays
	}
	let firstVisit = $state(false);
	let isMobile = $state(false);

	const TWO_WEEKS = 1000 * 60 * 60 * 24 * 14;
	const key = 'lastVisit';

	beforeNavigate((navigation) => {
		if (navigation.to?.url.pathname == '/secret' && !progress.keyFound) {
			navigation.cancel();
			cubeState.mode = 'idle';
			nudgeLocked();
		}
	});

	onMount(() => {
		hydrate(); //populate progress state on mount
		openFaceFromUrl();
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

		isMobile = window.matchMedia('(max-width: 768px)').matches;
	});

	$effect(() => {
		const currentPathName = page.url.pathname;
		const key = currentPathName as keyof typeof TOKEN_MAP;

		if (!(key in TOKEN_MAP)) return;

		markVisited(TOKEN_MAP[key]);
	});

	function handleKeyDown(e: KeyboardEvent) {
		if (cubeState.activeFace != 'secret' || progress.cipherSolved) {
			if (e.key === getKey()) {
				progress.keyFound = true;
				persist();
			}
			if (e.key === 'Enter') enterFace();
		}
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>{meta.title}</title>
	<meta name="description" content={meta.description} />
	<link rel="canonical" href={meta.url} />

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={meta.siteName} />
	<meta property="og:title" content={meta.title} />
	<meta property="og:description" content={meta.description} />
	<meta property="og:url" content={meta.url} />
	<meta property="og:image" content={meta.image.url} />
	{#if meta.image.width}
		<meta property="og:image:width" content={String(meta.image.width)} />
		<meta property="og:image:height" content={String(meta.image.height)} />
	{/if}
	<meta property="og:image:alt" content={meta.image.alt} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content={meta.handle} />
	<meta name="twitter:creator" content={meta.handle} />
	<meta name="twitter:title" content={meta.title} />
	<meta name="twitter:description" content={meta.description} />
	<meta name="twitter:image" content={meta.image.url} />
	<meta name="twitter:image:alt" content={meta.image.alt} />
</svelte:head>

<Scene />
<EnterPrompt {handleKeyDown} />

<main>
	<Hint visible={firstVisit} />
	<Header />
	<Nav {isMobile} />
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
