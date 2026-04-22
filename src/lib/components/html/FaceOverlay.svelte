<script lang="ts">
	import { cubeState, exitFace } from '$lib';
	import { getActiveFaceColor } from '$lib/states/cubeState.svelte';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
	let timer: ReturnType<typeof setTimeout>;
	let visible = $state<boolean>(false);
	let mounted = $state<boolean>(false);
	let faceColor = $state('#0a0a0f');

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') exitFace();
	}

	$effect(() => {
		if (cubeState.mode === 'entered') {
      mounted = true;
			timer = setTimeout(() => {
				faceColor = getActiveFaceColor();
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

<svelte:window onkeydown={handleKeydown} />

{#if mounted}
	<div class="overlay" class:visible style="--face-color: {faceColor}">
		<button class="close" onclick={exitFace}>✕</button>
		{#if visible}
			<div class="content">
				{@render children()}
			</div>
		{/if}
	</div>
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
		animation: fadein 0.4s ease 0.1s both;
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
		z-index: 1;
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
