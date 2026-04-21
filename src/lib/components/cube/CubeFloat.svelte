<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { type Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();

	let bobY = $state<number>(0);
		let driftRotX = $state<number>(0);
	let driftRotY = $state<number>(0);
	let t = 0;

	useTask((delta) => {
		t += delta;

		bobY = Math.sin(t * 0.8) * 0.12;
		driftRotX = Math.sin(t * 0.8) * 0.2;
		driftRotY = Math.sin(t * 0.3) * 0.04;
	});
</script>

<T.Group position.y={bobY} rotation.y={driftRotY} rotation.x={driftRotX}>
	{@render children()}
</T.Group>
