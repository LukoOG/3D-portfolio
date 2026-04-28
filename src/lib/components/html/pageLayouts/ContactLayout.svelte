<script lang="ts">
  import type { Snippet } from 'svelte'
  let { children }: { children: Snippet } = $props()
</script>

<div class="contact-layout">
  <div class="contact-inner">
    {@render children()}
  </div>
</div>

<style>
  .contact-layout {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    color: white;
    display: flex;
    flex-direction: column;
  }

  .contact-inner {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>