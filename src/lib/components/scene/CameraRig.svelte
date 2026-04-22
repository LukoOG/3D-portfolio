<script lang="ts">
	import { T, useTask, useThrelte } from '@threlte/core';
	import { cubeState } from '$lib/states/cubeState.svelte';

	const { camera, size } = useThrelte();

	const IDLE_Z = 5;
	const ENTERED_Z = 2.05;
	const TWEEN_SPEED = 5;

	const getTargetFov = () => {
		return $size.width < 768 ? 80 : 60;
	};

	useTask((delta) => {
		const cam = $camera as any;
		if (!cam) return;

		const targetZ = cubeState.mode === 'entered' ? ENTERED_Z : IDLE_Z;
		const speed = cubeState.mode == 'entered' ? TWEEN_SPEED : 2;
		cam.position.z += (targetZ - cam.position.z) * speed * delta;

		const targetFov = getTargetFov();
		cam.fov += (targetFov - cam.fov) * TWEEN_SPEED * delta;
		cam.updateProjectionMatrix(); // required after changing fov
	});
</script>

<T.PerspectiveCamera makeDefault position={[0, 0, 5]} fov={60} />

