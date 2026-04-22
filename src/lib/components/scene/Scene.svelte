<script lang="ts">
	import { Canvas, T } from '@threlte/core';
	import Cube from '../cube/Cube.svelte';
	import { OrbitControls } from '@threlte/extras';
	import CameraRig from './CameraRig.svelte';
	import Background from './Background.svelte';
	import Particles from './Particles.svelte';
	import Lights from './Lights.svelte';
</script>

<div class="scene-root">
	<Canvas renderMode="always">c
		<CameraRig />
		<Lights />
		<Background />
		<Particles />
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
