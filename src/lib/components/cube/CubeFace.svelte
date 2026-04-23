<script lang="ts">
	import { T } from '@threlte/core';
	import { cubeState, faceConfig, type FaceName } from '$lib/index';
	import { MeshBasicMaterial, MeshStandardMaterial } from 'three';
	import { interactivity } from '@threlte/extras';
	import type { Snippet } from 'svelte';

	let {
		face,
		isActive = false,
		children
	}: {
		face: FaceName;
		isActive?: boolean;
		children: Snippet
	} = $props();

	const config = $derived(faceConfig[face]);

	let material = $derived(
		new MeshStandardMaterial({
			color: config.color,
			emissive: config.color,
			emissiveIntensity: isActive ? 1 : 0.05,
			roughness: 0.4,
			metalness: 0.74
		})
	);

	function handleOnClick(e: MouseEvent) {
		console.log(cubeState.activeFace, face, faceConfig[face]);
		if (cubeState.mode == 'arrived' && cubeState.activeFace == face) {
			console.log(cubeState.mode, cubeState.activeFace);
			cubeState.mode = 'entered';
		}
	}

	interactivity();
</script>

<T.Mesh {material} onclick={handleOnClick}>
	<T.PlaneGeometry args={[2, 2]} />
	{@render children?.()}
</T.Mesh>
