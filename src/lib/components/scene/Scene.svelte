<script lang="ts">
	import { Canvas, T } from '@threlte/core';
	import Cube from '../cube/Cube.svelte';
	import { OrbitControls } from '@threlte/extras';
</script>

<div class="scene-root">
	<Canvas renderMode="always">
		<T.PerspectiveCamera makeDefault position={[0, 0, 5]} fov={60} />
		
        <T.AmbientLight intensity={0.3} />
		<T.PointLight position={[3, 5, 3]} intensity={2} color="#000" />
		<T.PointLight position={[-3, -2, -3]} intensity={0.8} color="#4040ff" />

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
