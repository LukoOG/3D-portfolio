<script lang="ts">
  import { ExternalLink, GitBranchPlus as Github } from '@lucide/svelte'
  import { projects } from '$lib';
</script>

<div class="projects-root">
  <div class="page-header">
    <h2 class="page-title">Projects</h2>
    <span class="count">{projects.length} works</span>
  </div>

  <div class="list">
    {#each projects as project, i}
      <article
        class="card"
        style="animation-delay: {0.1 + i * 0.08}s"
      >
        <div class="card-top">
          <div class="meta">
            <span class="category">{project.category}</span>
            {#if project.status === 'in-progress'}
              <span class="badge">In progress</span>
            {/if}
          </div>
          <span class="year">{project.year}</span>
        </div>

        <div class="card-body">
          <h3 class="name">{project.name}</h3>
          <p class="description">{project.description}</p>
        </div>

        <div class="card-footer">
          <div class="pills">
            {#each project.stack as tech}
              <span class="pill">{tech}</span>
            {/each}
          </div>

          <div class="links">
            <a href={project.github} target="_blank" rel="noopener" class="link" aria-label="GitHub">
              <Github size={14} />
            </a>
            {#if project.status !== 'in-progress'}
              <a href={project.live} target="_blank" rel="noopener" class="link" aria-label="Live site">
                <ExternalLink size={14} />
              </a>
            {/if}
          </div>
        </div>
      </article>
    {/each}
  </div>
</div>

<style>
  .projects-root {
    width: 100%;
    min-height: 100%;
    padding: 2rem 1.75rem 3rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

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

  /* cards */
  .list {
    display: flex;
    flex-direction: column;
    gap: 1px; /* hairline dividers via gap on dark bg */
  }

  .card {
    padding: 1.25rem 0;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    opacity: 0;
    animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
    transition: background 0.2s;
    border-radius: 6px;
    padding-inline: 0.5rem;
    cursor: default;
  }

  .card:hover {
    background: rgba(255,255,255,0.03);
  }

  .card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .meta {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .category {
    font-size: 0.6rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: rgba(255,255,255,0.3);
  }

  .badge {
    font-size: 0.55rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    padding: 0.15rem 0.45rem;
    border-radius: 999px;
    border: 1px solid rgba(250, 204, 21, 0.3);
    color: rgba(250, 204, 21, 0.7);
    background: rgba(250, 204, 21, 0.05);
  }

  .year {
    font-size: 0.6rem;
    color: rgba(255,255,255,0.2);
    letter-spacing: 0.08em;
  }

  .card-body {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .name {
    font-size: 1.1rem;
    font-weight: 300;
    letter-spacing: -0.01em;
    color: rgba(255,255,255,0.9);
    margin: 0;
  }

  .description {
    font-size: 0.72rem;
    line-height: 1.6;
    color: rgba(255,255,255,0.4);
    margin: 0;
  }

  .card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.25rem;
  }

  .pills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
  }

  .pill {
    font-size: 0.6rem;
    padding: 0.15rem 0.5rem;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 999px;
    color: rgba(255,255,255,0.35);
    letter-spacing: 0.04em;
  }

  .links {
    display: flex;
    gap: 0.6rem;
  }

  .link {
    color: rgba(255,255,255,0.3);
    transition: color 0.2s;
    display: flex;
    align-items: center;
  }

  .link:hover {
    color: rgba(255,255,255,0.8);
  }

  @keyframes slide-up {
    from { opacity: 0; translate: 0 8px; }
    to   { opacity: 1; translate: 0 0;   }
  }
</style>