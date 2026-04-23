<script lang="ts">
	import { Canvas, T } from '@threlte/core';
	import Cube from '../cube/Cube.svelte';
	import { OrbitControls } from '@threlte/extras';
	import CameraRig from './CameraRig.svelte';
	import Background from './Background.svelte';
	import Lights from './Lights.svelte';
	import LavaFloor from './LavaFloor.svelte';
	import type { MarchingPlaneAxis } from './lava/types';

	let ballCount = $state(30);
	let isolation = $state(30);
	let planeAxis = $state<MarchingPlaneAxis>('y');
	let resolution = $state(75);
</script>

<div class="scene-root">
	<Canvas renderMode="always">
		<CameraRig />
		<Lights />
		<Background />
		<Cube />
	</Canvas>
</div>

<style>
	.scene-root {
		width: 100vw;
		height: 100vh;
		position: fixed;
		inset: 0;
		z-index: 0;
	}
</style>
