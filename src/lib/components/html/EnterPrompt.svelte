<script lang="ts">
	import { cubeState, enterFace } from '$lib/states/cubeState.svelte';

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') enterFace();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if cubeState.mode == 'arrived'}
	<div class="prompt">
		<span class="key">Enter</span>
		<span class="label">or click the face</span>
	</div>
{/if}

<style>
  .prompt {
    position: fixed;
    bottom: 50%;
    left: 50%;
    translate: -50% 0;
    z-index: 50;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    animation: fadein 0.4s ease;
    pointer-events: none;
  }

  .key {
    font-size: 0.75rem;
    font-family: monospace;
    padding: 0.2rem 0.5rem;
    border: 1px solid rgba(255,255,255,0.3);
    border-radius: 4px;
    color: rgba(255,255,255,0.8);
    background: rgba(255,255,255,0.05);
    backdrop-filter: blur(4px);
  }

  .label {
    font-size: 0.75rem;
    color: rgba(255,255,255,0.4);
  }

  @keyframes fadein {
    from { opacity: 0; translate: -50% 6px; }
    to   { opacity: 1; translate: -50% 0; }
  }
</style>
