<!-- src/routes/lab/+page.svelte -->
<script lang="ts">
  import LabPage from '$lib/components/html/pageLayouts/ProjectsLayout.svelte'
  import { ExternalLink, GitBranch as Github, Terminal, Palette, Wrench, Package } from '@lucide/svelte'

  type LabCategory = 'generative' | 'cli' | 'opensource' | 'experiment'

  interface LabItem {
    name: string
    description: string
    category: LabCategory
    tags: string[]
    github?: string
    live?: string
    wip?: boolean
  }

  const categoryMeta: Record<LabCategory, { label: string; icon: any; color: string }> = {
    generative: { label: 'Generative',   icon: Palette,  color: '#e879f9' },
    cli:        { label: 'CLI Tool',      icon: Terminal, color: '#34d399' },
    opensource: { label: 'Open Source',  icon: Package,  color: '#60a5fa' },
    experiment: { label: 'Experiment',   icon: Wrench,   color: '#fb923c' },
  }

  const items: LabItem[] = [
    {
      name: 'Experiment 001',
      description: 'A generative art piece exploring noise fields and particle systems. Replace this with your actual experiment.',
      category: 'generative',
      tags: ['canvas', 'noise', 'animation'],
      live: 'https://',
      github: 'https://github.com/',
      wip: true,
    },
    {
      name: 'CLI Tool 001',
      description: 'A command line utility that does something useful. Replace this description with your actual tool.',
      category: 'cli',
      tags: ['python', 'cli', 'automation'],
      github: 'https://github.com/',
    },
    {
      name: 'OSS Contribution',
      description: 'A contribution to an open source project. Describe what you fixed or added.',
      category: 'opensource',
      tags: ['typescript', 'open-source'],
      github: 'https://github.com/',
    },
    {
      name: 'Throwaway 001',
      description: 'A small throwaway project built over a weekend to try out a new technology or idea.',
      category: 'experiment',
      tags: ['rust', 'wasm'],
      github: 'https://github.com/',
      wip: true,
    },
  ]
</script>

