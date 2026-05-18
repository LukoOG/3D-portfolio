<!-- ProjectCard.svelte -->
<script lang="ts">
	import { ExternalLink, GitFork as Github, ArrowUpRight } from '@lucide/svelte';
	import type { Project } from '$lib';
	import Placeholder from '$lib/assets/project-images/placeholder.png?enhanced';
	import type { Picture } from '@sveltejs/enhanced-img';

	let { project, i }: { project: Project; i: number } = $props();
	let imageSrc = $state<string | Picture>(Placeholder);

	const images = import.meta.glob('../assets/project-images/*', {
		import: 'default',
		eager: true,
		query: {
			enhanced: true
		}
	});

	$effect(() => {
		if (!project.image) return;

		const path = `../assets/project-images/${project.image}`;
		const loader = images[path] as Picture;

		if (!loader) {
			imageSrc = Placeholder;
			return;
		} else {
			imageSrc = loader;
			return
		}

		// Code if eager attribute is false because loader will
		//become a Promise

		// loader()
		// 	.then((src) => {
		// 		imageSrc = src as string;
		// 	})
		// 	.catch((err) => {
		// 		imageSrc = Placeholder;
		// 		console.error(err);
		// 	});
	});
</script>

<article class="card" style="animation-delay: {0.12 + i * 0.12}s">
	<a class="display-none" target="_blank" rel="noopener" href={project.live}>
		<!-- image area -->
		<div class="card-image">
			{#if project.image}
				<enhanced:img src={imageSrc} alt={project.name} />
			{:else}
				<div class="image-placeholder">
					<span class="placeholder-name">{project.name}</span>
				</div>
			{/if}

			<!-- category + status float on top of image -->
			<div class="image-badges">
				<span class="category">{project.category}</span>
				{#if project.status === 'in-progress'}
					<span class="badge">In progress</span>
				{/if}
			</div>
		</div>
	</a>

	<!-- card content -->
	<div class="card-content">
		<div class="card-body">
			<h3 class="name">{project.name}</h3>
			<span class="image-year">{project.year}</span>
			<p class="description">{project.description}</p>
		</div>

		<div class="card-footer">
			<div class="pills">
				{#each project.stack as tech}
					<span class="pill">{tech}</span>
				{/each}
			</div>

			<div class="links">
				<a href={project.github} target="_blank" rel="noopener" class="link">
					<!-- <Github size={13} /> -->
					<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
					<span>Code</span>
				</a>
			</div>
		</div>
	</div>
</article>

<style>
	.card {
		display: flex;
		flex-direction: column;
		border: 1px solid rgba(255, 255, 255, 0.07);
		border-radius: 12px;
		overflow: hidden;
		background: rgba(255, 255, 255, 0.03);
		opacity: 0;
		animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
		transition:
			border-color 0.2s,
			background 0.2s,
			translate 0.2s;
		cursor: default;
	}

	.card:hover {
		border-color: rgba(255, 255, 255, 0.14);
		background: rgba(255, 255, 255, 0.05);
		translate: 0 -2px;
	}

	/* image */
	.card-image {
		position: relative;
		width: 100%;
		aspect-ratio: 16 / 9;
		overflow: hidden;
		background: rgba(255, 255, 255, 0.03);
	}

	.card-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: scale 0.4s ease;
	}

	.card:hover .card-image img {
		scale: 1.03;
	}

	.image-placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(
			135deg,
			rgba(255, 255, 255, 0.03) 0%,
			rgba(255, 255, 255, 0.06) 100%
		);
	}

	.placeholder-name {
		font-size: 2rem;
		font-weight: 200;
		letter-spacing: -0.02em;
		color: rgba(255, 255, 255, 0.08);
		text-transform: uppercase;
		letter-spacing: 0.2em;
	}

	.image-badges {
		position: absolute;
		top: 0.75rem;
		left: 0.75rem;
		display: flex;
		gap: 0.4rem;
		align-items: center;
	}

	.category {
		font-size: 0.55rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		padding: 0.2rem 0.5rem;
		border-radius: 999px;
		background: rgba(0, 0, 0, 0.5);
		color: rgba(255, 255, 255, 0.6);
		backdrop-filter: blur(4px);
		border: 1px solid rgba(255, 255, 255, 0.08);
	}

	.badge {
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

	.image-year {
		position: absolute;
		bottom: 0.75rem;
		right: 0.75rem;
		font-size: 0.6rem;
		color: rgba(255, 255, 255, 0.25);
		letter-spacing: 0.08em;
	}

	/* content */
	.card-content {
		padding: 1rem 1.1rem 1.1rem;
		display: flex;
		flex-direction: column;
		gap: 0.9rem;
		flex: 1;
	}

	.card-body {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	.name {
		font-size: 1rem;
		font-weight: 300;
		letter-spacing: -0.01em;
		color: rgba(255, 255, 255, 0.9);
		margin: 0;
	}

	.description {
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
		flex-direction: column;
		align-items: flex-start;
		gap: 0.75rem;
	}

	.pills {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem;
	}

	.pill {
		font-size: 0.58rem;
		padding: 0.15rem 0.45rem;
		border: 1px solid rgba(255, 255, 255, 0.07);
		border-radius: 999px;
		color: rgba(255, 255, 255, 0.3);
		letter-spacing: 0.04em;
	}

	.links {
		display: flex;
		gap: 0.5rem;
		flex-shrink: 0;
	}

	.link {
		display: flex;
		align-items: center;
		gap: 0.3rem;
		font-size: 0.65rem;
		color: #cfe6ff; /* brighter soft blue */
		padding: 0.3rem 0.65rem;
		border: 1px solid rgba(207, 230, 255, 0.25);
		border-radius: 999px;
		text-decoration: none;
		transition:
			color 0.2s,
			border-color 0.2s,
			background 0.2s;
		letter-spacing: 0.04em;
		background: rgba(255, 255, 255, 0.03);
	}

	.link:hover {
		color: #ffffff;
		border-color: #7fbfff;
		background: rgba(127, 191, 255, 0.12);
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
</style>
