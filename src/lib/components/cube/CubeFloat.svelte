<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { type Snippet } from 'svelte';

	import { cubeState } from '$lib';

	let { children }: { children: Snippet } = $props();

	let bobY = $state<number>(0);
	let driftRotX = $state<number>(0);
	let driftRotY = $state<number>(0);
	let t = 0;

	useTask((delta) => {
		t += delta;
		let shouldDrift = cubeState.mode !== 'entered'
		bobY = Math.sin(t * 0.8) * 0.12;
		driftRotX = shouldDrift ? Math.sin(t * 0.8) * 0.9 : 0;
		driftRotY = shouldDrift ? Math.sin(t * 0.3) * 0.6 : 0;
	});
</script>

<T.Group position.y={bobY} rotation.y={driftRotY}>
	{@render children()}
</T.Group>
