<script lang="ts">
	import { T } from '@threlte/core';
	import { faceConfig, type FaceName } from '$lib/index';
  import { MeshBasicMaterial, MeshStandardMaterial } from 'three';

	let {
		face,
		isActive = false
	}: {
		face: FaceName;
		isActive?: boolean;
	} = $props();

const config = $derived(faceConfig[face]);

  let material = $derived(
    new MeshStandardMaterial({
      color: config.color,
      emissive: config.color,
      emissiveIntensity: isActive ? 1 : 0.05,
      roughness: 0.4,
      metalness: 0.6,
    })
  )
</script>

<T.Mesh {material}>
  <T.PlaneGeometry args={[2, 2]} />
</T.Mesh>