<LabPage>
  <div class="lab-root">

    <div class="page-header">
      <div class="header-left">
        <h2 class="page-title">Lab</h2>
        <p class="page-sub">
          Where things get weird. Experiments, tools, generative art,
          and anything that doesn't fit neatly elsewhere.
        </p>
      </div>
      <span class="count">{items.length} experiments</span>
    </div>

    <!-- category legend -->
    <div class="legend">
      {#each Object.entries(categoryMeta) as [key, meta]}
        <div class="legend-item">
          <svelte:component this={meta.icon} size={11} color={meta.color} />
          <span style="color: {meta.color}">{meta.label}</span>
        </div>
      {/each}
    </div>

    <!-- lab grid -->
    <div class="lab-grid">
      {#each items as item, i}
        {@const meta = categoryMeta[item.category]}
        <article
          class="lab-card"
          style="animation-delay: {0.1 + i * 0.07}s; --accent: {meta.color}"
        >
          <!-- top bar with category color -->
          <div class="card-accent" />

          <div class="card-inner">
            <div class="card-header">
              <div class="card-icon">
                <svelte:component this={meta.icon} size={13} color={meta.color} />
              </div>
              <div class="card-meta">
                <span class="card-category" style="color: {meta.color}">{meta.label}</span>
                {#if item.wip}
                  <span class="wip-badge">WIP</span>
                {/if}
              </div>
            </div>

            <div class="card-body">
              <h3 class="card-name">{item.name}</h3>
              <p class="card-desc">{item.description}</p>
            </div>

            <div class="card-footer">
              <div class="tags">
                {#each item.tags as tag}
                  <span class="tag">{tag}</span>
                {/each}
              </div>

              <div class="card-links">
                {#if item.github}
                  <a href={item.github} target="_blank" rel="noopener" class="card-link">
                    <Github size={12} />
                  </a>
                {/if}
                {#if item.live}
                  <a href={item.live} target="_blank" rel="noopener" class="card-link">
                    <ExternalLink size={12} />
                  </a>
                {/if}
              </div>
            </div>
          </div>
        </article>
      {/each}
    </div>

    <!-- empty state for future items -->
    <div class="more-soon">
      <span>More experiments incoming</span>
      <div class="dots">
        <span /><span /><span />
      </div>
    </div>

  </div>
</LabPage>

<style>
  .lab-root {
    width: 100%;
    min-height: 100%;
    padding: 2rem 1.75rem 3rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  /* header */
  .page-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
  }

  .header-left {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .page-title {
    font-size: 1rem;
    font-weight: 300;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.9);
    margin: 0;
  }

  .page-sub {
    font-size: 0.68rem;
    color: rgba(255,255,255,0.3);
    margin: 0;
    line-height: 1.5;
    max-width: 32ch;
  }

  .count {
    font-size: 0.6rem;
    color: rgba(255,255,255,0.2);
    letter-spacing: 0.08em;
    flex-shrink: 0;
    padding-top: 0.2rem;
  }

  /* legend */
  .legend {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.6rem;
    letter-spacing: 0.08em;
    opacity: 0.7;
  }

  /* grid */
  .lab-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }

  /* card */
  .lab-card {
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 10px;
    overflow: hidden;
    background: rgba(255,255,255,0.02);
    opacity: 0;
    animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
    transition: border-color 0.2s, background 0.2s, translate 0.2s;
    display: flex;
    flex-direction: column;
  }

  .lab-card:hover {
    border-color: var(--accent, rgba(255,255,255,0.15));
    background: rgba(255,255,255,0.04);
    translate: 0 -2px;
  }

  /* colored top accent bar */
  .card-accent {
    height: 2px;
    background: var(--accent, rgba(255,255,255,0.1));
    opacity: 0.6;
  }

  .card-inner {
    padding: 0.9rem;
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    flex: 1;
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .card-icon {
    width: 24px;
    height: 24px;
    border-radius: 6px;
    border: 1px solid rgba(255,255,255,0.07);
    background: rgba(255,255,255,0.03);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .card-meta {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .card-category {
    font-size: 0.58rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .wip-badge {
    font-size: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    padding: 0.1rem 0.35rem;
    border-radius: 999px;
    border: 1px solid rgba(251,146,60,0.3);
    color: rgba(251,146,60,0.8);
    background: rgba(251,146,60,0.05);
  }

  .card-body {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    flex: 1;
  }

  .card-name {
    font-size: 0.9rem;
    font-weight: 300;
    color: rgba(255,255,255,0.85);
    margin: 0;
    letter-spacing: -0.01em;
  }

  .card-desc {
    font-size: 0.65rem;
    line-height: 1.6;
    color: rgba(255,255,255,0.35);
    margin: 0;
  }

  .card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
  }

  .tag {
    font-size: 0.55rem;
    padding: 0.12rem 0.4rem;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 999px;
    color: rgba(255,255,255,0.25);
    letter-spacing: 0.04em;
  }

  .card-links {
    display: flex;
    gap: 0.4rem;
    flex-shrink: 0;
  }

  .card-link {
    color: rgba(255,255,255,0.25);
    transition: color 0.2s;
    display: flex;
    align-items: center;
    padding: 0.3rem;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 6px;
    transition: color 0.2s, border-color 0.2s;
  }

  .card-link:hover {
    color: rgba(255,255,255,0.7);
    border-color: rgba(255,255,255,0.15);
  }

  /* more soon */
  .more-soon {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding-top: 0.5rem;
    font-size: 0.62rem;
    color: rgba(255,255,255,0.15);
    letter-spacing: 0.08em;
    animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both;
  }

  .dots {
    display: flex;
    gap: 0.3rem;
  }

  .dots span {
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: rgba(255,255,255,0.15);
    animation: pulse 1.5s ease-in-out infinite;
  }

  .dots span:nth-child(2) { animation-delay: 0.2s; }
  .dots span:nth-child(3) { animation-delay: 0.4s; }

  @keyframes slide-up {
    from { opacity: 0; translate: 0 8px; }
    to   { opacity: 1; translate: 0 0;   }
  }

  @keyframes pulse {
    0%, 100% { opacity: 0.15; }
    50%       { opacity: 0.5;  }
  }
</style>