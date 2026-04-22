<script lang="ts">
	import { T } from '@threlte/core';
	import { cubeState, faceConfig, type FaceName } from '$lib/index';
  import { MeshBasicMaterial, MeshStandardMaterial } from 'three';
  import { interactivity } from '@threlte/extras';

	let {
		face,
		isActive = false
	}: {
		face: FaceName;
		isActive?: boolean;
	} = $props();

const config = $derived(faceConfig[face]);
console.log(config)

  let material = $derived(
    new MeshStandardMaterial({
      color: config.color,
      emissive: config.color,
      emissiveIntensity: isActive ? 1 : 0.05,
      roughness: 0.4,
      metalness: 0.6,
    })
  )

  function handleOnClick (e: MouseEvent){
    if(cubeState.mode == 'arrived' && cubeState.activeFace == face){
      cubeState.mode = 'entered'
    }
  }

  interactivity()
</script>

<T.Mesh {material} onclick={handleOnClick}>
  <T.PlaneGeometry args={[2, 2]} />
</T.Mesh>