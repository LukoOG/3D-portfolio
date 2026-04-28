<script lang="ts">
  import type { Snippet } from 'svelte'
  let { children }: { children: Snippet } = $props()
</script>

<div class="secret-layout">
  {@render children()}
</div>

<style>
  .secret-layout {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    color: white;
  }
</style>