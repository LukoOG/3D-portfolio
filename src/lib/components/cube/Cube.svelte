<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { Quaternion, BoxGeometry, MeshStandardMaterial, Mesh, Group } from 'three';
	import { cubeState, getTargetQuaternion } from '$lib/index';
	import CubeFace from './CubeFace.svelte';
	import CubeFloat from './CubeFloat.svelte';
	import type { FaceName } from '$lib/index';
	import { FACE_OFFSET } from '$lib/utils/face';

	// The 6 faces in Three.js BoxGeometry order:
	// +X right, -X left, +Y top, -Y bottom, +Z front, -Z back
	const faces: {
		name: FaceName;
		position: [number, number, number];
		rotation: [number, number, number];
	}[] = [
		{ name: 'hero', position: [0, 0, FACE_OFFSET], rotation: [0, 0, 0] },
		{ name: 'projects', position: [FACE_OFFSET, 0, 0], rotation: [0, Math.PI / 2, 0] },
		{ name: 'skills', position: [-FACE_OFFSET, 0, 0], rotation: [0, -Math.PI / 2, 0] },
		{ name: 'about', position: [0, 0, -FACE_OFFSET], rotation: [0, Math.PI, 0] },
		{ name: 'contact', position: [0, FACE_OFFSET, 0], rotation: [-Math.PI / 2, 0, 0] },
		{ name: 'gallery', position: [0, -FACE_OFFSET, 0], rotation: [Math.PI / 2, 0, 0] }
	];

	const boxGeo = new BoxGeometry(2, 2, 2);
	const boxMat = new MeshStandardMaterial({
		color: '#0a0a0f',
		roughness: 0.3,
		metalness: 0.8
	});

	let currentQ = new Quaternion();
	// let targetQ = $derived(getTargetQuaternion());

	// Slerp speed — higher = snappier rotation
	const SLERP_SPEED = 3.5;

	let groupRef: any = $state(null);

	useTask((delta) => {
		if (!groupRef) return;
		const targetQ = getTargetQuaternion();
		//   console.log('active face:', cubeState.activeFace, 'targetQ:', targetQ);
		currentQ.slerp(targetQ, SLERP_SPEED * delta);
		groupRef.quaternion.copy(currentQ);

		const angle = currentQ.angleTo(targetQ);

		if (cubeState.mode === 'navigating' && angle < 0.05) {
			cubeState.mode = 'arrived';
			// console.log("cube state mode:", cubeState.mode)
		}
	});
</script>

<CubeFloat>
	<T.Group bind:ref={groupRef}>
		<!--Box shell-->
		<T.Mesh geometry={boxGeo} material={boxMat} />
		<!-- Face planes sitting 0.01 above each face surface -->
		{#each faces as face}
			<T.Group position={face.position} rotation={face.rotation}>
				<CubeFace face={face.name} isActive={cubeState.activeFace === face.name} />
			</T.Group>
		{/each}
	</T.Group>
</CubeFloat>
