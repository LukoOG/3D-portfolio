<script lang="ts">
  import { browser } from '$app/environment'
  import { Canvas } from '@threlte/core'
  import { T } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
  import CubeMesh from './CubeMesh.svelte'
  import CubeNav from '$lib/components/nav/CubeNav.svelte'
</script>

{#if browser}
  <div class="scene-wrapper">
    <Canvas>
      <T.PerspectiveCamera makeDefault position={[0, 0, 4.5]} fov={50}>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.08}
        />
      </T.PerspectiveCamera>

      <T.AmbientLight intensity={0.3} />
      <T.DirectionalLight position={[5, 5, 5]} intensity={1.2} color="#a0c4ff" />
      <T.PointLight position={[-4, -2, -4]} intensity={8} color="#00ffe1" distance={20} />
      <T.PointLight position={[0, -5, 0]} intensity={3} color="#7b2fff" distance={15} />

      <CubeMesh />
    </Canvas>

    <!-- Lives outside Canvas — regular DOM overlay -->
    <CubeNav />
  </div>
{/if}

<style>
  .scene-wrapper {
    width: 100%;
    height: 100%;
    position: fixed;
    inset: 0;
    background: #050508;
  }
</style>