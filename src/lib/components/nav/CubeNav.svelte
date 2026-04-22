<script lang="ts">
	import { faceConfig } from '$lib';
	import { cubeState, navigateTo } from '$lib/states/cubeState.svelte';
	import type { FaceConfig } from '$lib/utils/faceConfig';
	import type { FaceName } from '$lib/utils/facePositions';

	// Keyboard shortcuts
	function handleKeydown(e: KeyboardEvent) {
		// ignore if user is typing in an input
		if (e.target instanceof HTMLInputElement) return;
		const face = Object.entries(faceConfig).find(([name, face]) => face.shortcut == e.key) as
			| [FaceName, FaceConfig]
			| undefined;
		if (face) navigateTo(face[0]);
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<nav class="cube-nav">
	<ul>
		{#each Object.entries(faceConfig) as [name, face]}
			{@const faceName = name as FaceName}
			<li>
				<button
					class:active={cubeState.activeFace === name}
					onclick={() => {navigateTo(faceName)}}
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
