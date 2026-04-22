<script lang="ts">
	import { Canvas, T } from '@threlte/core';
	import Cube from '../cube/Cube.svelte';
	import { OrbitControls } from '@threlte/extras';
</script>

<div class="scene-root">
	<Canvas renderMode="always">
		<T.PerspectiveCamera makeDefault position={[0, 0, 5]} fov={60} />
		
        <T.AmbientLight intensity={0.6} />
		<T.PointLight position={[0, 0, 5]} intensity={80} color="#fff" />
		<T.PointLight position={[0, 0, -5]} intensity={80} color="#4ff" />
		<T.PointLight position={[5, 0, 0]} intensity={80} color="#4ff" />
		<T.PointLight position={[-5, 0, 0]} intensity={80} color="#fff" />

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
