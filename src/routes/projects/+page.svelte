<script lang="ts">
	import { projects } from '$lib';
	import ProjectsPage from '$lib/components/html/pageLayouts/ProjectsLayout.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
</script>

<!-- /projects/+page.svelte -->
<ProjectsPage>
  <div class="page-header">
    <h2 class="page-title">Projects</h2>
    <span class="count">{projects.length} works</span>
  </div>

  <div class="grid">
    {#each projects as project, i}
      <ProjectCard {project} {i} />
    {/each}
  </div>
</ProjectsPage>

<style>
  .page-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
  }

  .page-title {
    font-size: 1rem;
    font-weight: 300;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.9);
    margin: 0;
  }

  .count {
    font-size: 0.65rem;
    color: rgba(255,255,255,0.25);
    letter-spacing: 0.08em;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.85rem;
  }

  /* first card spans full width as a featured project */
  .grid :global(.card:first-child) {
    grid-column: 1 / -1;
  }

  /* on that featured card, show image taller */
  .grid :global(.card:first-child .card-image) {
    aspect-ratio: 21 / 9;
  }

  @keyframes slide-up {
    from { opacity: 0; translate: 0 8px; }
    to   { opacity: 1; translate: 0 0;   }
  }
</style>