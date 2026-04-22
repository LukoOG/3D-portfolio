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
		let shouldDrift = cubeState.mode !== 'entered';
		// bobY = shouldDrift ? Math.sin(t * 0.8) * 0.12 : 0;
		// driftRotX = shouldDrift ? Math.sin(t * 0.4) * 0.25 : (0 - driftRotX) * delta * 3;
		// driftRotY = shouldDrift ? Math.sin(t * 0.4) * 0.25 : (0 - driftRotY) * delta * 2;

		///uncommet if the cube should slowly go back to neutal
		if (shouldDrift) {
			t += delta;
			bobY = Math.sin(t * 0.8) * 0.12;
			driftRotY = Math.sin(t * 0.4) * 0.25;
		} else {
			// smoothly settle back to neutral
			bobY += (0 - bobY) * delta * 3;
			driftRotY += (0 - driftRotY) * delta * 2;
		}
	});
</script>

<T.Group position.y={bobY} rotation.y={driftRotY}>
	{@render children()}
</T.Group>
