<script lang="ts">
	import { faceConfig } from '$lib';
	import { cubeState, navigateTo } from '$lib/states/cubeState.svelte';
	import type { FaceConfig } from '$lib/utils/faceConfig';
	import type { FaceName } from '$lib/utils/face';

	// Keyboard shortcuts
	function handleKeydown(e: KeyboardEvent) {
		// ignore if user is typing in an input
		if (e.target instanceof HTMLInputElement) return;
		const face = Object.entries(faceConfig).find(([name, face]) => face.shortcut == e.key) as
			| [FaceName, FaceConfig]
			| undefined;
		if (face) navigateTo(face[0], face[1].route);
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<nav class="cube-nav">
	<ul>
		{#each Object.entries(faceConfig) as [name, face]}
			{@const faceName = name as FaceName}
			{@const showHighlight = cubeState.activeFace === name && cubeState.mode !== 'idle'}
			<li>
				<button
					class:active={showHighlight}
					onclick={(e) => {
						navigateTo(faceName, face.route);
						e.currentTarget.blur();
					}}
					aria-label={face.label}
					aria-current={cubeState.activeFace === name ? 'page' : undefined}
				>
					<face.icon />
					<span class="label">{face.label}</span>
				</button>
			</li>
		{/each}
	</ul>
</nav>

<style>
	.cube-nav {
		position: fixed;
		bottom: 2rem;
		left: 50%;
		translate: -50% 0;
		z-index: 10;
	}

	ul {
		display: flex;
		gap: 0.25rem;
		list-style: none;
		margin: 0;
		padding: 0.4rem;
		background: rgba(5, 5, 8, 0.6);
		border: 1px solid rgba(0, 255, 225, 0.12);
		border-radius: 999px;
		backdrop-filter: blur(12px);
	}

	button {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.15rem;
		padding: 0.5rem 0.85rem;
		border: 1px solid transparent;
		border-radius: 999px;
		background: transparent;
		color: rgba(255, 255, 255, 0.4);
		cursor: pointer;
		transition: all 0.2s ease;
		font-family: inherit;
	}

	button:hover {
		color: rgba(255, 255, 255, 0.85);
		background: rgba(0, 255, 225, 0.06);
		border-color: rgba(0, 255, 225, 0.2);
	}

	button.active {
		color: #00ffe1;
		background: rgba(0, 255, 225, 0.1);
		border-color: rgba(0, 255, 225, 0.35);
	}

	.icon {
		font-size: 1rem;
		line-height: 1;
	}

	.label {
		font-size: 0.6rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		font-weight: 500;
	}

	/* Mobile — tighter padding */
	@media (max-width: 480px) {
		.cube-nav {
			bottom: 1.25rem;
			width: calc(100% - 2rem);
		}

		ul {
			justify-content: space-around;
			width: 100%;
			border-radius: 1rem;
		}

		button {
			padding: 0.5rem 0.5rem;
			flex: 1;
		}

		.label {
			font-size: 0.55rem;
		}
	}
</style>
