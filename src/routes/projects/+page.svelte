<script lang="ts">
	import { projects } from '$lib';
	import ProjectsLayout from '$lib/components/html/pageLayouts/ProjectsLayout.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import { Category, type Project } from '$lib/states/projects.svelte';

	let activeFilter = $state<Category | 'all'>('all');
	let filters: (Category | 'all')[] = ['all', ...Object.values(Category)];

	let filteredProjects: Project[] = $derived.by(() => {
		if (activeFilter == 'all') return projects;
		else return projects.filter((project) => project.category == activeFilter);
	});

	console.log(filters);
</script>

<!-- /projects/+page.svelte -->
<ProjectsLayout>
	<div class="page-header">
		<div class="intro">
			<h2 class="page-title">My Projects</h2>
			<p class="page-subtext">
				A collection of products, experiments, and systems I've built — focusing on performance,
				usability, and real-world constraints.
			</p>
			<div class="filters">
				{#each filters as f}
					<button class:selected={activeFilter === f} onclick={() => (activeFilter = f)}>
						{f}
					</button>
				{/each}
			</div>
		</div>

		<div class="meta">
			<span class="count-pill">{projects.length} projects</span>
		</div>
	</div>

	<div class="grid">
		{#each filteredProjects as project, i}
			<ProjectCard {project} {i} />
		{/each}
	</div>
</ProjectsLayout>

<style>
	.page-header {
		display: flex;
		justify-content: space-between;
		gap: 2rem;
		padding-bottom: 1.25rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
	}

	.intro {
		max-width: 480px;
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.page-title {
		font-size: 1.05rem;
		font-weight: 400;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.page-subtext {
		font-size: 0.75rem;
		color: rgba(255, 255, 255, 0.45);
		line-height: 1.6;
	}

	.count-pill {
		font-size: 0.65rem;
		padding: 0.35rem 0.65rem;
		border-radius: 999px;
		border: 1px solid rgba(255, 255, 255, 0.08);
		color: rgba(255, 255, 255, 0.5);
		letter-spacing: 0.06em;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: 1.25rem;
		margin-top: 0.5rem;
	}

	/* first card spans full width as a featured project */
	.grid :global(.card:first-child .card-image) {
		aspect-ratio: 18 / 8;
	}

	/* on that featured card, show image taller */
	.grid :global(.card:first-child .card-image) {
		aspect-ratio: 21 / 9;
	}

	/* filters */
	.filters {
		display: flex;
		gap: 0.4rem;
		margin-top: 0.75rem;
	}

	.filters button {
		font-size: 0.65rem;
		padding: 0.3rem 0.65rem;
		border-radius: 999px;
		border: 1px solid rgba(255, 255, 255, 0.08);
		background: transparent;
		color: rgba(255, 255, 255, 0.35);
		cursor: pointer;
		transition: all 0.2s;
	}

	.filters button:hover {
		color: rgba(255, 255, 255, 0.7);
		border-color: rgba(255, 255, 255, 0.2);
	}

	.filters button.selected {
		color: white;
		border-color: rgba(255, 255, 255, 0.35);
		background: rgba(255, 255, 255, 0.08);
	}

	@keyframes slide-up {
		from {
			opacity: 0;
			translate: 0 8px;
		}
		to {
			opacity: 1;
			translate: 0 0;
		}
	}
</style>
