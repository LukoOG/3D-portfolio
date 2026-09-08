<script lang="ts">
	import { cubeState, exitFace } from '$lib';
	import { getActiveFaceColor } from '$lib/states/cubeState.svelte';
	import type { Snippet } from 'svelte';
	import { page } from '$app/state';
	import { visitedPortfolio } from '../../../routes/secret/lib/secret.svelte';

	type HideElement = 'none' | 'block'

	let { children }: { children: Snippet } = $props();
	let timer: ReturnType<typeof setTimeout>;
	let visible = $state<boolean>(false);
	let mounted = $state<boolean>(false);
	let faceColor = $derived(getActiveFaceColor());
	let glowRef: HTMLDivElement = $state(null)!;
	let glowClientX = $state<number>(0);
	let glowClientY = $state<number>(0);

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') exitFace();
	}

	function handleMouseMove(e: MouseEvent) {
		glowClientX = e.clientX
		glowClientY = e.clientY
	}

	function showGlow(): HideElement {
		if(page.route.id == "/secret" && !visitedPortfolio) return "block"
		return "none"
	}

	// $inspect(cubeState.activeFace, faceColor)
	$effect(() => {
		if (cubeState.mode === 'entered') {
			mounted = true;
			timer = setTimeout(() => {
				visible = true;
			}, 450);
		} else if (mounted) {
			clearTimeout(timer);
			visible = false;

			timer = setTimeout(() => {
				mounted = false;
			}, 650);
		}
	});
</script>

<svelte:window onmousemove={handleMouseMove} onkeydown={handleKeydown} />

{#if mounted}
	<div class="overlay" class:visible style="--face-color: {faceColor}">
		<button class="close" onclick={exitFace}>✕</button>
		{#if visible}
			<div class="content">
				{@render children()}
			</div>
		{/if}
	</div>
	<div class="cursor-glow" style:display={showGlow()} style={`transform: translate(${glowClientX}px, ${glowClientY}px) translate(-50%, -50%)`} bind:this={glowRef}></div>
{/if}


<style>
	.overlay {
		position: fixed;
		inset: 0;
		z-index: 10;
		pointer-events: all;
		/* starts as the face color — no visible seam */
		background: var(--face-color);
		/* fades in as camera zooms */
		opacity: 0;
		transition: opacity 0.6s ease;
	}

	.overlay.visible {
		opacity: 1;
	}

	.content {
		width: 100%;
		height: 100%;
		overflow-x: hidden;
		overflow-y: auto;
		display: flex;
		align-items: center;
		justify-content: center;
		/* animation: fadein 0.4s ease 0.1s both; */
	}

	.cursor-glow {
		position: fixed;
		top: 0;
		left: 0;
		width: 400px;
		height: 400px;
		background: radial-gradient(circle, rgba(255, 255, 255, 0.125), transparent 80%);
		border-radius: 50%;
		pointer-events: none;
		z-index: 9999;
		filter: blur(2px);
		transition: opacity 0.3s ease;
	}

	.close {
		position: absolute;
		top: 1.5rem;
		right: 1.5rem;
		background: none;
		border: 1px solid rgba(255, 255, 255, 0.2);
		color: rgba(255, 255, 255, 0.6);
		border-radius: 50%;
		width: 2rem;
		height: 2rem;
		cursor: pointer;
		font-size: 0.875rem;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10;
	}

	.close:hover {
		background: rgba(255, 255, 255, 0.1);
		color: white;
	}

	@keyframes fadein {
		from {
			opacity: 0;
			translate: 0 8px;
		}
		to {
			opacity: 1;
			translate: 0 0;
		}
	}
</style>
