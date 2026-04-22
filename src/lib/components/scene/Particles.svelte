<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { BufferGeometry, BufferAttribute, PointsMaterial, Float32BufferAttribute } from 'three';

	const COUNT = 90;
	const positions = new Float32Array(COUNT * 3);

	for (let i = 0; i < COUNT; i++) {
		const i3 = i * 3;
		positions[i3] = (Math.random() - 0.5) * 20;
		positions[i3 + 1] = (Math.random() - 0.5) * 20;
		positions[i3 + 2] = (Math.random() - 0.5) * 20;
	}

	const geometry = new BufferGeometry();
	geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));

	const material = new PointsMaterial({
		color: '#ffffff',
		size: 0.03,
		transparent: true,
		opacity: 0.4,
		sizeAttenuation: true
	});

	let pointsRef: any = $state(null);
	let t = 0;

	useTask((delta) => {
        if(!pointsRef) return;
        t += delta
        pointsRef.rotation.x += t * 0.01
        pointsRef.rotation.y += t * 0.007
    });
</script>

<T.Points {geometry} {material} bind:ref={pointsRef} />
