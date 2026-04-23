<script lang="ts">
	import MarchingCubes from './lava/MarchingCubes.svelte';
	import MarchingPlane from './lava/MarchingPlane.svelte';
	import type { MarchingPlaneAxis } from './lava/types';
	import { Color } from 'three';
	import { MarchingCube } from './lava/MarchingCube';
	import { T, useTask } from '@threlte/core';

	type SceneProps = {
		ballCount?: number;
		isolation?: number;
		planeAxis: MarchingPlaneAxis;
		resolution: number;
	};

	let { ballCount = 5, isolation = 80, planeAxis = 'y', resolution = 50 }: SceneProps = $props();

	const randomColor = (): Color => {
		return new Color().setRGB(Math.random(), Math.random(), Math.random());
	};

	/**
	 * creates `count` randomly colored balls that are evenly distributed around a unit circle scaled by `scale`
	 */
	const createBalls = (count: number, scale = 0.5): MarchingCube[] => {
		const balls: MarchingCube[] = [];
		const m = (2 * Math.PI) / count;
		for (let i = 0; i < count; i += 1) {
			const ball = new MarchingCube(randomColor());
			const r = m * i;
			const x = Math.cos(r);
			const y = Math.sin(r);
			ball.position.set(x, 0, y).multiplyScalar(scale);
			balls.push(ball);
		}
		return balls;
	};

	const balls = $derived(createBalls(ballCount, 0.3));

	let time = 0;
	useTask((delta) => {
		time += delta;
		let i = 0;
		for (const ball of balls) {
			ball.position.setY(0.8 * Math.sin(time + i) + 0.5);
			i += 1;
		}
	});
</script>

<MarchingCubes position={[0, -2, -1]} scale={2} enableColors {resolution} {isolation}>
	<T.MeshStandardMaterial
		vertexColors
		roughness={0.15}
		metalness={0.6}
		emissive={'#050510'}
		emissiveIntensity={0.8}
	/>
	{#each balls as ball}
		<T is={ball} />
	{/each}
	<MarchingPlane scale={6} position={[0, -2, 0]} axis={planeAxis} />
</MarchingCubes>
