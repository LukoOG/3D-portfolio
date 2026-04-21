<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { MeshRefractionMaterial } from '@threlte/extras'
  import { Quaternion } from 'three'
  import { cubeState, getTargetQuaternion } from '$lib/states/cubeState.svelte'
  import * as THREE from 'three'

  let meshRef = $state<THREE.Mesh | undefined>(undefined)
  let currentQ = new Quaternion()
  let floatY = $state(0)
  let time = 0

  useTask((delta) => {
    if (!meshRef) return
    const speed = 1 - Math.pow(0.01, delta)
    const target = getTargetQuaternion()
    currentQ.slerpQuaternions(currentQ, target, speed)
    meshRef.quaternion.copy(currentQ)
  })

  useTask((delta) => {
    time += delta
    floatY = Math.sin(time * 0.6) * 0.08
  })
</script>

<T.Group position.y={floatY}>
  <T.Mesh bind:ref={meshRef}>
    <T.BoxGeometry args={[2.8, 2.8, 2.8]} />
    <T.MeshStandardMaterial
      backside
      samples={8}
      thickness={0.2}
      chromaticAberration={0.04}
      iridescence={0.3}
      roughness={0.05}
      toneMapped={false}
      color="#0a0a12"
      attenuationColor="#00ffe1"
      attenuationDistance={0.5}
    />
  </T.Mesh>
</T.Group>