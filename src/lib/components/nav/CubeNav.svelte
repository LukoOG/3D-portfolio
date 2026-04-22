<script lang="ts">
  import { faceConfig } from '$lib'
  import { cubeState, navigateTo } from '$lib/states/cubeState.svelte'
  import type { FaceName } from '$lib/utils/facePositions'

  // Keyboard shortcuts
  function handleKeydown(e: KeyboardEvent) {
    // ignore if user is typing in an input
    if (e.target instanceof HTMLInputElement) return
    const face = faces.find(f => f.shortcut === e.key)
    if (face) navigateTo(face.name)
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<nav class="cube-nav">
  <ul>
    {#each Object.entries(faceConfig) as [name, face]}
      <li>
        <button
          class:active={cubeState.activeFace === name}
          onclick={() => navigateTo(name)}
          aria-label={face.label}
          aria-current={cubeState.activeFace === name ? 'page' : undefined}
        >
          <face.icon />
          <span class="label">{face.label}</span>
        </button>
      </li>
    {/each}
  </ul>
</nav>

