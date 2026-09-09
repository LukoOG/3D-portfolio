<!-- ProjectCard.svelte -->
<script lang="ts">
	import type { Project } from '$lib';
	import { navigateTo } from '$lib';
	import { getProjectImage } from '$lib/utils/projectImages';

	let { project, i, featured = false }: { project: Project; i: number; featured?: boolean } =
		$props();
	let imageSrc = $derived(getProjectImage(project.image))

	function handleClick() {
		// Navigate within the portfolio to the project detail page
		navigateTo('projects', `/projects/${project.slug}`, true);
	}
</script>

<div
	class="card"
	class:is-featured={featured}
	style="animation-delay: {0.08 + i * 0.1}s"
	onclick={handleClick}
	onkeydown={(e) => e.key === 'Enter' && handleClick()}
	tabindex="0"
	role="button"
	aria-label="View {project.name} details"
>
	<!-- image area -->
	<div class="card-image">
		{#if project.image}
			<enhanced:img src={imageSrc} alt={project.name} />
		{:else}
			<div class="image-placeholder">
				<span class="placeholder-name">{project.name}</span>
			</div>
		{/if}

		<div class="image-overlay"></div>

		<!-- year floats on image -->
		<span class="image-year">{project.year}</span>

		{#if project.status === 'in-progress'}
			<span class="status-badge">In progress</span>
		{/if}
	</div>

	<!-- card content -->
	<div class="card-content">
		<div class="card-meta">
			{#each project.categories as cat}
				<span class="cat-tag">{cat}</span>
			{/each}
		</div>

		<div class="card-body">
			<h3 class="name">{project.name}</h3>
			<p class="tagline">{project.tagline}</p>
		</div>

		<div class="card-footer">
			<div class="pills">
				{#each project.stack as tech}
					<span class="pill">{tech}</span>
				{/each}
			</div>
			<span class="view-link">
				View project
				<span class="view-arrow">→</span>
			</span>
		</div>
	</div>
</div>

<style>
	.card {
		display: flex;
		flex-direction: column;
		border: 1px solid rgba(255, 255, 255, 0.07);
		border-radius: 4px;
		overflow: hidden;
		background: rgba(255, 255, 255, 0.02);
		opacity: 0;
		animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
		transition:
			border-color 0.25s,
			background 0.25s,
			translate 0.25s;
		cursor: pointer;
		outline: none;
	}

	.card:hover,
	.card:focus-visible {
		border-color: rgba(255, 255, 255, 0.15);
		background: rgba(255, 255, 255, 0.04);
		translate: 0 -3px;
	}

	/* Featured card gets subtle purple tint */
	.card.is-featured {
		border-color: rgba(180, 100, 255, 0.15);
		background: rgba(180, 100, 255, 0.03);
	}

	.card.is-featured:hover,
	.card.is-featured:focus-visible {
		border-color: rgba(180, 100, 255, 0.3);
		background: rgba(180, 100, 255, 0.06);
	}

	/* image */
	.card-image {
		position: relative;
		width: 100%;
		aspect-ratio: 16 / 9;
		overflow: hidden;
		background: rgba(255, 255, 255, 0.03);
	}

	:global(.card-image picture) {
		display: contents;
	}

	:global(.card-image img) {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: scale 0.4s ease;
		display: block;
	}

	.card:hover :global(.card-image img) {
		scale: 1.03;
	}

	.image-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(to top, rgba(0, 0, 0, 0.35) 0%, transparent 50%);
		pointer-events: none;
	}

	.image-placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.02);
	}

	.placeholder-name {
		font-size: 2rem;
		font-weight: 200;
		color: rgba(255, 255, 255, 0.06);
		text-transform: uppercase;
		letter-spacing: 0.2em;
	}

	.image-year {
		position: absolute;
		bottom: 0.75rem;
		right: 0.85rem;
		font-size: 0.58rem;
		color: rgba(255, 255, 255, 0.35);
		letter-spacing: 0.1em;
	}

	.status-badge {
		position: absolute;
		top: 0.75rem;
		left: 0.75rem;
		font-size: 0.55rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		padding: 0.2rem 0.5rem;
		border-radius: 999px;
		border: 1px solid rgba(250, 204, 21, 0.3);
		color: rgba(250, 204, 21, 0.8);
		background: rgba(250, 204, 21, 0.08);
		backdrop-filter: blur(4px);
	}

	/* content */
	.card-content {
		padding: 0.9rem 1rem 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		flex: 1;
	}

	.card-meta {
		display: flex;
		gap: 0.3rem;
		flex-wrap: wrap;
	}

	.cat-tag {
		font-size: 0.52rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		padding: 0.15rem 0.45rem;
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.05);
		color: rgba(255, 255, 255, 0.35);
		border: 1px solid rgba(255, 255, 255, 0.06);
	}

	.card-body {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		flex: 1;
	}

	.name {
		font-size: 1rem;
		font-weight: 300;
		letter-spacing: -0.01em;
		color: rgba(255, 255, 255, 0.9);
		margin: 0;
		line-height: 1.2;
	}

	.tagline {
		font-size: 0.72rem;
		line-height: 1.55;
		color: rgba(255, 255, 255, 0.4);
		margin: 0;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.card-footer {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		gap: 0.5rem;
		margin-top: auto;
	}

	.pills {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem;
	}

	.pill {
		font-size: 0.56rem;
		padding: 0.12rem 0.42rem;
		border: 1px solid rgba(255, 255, 255, 0.07);
		border-radius: 999px;
		color: rgba(255, 255, 255, 0.28);
		letter-spacing: 0.04em;
	}

	.view-link {
		font-size: 0.62rem;
		color: rgba(255, 255, 255, 0.3);
		display: flex;
		align-items: center;
		gap: 0.3rem;
		white-space: nowrap;
		flex-shrink: 0;
		transition: color 0.2s;
	}

	.card:hover .view-link,
	.card:focus-visible .view-link {
		color: rgba(255, 255, 255, 0.7);
	}

	.view-arrow {
		display: inline-block;
		transition: translate 0.2s;
	}

	.card:hover .view-arrow,
	.card:focus-visible .view-arrow {
		translate: 3px 0;
	}

	@keyframes slide-up {
		from {
			opacity: 0;
			translate: 0 12px;
		}
		to {
			opacity: 1;
			translate: 0 0;
		}
	}
</style>
