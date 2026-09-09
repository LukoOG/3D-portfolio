<script lang="ts">
	import { navigateTo, projects } from '$lib';
	import ProjectsLayout from '$lib/components/html/pageLayouts/ProjectsLayout.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import { Category, type Project } from '$lib/states/projects.svelte';

	// All filterable categories (exclude 'featured' from filters — it's structural not semantic)
	const filterCategories: (Category | 'all')[] = [
		'all',
		Category.Fullstack,
		Category.Frontend,
		Category.Backend,
		Category.Web3,
		Category.Hackathon,
		Category.Experiment
	];

	let activeFilter = $state<Category | 'all'>('all');

	let featuredProjects: Project[] = $derived.by(() =>
		projects.filter((p) => p.featured)
	);

	let otherProjects: Project[] = $derived.by(() => {
		const rest = projects.filter((p) => !p.featured);
		if (activeFilter === 'all') return rest;
		return rest.filter((p) => p.categories.includes(activeFilter as Category));
	});

	// When filtering, also include featured projects that match
	let filteredFeatured: Project[] = $derived.by(() => {
		if (activeFilter === 'all') return featuredProjects;
		return featuredProjects.filter((p) => p.categories.includes(activeFilter as Category));
	});

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.target instanceof HTMLInputElement) return;
		if (e.key === 'ArrowLeft') navigateTo('about', '/about', true);
		else if (e.key === 'ArrowRight') navigateTo('lab', '/lab', true);
	};
</script>

<svelte:window onkeydown={handleKeyDown} />

<ProjectsLayout>
	<!-- Page header -->
	<div class="page-header">
		<div class="intro">
			<span class="micro-label">Selected work</span>
			<h2 class="page-title">Projects</h2>
			<p class="page-subtext">
				Things I've built — products, experiments, and systems. Click a project to read more.
			</p>
		</div>

		<div class="filter-row">
			{#each filterCategories as f}
				<button
					class="filter-btn"
					class:active={activeFilter === f}
					onclick={() => (activeFilter = f)}
				>
					{f}
				</button>
			{/each}
		</div>
	</div>

	<!-- Featured / Hero projects -->
	{#if filteredFeatured.length > 0}
		<div class="featured-section">
			<span class="section-eyebrow">Featured</span>
			<div class="featured-grid">
				{#each filteredFeatured as project, i}
					<ProjectCard {project} {i} featured={true} />
				{/each}
			</div>
		</div>
	{/if}

	<!-- Rest of projects -->
	{#if otherProjects.length > 0}
		<div class="other-section">
			{#if filteredFeatured.length > 0}
				<span class="section-eyebrow">More work</span>
			{/if}
			<div class="grid">
				{#each otherProjects as project, i}
					<ProjectCard {project} i={filteredFeatured.length + i} />
				{/each}
			</div>
		</div>
	{/if}

	{#if filteredFeatured.length === 0 && otherProjects.length === 0}
		<div class="empty-state">
			<p>No projects in this category yet.</p>
		</div>
	{/if}

	<!-- Navigation -->
	<div class="page-nav">
		<button class="cta" onclick={() => navigateTo('about', '/about', true)}>
			<span class="arrow">←</span>
			About me
		</button>
		<button class="cta" onclick={() => navigateTo('lab', '/lab', true)}>
			My lab
			<span class="arrow">→</span>
		</button>
	</div>
</ProjectsLayout>

<style>
	.page-header {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding-bottom: 1.5rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
	}

	.micro-label {
		display: block;
		font-size: 0.58rem;
		text-transform: uppercase;
		letter-spacing: 0.18em;
		color: rgba(255, 255, 255, 0.25);
		margin-bottom: 0.3rem;
	}

	.intro {
		display: flex;
		flex-direction: column;
	}

	.page-title {
		font-size: clamp(1.6rem, 3.5vw, 2.8rem);
		font-weight: 300;
		letter-spacing: -0.02em;
		margin: 0 0 0.4rem;
		line-height: 1;
		color: white;
		animation: slide-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
	}

	.page-subtext {
		font-size: 0.75rem;
		color: rgba(255, 255, 255, 0.35);
		line-height: 1.6;
		margin: 0;
	}

	/* Filters */
	.filter-row {
		display: flex;
		gap: 0.35rem;
		flex-wrap: wrap;
		animation: slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
	}

	.filter-btn {
		font-size: 0.62rem;
		padding: 0.28rem 0.65rem;
		border-radius: 999px;
		border: 1px solid rgba(255, 255, 255, 0.08);
		background: transparent;
		color: rgba(255, 255, 255, 0.3);
		cursor: pointer;
		text-transform: capitalize;
		transition:
			color 0.2s,
			border-color 0.2s,
			background 0.2s;
		letter-spacing: 0.04em;
	}

	.filter-btn:hover {
		color: rgba(255, 255, 255, 0.65);
		border-color: rgba(255, 255, 255, 0.18);
	}

	.filter-btn.active {
		color: white;
		border-color: rgba(255, 255, 255, 0.3);
		background: rgba(255, 255, 255, 0.07);
	}

	/* Section eyebrow */
	.section-eyebrow {
		display: block;
		font-size: 0.55rem;
		text-transform: uppercase;
		letter-spacing: 0.16em;
		color: rgba(255, 255, 255, 0.2);
		margin-bottom: 0.75rem;
	}

	/* Featured section: 1–2 large cards side by side */
	.featured-section {
		animation: slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both;
	}

	.featured-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
		gap: 1rem;
	}

	/* Other projects: tighter grid */
	.other-section {
		animation: slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 0.85rem;
	}

	/* Empty state */
	.empty-state {
		padding: 3rem 0;
		text-align: center;
	}

	.empty-state p {
		font-size: 0.78rem;
		color: rgba(255, 255, 255, 0.25);
		margin: 0;
	}

	/* Nav */
	.page-nav {
		display: flex;
		justify-content: space-between;
		padding-top: 1rem;
		border-top: 1px solid rgba(255, 255, 255, 0.06);
		margin-top: auto;
	}

	.cta {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1.1rem;
		border: 1px solid rgba(255, 255, 255, 0.15);
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.04);
		color: rgba(255, 255, 255, 0.65);
		font-size: 0.72rem;
		letter-spacing: 0.06em;
		cursor: pointer;
		transition:
			background 0.2s,
			border-color 0.2s,
			color 0.2s;
	}

	.cta:hover {
		background: rgba(255, 255, 255, 0.09);
		border-color: rgba(255, 255, 255, 0.3);
		color: white;
	}

	.arrow {
		transition: translate 0.2s;
		display: inline-block;
	}

	.cta:hover .arrow {
		translate: 3px 0;
	}

	@keyframes slide-up {
		from {
			opacity: 0;
			translate: 0 10px;
		}
		to {
			opacity: 1;
			translate: 0 0;
		}
	}

	@media (max-width: 640px) {
		.featured-grid {
			grid-template-columns: 1fr;
		}

		.grid {
			grid-template-columns: 1fr;
		}

		.filter-row {
			gap: 0.3rem;
		}
	}
</style>
