<script lang="ts">
	import { T, useTask, useThrelte } from '@threlte/core';
    import { cubeState } from '$lib/states/cubeState.svelte';

	const { camera } = useThrelte();

	const IDLE_Z = 5;
	const ENTERED_Z = 2.05;
	const TWEEN_SPEED = 5;

	useTask((delta) => {
		const cam = $camera;
		if (!cam) return;

		const targetZ = cubeState.mode === 'entered' ? ENTERED_Z : IDLE_Z;
		cam.position.z += (targetZ - cam.position.z) * TWEEN_SPEED * delta;
	});
</script>

<T.PerspectiveCamera makeDefault position={[0, 0, 5]} fov={60} />
