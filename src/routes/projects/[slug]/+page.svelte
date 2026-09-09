<script lang="ts">
	import type { PageData } from './$types';
	import { navigateTo } from '$lib';
	import AboutLayout from '$lib/components/html/pageLayouts/AboutLayout.svelte';
	import { getProjectImage } from '$lib/utils/projectImages';

	let { data }: { data: PageData } = $props();
	let { project } = $derived(data);

	let heroImg = $derived(getProjectImage(project.image))
	const liveLink = $derived(project.links.find((l) => l.kind === 'live'));
	const githubLink = $derived(project.links.find((l) => l.kind === 'github'));
	const otherLinks = $derived(
		project.links.filter((l) => l.kind !== 'live' && l.kind !== 'github')
	);

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.target instanceof HTMLInputElement) return;
		if (e.key === 'ArrowLeft') navigateTo('projects', '/projects', true);
	};


</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Kalam:wght@300;400&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<svelte:window onkeydown={handleKeyDown} />

<AboutLayout>
	<div class="detail-root">
		<!-- ═══════════════════════════════════════════════
	     LEVEL 1 — Project identity
	     ═══════════════════════════════════════════════ -->
		<header class="project-header">
			<!-- Back nav -->
			<button class="back-btn" onclick={() => navigateTo('projects', '/projects', true)}>
				<span class="back-arrow">←</span>
				All projects
			</button>

			<div class="header-grid">
				<div class="header-left">
					<div class="header-meta">
						{#each project.categories as cat}
							<span class="cat-tag">{cat}</span>
						{/each}
						<span class="year-tag">{project.year}</span>
						{#if project.status === 'in-progress'}
							<span class="status-tag">In progress</span>
						{/if}
					</div>

					<h1 class="project-title">
						{project.name}
					</h1>

					<p class="project-tagline">{project.tagline}</p>

					{#if project.role}
						<p class="project-role">
							<span class="role-label">Role</span>
							<span class="role-val">{project.role}</span>
						</p>
					{/if}

					<!-- Links -->
					<div class="header-links">
						{#if liveLink}
							<a href={liveLink.href} target="_blank" rel="noopener" class="link-btn link-live">
								{liveLink.label}
								<span class="ext-arrow">↗</span>
							</a>
						{/if}
						{#if githubLink}
							<a href={githubLink.href} target="_blank" rel="noopener" class="link-btn link-github">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="13"
									height="13"
									viewBox="0 0 24 24"
									fill="currentColor"
									aria-hidden="true"
									><path
										d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"
									/></svg
								>
								{githubLink.label}
							</a>
						{/if}
						{#each otherLinks as link}
							<a href={link.href} target="_blank" rel="noopener" class="link-btn">
								{link.label}
								<span class="ext-arrow">↗</span>
							</a>
						{/each}
					</div>
				</div>

				<!-- Hero image -->
				<div class="header-image">
					{#if project.image}
						<div class="image-frame">
							<enhanced:img src={heroImg} alt={project.name} class="hero-img" />
						</div>
					{/if}
				</div>
			</div>
		</header>

		<!-- ═══════════════════════════════════════════════
	     LEVEL 2 — What is it?
	     ═══════════════════════════════════════════════ -->
		{#if project.overview}
			<section class="detail-section overview-section">
				<div class="section-label-col">
					<span class="section-label">Overview</span>
				</div>
				<div class="section-content">
					<p class="body-text">{project.overview}</p>
				</div>
			</section>
		{/if}

		<!-- ═══════════════════════════════════════════════
	     LEVEL 3 — How I built it
	     ═══════════════════════════════════════════════ -->
		{#if project.approach}
			<section class="detail-section approach-section">
				<div class="section-label-col">
					<span class="section-label">
						<em class="cursive-accent">How it works</em>
					</span>
				</div>
				<div class="section-content">
					<p class="body-text">{project.approach}</p>

					<!-- Stack -->
					{#if project.stack.length > 0}
						<div class="stack-block">
							<span class="stack-label">Stack</span>
							<div class="stack-pills">
								{#each project.stack as tech}
									<span class="stack-pill">{tech}</span>
								{/each}
							</div>
						</div>
					{/if}
				</div>
			</section>
		{/if}

		<!-- ═══════════════════════════════════════════════
	     LEVEL 4 — Contribution & outcome
	     ═══════════════════════════════════════════════ -->
		{#if project.contribution || project.outcome}
			<section class="detail-section contribution-section">
				<div class="section-label-col">
					<span class="section-label">
						<em class="cursive-accent">My contribution</em>
					</span>
				</div>
				<div class="section-content">
					{#if project.contribution}
						<div class="contrib-block">
							<span class="contrib-heading">What I built</span>
							<p class="body-text">{project.contribution}</p>
						</div>
					{/if}

					{#if project.outcome}
						<div class="contrib-block">
							<span class="contrib-heading">Outcome</span>
							<p class="body-text">{project.outcome}</p>
						</div>
					{/if}
				</div>
			</section>
		{/if}

		<!-- Additional images -->
		{#if project.images && project.images.length > 1}
			<section class="images-section">
				<span class="section-label solo-label">Screenshots</span>
				<div class="images-grid">
					{#each project.images as imgName, idx}
						{#if idx > 0}
							<!-- additional screenshots after hero -->
							<div class="screenshot-frame">
								<enhanced:img
									src={getProjectImage(imgName)}
									alt="{project.name} screenshot {idx + 1}"
									class="screenshot"
									loading="lazy"
								/>
							</div>
						{/if}
					{/each}
				</div>
			</section>
		{/if}

		<!-- Footer navigation -->
		<div class="detail-footer">
			<button class="nav-btn" onclick={() => navigateTo('projects', '/projects', true)}>
				<span class="nav-arrow">←</span>
				All projects
			</button>
			<div class="footer-links">
				{#if liveLink}
					<a href={liveLink.href} target="_blank" rel="noopener" class="footer-ext-link">
						View live
						<span class="ext-arrow">↗</span>
					</a>
				{/if}
				{#if githubLink}
					<a href={githubLink.href} target="_blank" rel="noopener" class="footer-ext-link">
						View code
						<span class="ext-arrow">↗</span>
					</a>
				{/if}
			</div>
		</div>
	</div>
</AboutLayout>

<style>
	:global(picture) {
		display: contents;
	}

	.detail-root {
		width: 100%;
		max-width: 860px;
		margin: 0 auto;
		padding: 2.5rem 2rem 4rem;
		color: white;
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.cursive-accent {
		font-family: 'Kalam', cursive;
		font-style: normal;
		font-weight: 400;
		font-size: 1.1em;
	}

	/* ─── BACK BUTTON ─── */
	.back-btn {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.65rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.3);
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		margin-bottom: 2rem;
		transition: color 0.2s;
	}

	.back-btn:hover {
		color: rgba(255, 255, 255, 0.7);
	}

	.back-arrow {
		display: inline-block;
		transition: translate 0.2s;
	}

	.back-btn:hover .back-arrow {
		translate: -3px 0;
	}

	/* ─── HEADER ─── */
	.project-header {
		padding-bottom: 2.5rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.07);
		margin-bottom: 0;
		animation: slide-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.05s both;
	}

	.header-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 3rem;
		align-items: start;
	}

	.header-meta {
		display: flex;
		gap: 0.35rem;
		flex-wrap: wrap;
		align-items: center;
		margin-bottom: 1rem;
	}

	.cat-tag {
		font-size: 0.52rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		padding: 0.15rem 0.5rem;
		border-radius: 999px;
		background: rgba(180, 100, 255, 0.08);
		color: rgba(180, 100, 255, 0.7);
		border: 1px solid rgba(180, 100, 255, 0.15);
	}

	.year-tag {
		font-size: 0.52rem;
		letter-spacing: 0.1em;
		color: rgba(255, 255, 255, 0.25);
		padding: 0.15rem 0.5rem;
		border: 1px solid rgba(255, 255, 255, 0.07);
		border-radius: 999px;
	}

	.status-tag {
		font-size: 0.52rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		padding: 0.15rem 0.5rem;
		border-radius: 999px;
		border: 1px solid rgba(250, 204, 21, 0.3);
		color: rgba(250, 204, 21, 0.7);
		background: rgba(250, 204, 21, 0.06);
	}

	.project-title {
		font-size: clamp(2rem, 5vw, 3.5rem);
		font-weight: 200;
		letter-spacing: -0.03em;
		line-height: 1.05;
		margin: 0 0 0.8rem;
		color: white;
	}

	.project-tagline {
		font-size: 0.9rem;
		line-height: 1.65;
		color: rgba(255, 255, 255, 0.55);
		margin: 0 0 1.2rem;
		max-width: 44ch;
	}

	.project-role {
		display: flex;
		align-items: baseline;
		gap: 0.6rem;
		margin: 0 0 1.5rem;
	}

	.role-label {
		font-size: 0.58rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: rgba(255, 255, 255, 0.2);
		flex-shrink: 0;
	}

	.role-val {
		font-size: 0.75rem;
		color: rgba(255, 255, 255, 0.55);
	}

	/* Links */
	.header-links {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.link-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		font-size: 0.68rem;
		padding: 0.4rem 0.9rem;
		border-radius: 999px;
		text-decoration: none;
		letter-spacing: 0.04em;
		transition:
			background 0.2s,
			border-color 0.2s,
			color 0.2s;
		border: 1px solid rgba(255, 255, 255, 0.12);
		color: rgba(255, 255, 255, 0.6);
		background: rgba(255, 255, 255, 0.04);
	}

	.link-btn:hover {
		background: rgba(255, 255, 255, 0.09);
		border-color: rgba(255, 255, 255, 0.25);
		color: white;
	}

	.link-live {
		border-color: rgba(180, 100, 255, 0.25);
		color: rgba(180, 100, 255, 0.8);
		background: rgba(180, 100, 255, 0.06);
	}

	.link-live:hover {
		background: rgba(180, 100, 255, 0.12);
		border-color: rgba(180, 100, 255, 0.45);
		color: rgba(210, 160, 255, 1);
	}

	.ext-arrow {
		font-size: 0.8em;
		display: inline-block;
		transition: translate 0.2s;
	}

	.link-btn:hover .ext-arrow {
		translate: 2px -2px;
	}

	/* Hero image */
	.header-image {
		position: relative;
	}

	.image-frame {
		position: relative;
		border-radius: 3px;
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.08);
	}

	.image-frame::after {
		content: '';
		position: absolute;
		inset: -5px -5px 5px 5px;
		border: 1px solid rgba(180, 100, 255, 0.12);
		border-radius: 3px;
		pointer-events: none;
		z-index: -1;
	}

	.hero-img {
		width: 100%;
		aspect-ratio: 16 / 10;
		object-fit: cover;
		display: block;
	}

	/* ─── DETAIL SECTIONS ─── */
	.detail-section {
		display: grid;
		grid-template-columns: 120px 1fr;
		gap: 2.5rem;
		padding: 2.5rem 0;
		border-bottom: 1px solid rgba(255, 255, 255, 0.05);
		animation: slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
	}

	.section-label-col {
		padding-top: 0.2rem;
	}

	.section-label {
		font-size: 0.58rem;
		text-transform: uppercase;
		letter-spacing: 0.16em;
		color: rgba(255, 255, 255, 0.2);
		display: block;
		line-height: 1.6;
	}

	.section-label .cursive-accent {
		font-size: 0.88rem;
		text-transform: none;
		letter-spacing: 0;
		color: rgba(255, 255, 255, 0.5);
	}

	.section-content {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.body-text {
		font-size: 0.85rem;
		line-height: 1.8;
		color: rgba(255, 255, 255, 0.6);
		margin: 0;
		max-width: 62ch;
	}

	/* Stack block */
	.stack-block {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.stack-label {
		font-size: 0.56rem;
		text-transform: uppercase;
		letter-spacing: 0.14em;
		color: rgba(255, 255, 255, 0.2);
	}

	.stack-pills {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
	}

	.stack-pill {
		font-size: 0.66rem;
		padding: 0.25rem 0.65rem;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 999px;
		color: rgba(255, 255, 255, 0.45);
		background: rgba(255, 255, 255, 0.03);
		letter-spacing: 0.03em;
	}

	/* Contribution blocks */
	.contrib-block {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.contrib-heading {
		font-size: 0.65rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: rgba(255, 255, 255, 0.3);
	}

	/* Screenshots */
	.images-section {
		padding: 2.5rem 0;
		border-bottom: 1px solid rgba(255, 255, 255, 0.05);
	}

	.solo-label {
		display: block;
		font-size: 0.58rem;
		text-transform: uppercase;
		letter-spacing: 0.16em;
		color: rgba(255, 255, 255, 0.2);
		margin-bottom: 1rem;
	}

	.images-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 0.75rem;
	}

	.screenshot-frame {
		border-radius: 3px;
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.06);
	}

	.screenshot {
		width: 100%;
		display: block;
		object-fit: cover;
	}

	/* ─── FOOTER NAV ─── */
	.detail-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 2rem;
		margin-top: 0.5rem;
	}

	.nav-btn {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.68rem;
		padding: 0.45rem 1rem;
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.03);
		color: rgba(255, 255, 255, 0.5);
		cursor: pointer;
		letter-spacing: 0.05em;
		transition:
			background 0.2s,
			border-color 0.2s,
			color 0.2s;
	}

	.nav-btn:hover {
		background: rgba(255, 255, 255, 0.08);
		border-color: rgba(255, 255, 255, 0.25);
		color: white;
	}

	.nav-arrow {
		display: inline-block;
		transition: translate 0.2s;
	}

	.nav-btn:hover .nav-arrow {
		translate: -3px 0;
	}

	.footer-links {
		display: flex;
		gap: 0.6rem;
	}

	.footer-ext-link {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		font-size: 0.68rem;
		padding: 0.45rem 1rem;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 999px;
		color: rgba(255, 255, 255, 0.45);
		background: rgba(255, 255, 255, 0.02);
		text-decoration: none;
		letter-spacing: 0.04em;
		transition:
			background 0.2s,
			border-color 0.2s,
			color 0.2s;
	}

	.footer-ext-link:hover {
		background: rgba(255, 255, 255, 0.08);
		border-color: rgba(255, 255, 255, 0.22);
		color: white;
	}

	.footer-ext-link:hover .ext-arrow {
		translate: 2px -2px;
	}

	/* ─── ANIMATIONS ─── */
	@keyframes slide-up {
		from {
			opacity: 0;
			translate: 0 14px;
		}
		to {
			opacity: 1;
			translate: 0 0;
		}
	}

	/* ─── RESPONSIVE ─── */
	@media (max-width: 720px) {
		.detail-root {
			padding: 1.5rem 1.25rem 3rem;
		}

		.header-grid {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		.header-image {
			order: -1;
		}

		.detail-section {
			grid-template-columns: 1fr;
			gap: 1rem;
		}

		.section-label-col {
			padding-top: 0;
		}

		.project-title {
			font-size: clamp(1.8rem, 8vw, 2.5rem);
		}

		.images-grid {
			grid-template-columns: 1fr;
		}

		.detail-footer {
			flex-direction: column;
			gap: 1rem;
			align-items: flex-start;
		}
	}
</style>
