<!-- src/routes/lab/+page.svelte -->
<script lang="ts">
	import { navigateTo } from '$lib';
	import LabLayout from '$lib/components/html/pageLayouts/LabLayout.svelte';
	import { ExternalLink } from '@lucide/svelte';
	import Github from '$lib/components/icon/github.svelte';
	import { items, domainMeta } from '$lib/states';
	import { allVisited, progress } from '$lib';
	import { TOKEN_MAP } from '../secret/lib/tokens';

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.target instanceof HTMLInputElement) return;
		if (e.key === 'ArrowLeft') navigateTo('projects', '/projects', true);
		else if (e.key === 'ArrowRight') navigateTo('secret', '/secret', true);
	};

	const activeItems = $derived(items.filter((i) => !i.wip));
	const wipItems = $derived(items.filter((i) => i.wip));

	const totalLength = Object.values(TOKEN_MAP).length;

	const promptState = $derived.by(() => {
		if (progress.keyFound) return 'key_found';
		if (allVisited()) return 'all_seen';
		return 'unseen';
	});

	const enteredCount = $derived(
		Object.values(TOKEN_MAP).filter((t) => progress.visited.has(t)).length
	);
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

<LabLayout>
	<div class="lab-root">
		<!-- ══════════════════════════════════════════
		     HEADER — The lab's identity
		     ══════════════════════════════════════════ -->
		<header class="lab-header">
			<div class="header-identity">
				<span class="micro-label">The Lab</span>
				<h1 class="lab-title">
					Where things get
					<em class="cursive-accent">weird.</em>
				</h1>
				<p class="lab-sub">
					Questions that became code. Experiments, rabbit holes, and things I built because I wanted
					to understand how they work.
				</p>
			</div>

			<div class="header-aside">
				<div class="lab-manifesto">
					<p class="manifesto-line">Not everything here needs to become a product.</p>
					<p class="manifesto-line">Some of these are finished. Some are not.</p>
					<p class="manifesto-line">All of them started with curiosity.</p>
				</div>
				<div class="experiment-count">
					<span class="count-num">{items.length}</span>
					<span class="count-label">experiment{items.length !== 1 ? 's' : ''}</span>
				</div>
			</div>
		</header>

		<!-- ══════════════════════════════════════════
		     EXPERIMENTS — The workbench
		     ══════════════════════════════════════════ -->
		{#if activeItems.length > 0}
			<section class="experiments-section">
				<span class="section-eyebrow">Experiments</span>

				<div class="experiments-list">
					{#each activeItems as item, i}
						{@const meta = domainMeta[item.domain]}
						<div
							class="experiment-entry"
							style="animation-delay: {0.1 + i * 0.1}s; --accent: {meta.color}"
						>
							<!-- Left: question + description -->
							<div class="entry-main">
								{#if item.question}
									<p class="entry-question">"{item.question}"</p>
								{/if}

								<div class="entry-title-row">
									<h2 class="entry-name">{item.name}</h2>
									{#if item.origin}
										<span class="entry-origin">via {item.origin}</span>
									{/if}
								</div>

								<p class="entry-desc">{item.description}</p>

								<div class="entry-meta">
									<div class="entry-tags">
										{#each item.tags as tag}
											<span class="entry-tag">{tag}</span>
										{/each}
									</div>

									<div class="entry-links">
										{#if item.github}
											<a
												href={item.github}
												target="_blank"
												rel="noopener"
												class="entry-link"
												title="GitHub"
											>
												<Github size={12} />
												<span>Code</span>
											</a>
										{/if}
										{#if item.live}
											<a
												href={item.live}
												target="_blank"
												rel="noopener"
												class="entry-link"
												title="Live demo"
											>
												<ExternalLink size={12} />
												<span>Live</span>
											</a>
										{/if}
									</div>
								</div>
							</div>

							<!-- Right: domain annotation -->
							<div class="entry-annotation">
								<span class="annotation-domain" style="color: {meta.color}">{meta.label}</span>
								{#if item.year}
									<span class="annotation-year">{item.year}</span>
								{/if}
							</div>
						</div>
					{/each}
				</div>
			</section>
		{/if}

		<!-- WIP section — things that are still going -->
		{#if wipItems.length > 0}
			<section class="wip-section">
				<span class="section-eyebrow">In progress</span>
				<p class="wip-context">Things I'm still poking at.</p>

				<div class="wip-list">
					{#each wipItems as item, i}
						{@const meta = domainMeta[item.domain]}
						<div
							class="wip-entry"
							style="animation-delay: {0.2 + i * 0.08}s; --accent: {meta.color}"
						>
							<div class="wip-left">
								<span class="wip-indicator"></span>
								<div class="wip-text">
									<h3 class="wip-name">{item.name}</h3>
									<p class="wip-desc">{item.description}</p>
								</div>
							</div>
							<div class="wip-right">
								<span class="wip-domain" style="color: {meta.color}">{meta.label}</span>
								<div class="wip-links">
									{#if item.github}
										<a href={item.github} target="_blank" rel="noopener" class="entry-link">
											<Github size={11} />
										</a>
									{/if}
								</div>
							</div>
						</div>
					{/each}
				</div>
			</section>
		{/if}

		<!-- ══════════════════════════════════════════
		     EXPANDING — honest "more coming" signal
		     ══════════════════════════════════════════ -->
		<div class="bench-note">
			<span class="bench-dash">—</span>
			<p>
				The lab is actively growing. More experiments are underway — particularly in systems
				programming, Rust, and whatever I happen to get curious about next.
			</p>
		</div>

		<!-- ══════════════════════════════════════════
		     NAVIGATION
		     ══════════════════════════════════════════ -->
		<div class="lab-nav">
			<button class="nav-btn" onclick={() => navigateTo('projects', '/projects', true)}>
				<span class="nav-arrow">←</span>
				Projects
			</button>

			{#if promptState !== 'key_found'}
				<div class="secret-prompt" class:ready={promptState === 'all_seen'}>
					<div class="prompt-inner">
						{#if promptState === 'unseen'}
							<!-- nudge -->
							<div class="prompt-row">
								<span class="prompt-icon">◎</span>
								<div class="prompt-text">
									<p class="prompt-main">
										Curious? There's more to this portfolio than meets the eye.
									</p>
									<p class="prompt-sub">
										Explore everything first —
										<span class="prompt-count">{enteredCount}/{totalLength}</span>
										pages entered
									</p>
								</div>
							</div>

							<!-- subtle progress bar -->
							<div class="prompt-bar">
								<div class="prompt-bar-fill" style="width: {(enteredCount / totalLength) * 100}%" />
							</div>
						{:else if promptState === 'all_seen'}
							<!-- unlock hint -->
							<div class="prompt-row">
								<span class="prompt-icon unlocked">✦</span>
								<div class="prompt-text">
									<p class="prompt-main">You've seen it all.</p>
									<p class="prompt-sub">The key to what's next is in the README.</p>
								</div>
							</div>
						{/if}
					</div>
				</div>
			{:else}
				<button
					class="nav-btn nav-secret"
					onclick={() => navigateTo('secret', '/secret', true)}
					title="First Clue?"
				>
					First Clue?
					<span class="nav-arrow">→</span>
				</button>
			{/if}
		</div>
	</div>
</LabLayout>

<style>
	/* ─────────────────────────────────────────────────────
	   BASE
	───────────────────────────────────────────────────── */
	.lab-root {
		width: 100%;
		max-width: 860px;
		margin: 0 auto;
		padding: 2.5rem 2rem 4rem;
		color: white;
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.micro-label {
		display: block;
		font-size: 0.58rem;
		text-transform: uppercase;
		letter-spacing: 0.18em;
		color: rgba(255, 255, 255, 0.25);
		margin-bottom: 0.5rem;
	}

	.section-eyebrow {
		display: block;
		font-size: 0.55rem;
		text-transform: uppercase;
		letter-spacing: 0.16em;
		color: rgba(255, 255, 255, 0.2);
		margin-bottom: 1.5rem;
	}

	.cursive-accent {
		font-family: 'Kalam', cursive;
		font-style: normal;
		font-weight: 400;
		color: rgba(210, 160, 255, 0.9);
	}

	/* ─────────────────────────────────────────────────────
	   HEADER
	───────────────────────────────────────────────────── */
	.lab-header {
		display: grid;
		grid-template-columns: 1fr 220px;
		gap: 3rem;
		align-items: start;
		padding-bottom: 2.5rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.07);
		animation: slide-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.05s both;
	}

	.lab-title {
		font-size: clamp(2rem, 5vw, 3.2rem);
		font-weight: 200;
		letter-spacing: -0.03em;
		line-height: 1.1;
		margin: 0 0 1rem;
		color: white;
	}

	.lab-title .cursive-accent {
		font-size: clamp(2.2rem, 5.5vw, 3.5rem);
	}

	.lab-sub {
		font-size: 0.85rem;
		line-height: 1.75;
		color: rgba(255, 255, 255, 0.5);
		margin: 0;
		max-width: 46ch;
	}

	.header-aside {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		padding-top: 0.3rem;
	}

	.lab-manifesto {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding-left: 0.75rem;
		border-left: 1px solid rgba(255, 255, 255, 0.08);
	}

	.manifesto-line {
		font-size: 0.68rem;
		line-height: 1.55;
		color: rgba(255, 255, 255, 0.28);
		margin: 0;
		font-style: italic;
	}

	.experiment-count {
		display: flex;
		flex-direction: column;
		gap: 0.1rem;
	}

	.count-num {
		font-size: 1.8rem;
		font-weight: 200;
		letter-spacing: -0.03em;
		color: rgba(255, 255, 255, 0.8);
		line-height: 1;
	}

	.count-label {
		font-size: 0.58rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: rgba(255, 255, 255, 0.2);
	}

	/* ─────────────────────────────────────────────────────
	   EXPERIMENTS LIST
	───────────────────────────────────────────────────── */
	.experiments-section {
		padding: 2.5rem 0;
		border-bottom: 1px solid rgba(255, 255, 255, 0.05);
		animation: slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
	}

	.experiments-list {
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.experiment-entry {
		display: grid;
		grid-template-columns: 1fr 100px;
		gap: 2rem;
		align-items: start;
		padding: 1.75rem 0;
		border-bottom: 1px solid rgba(255, 255, 255, 0.05);
		opacity: 0;
		animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
		transition: background 0.2s;
	}

	.experiment-entry:last-child {
		border-bottom: none;
	}

	.experiment-entry:hover {
		background: rgba(255, 255, 255, 0.01);
	}

	/* The question — the spark */
	.entry-question {
		font-size: 0.78rem;
		line-height: 1.6;
		color: rgba(255, 255, 255, 0.35);
		margin: 0 0 0.75rem;
		font-style: italic;
		max-width: 56ch;
	}

	.entry-title-row {
		display: flex;
		align-items: baseline;
		gap: 0.75rem;
		margin-bottom: 0.5rem;
		flex-wrap: wrap;
	}

	.entry-name {
		font-size: 1.1rem;
		font-weight: 300;
		letter-spacing: -0.01em;
		color: rgba(255, 255, 255, 0.9);
		margin: 0;
		line-height: 1.2;
	}

	.entry-origin {
		font-size: 0.6rem;
		letter-spacing: 0.06em;
		color: rgba(255, 255, 255, 0.2);
		font-style: italic;
		flex-shrink: 0;
	}

	.entry-desc {
		font-size: 0.78rem;
		line-height: 1.7;
		color: rgba(255, 255, 255, 0.5);
		margin: 0 0 1rem;
		max-width: 56ch;
	}

	.entry-meta {
		display: flex;
		align-items: center;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.entry-tags {
		display: flex;
		gap: 0.3rem;
		flex-wrap: wrap;
	}

	.entry-tag {
		font-size: 0.58rem;
		padding: 0.15rem 0.5rem;
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 999px;
		color: rgba(255, 255, 255, 0.3);
		letter-spacing: 0.04em;
	}

	.entry-links {
		display: flex;
		gap: 0.4rem;
		flex-shrink: 0;
	}

	.entry-link {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		font-size: 0.62rem;
		padding: 0.3rem 0.65rem;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 999px;
		color: rgba(255, 255, 255, 0.4);
		background: rgba(255, 255, 255, 0.02);
		text-decoration: none;
		letter-spacing: 0.04em;
		transition:
			color 0.2s,
			border-color 0.2s,
			background 0.2s;
	}

	.entry-link:hover {
		color: rgba(255, 255, 255, 0.8);
		border-color: rgba(255, 255, 255, 0.22);
		background: rgba(255, 255, 255, 0.06);
	}

	/* Right annotation column */
	.entry-annotation {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 0.4rem;
		padding-top: 0.15rem;
	}

	.annotation-domain {
		font-size: 0.58rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		opacity: 0.8;
	}

	.annotation-year {
		font-size: 0.58rem;
		letter-spacing: 0.08em;
		color: rgba(255, 255, 255, 0.2);
	}

	/* ─────────────────────────────────────────────────────
	   WIP SECTION
	───────────────────────────────────────────────────── */
	.wip-section {
		padding: 2.5rem 0;
		border-bottom: 1px solid rgba(255, 255, 255, 0.05);
		animation: slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both;
	}

	.wip-context {
		font-size: 0.72rem;
		color: rgba(255, 255, 255, 0.25);
		margin: 0 0 1.5rem;
		font-style: italic;
	}

	.wip-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.wip-entry {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem;
		padding: 1rem 1.1rem;
		border: 1px solid rgba(255, 255, 255, 0.05);
		border-radius: 3px;
		background: rgba(255, 255, 255, 0.015);
		opacity: 0;
		animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
		transition:
			border-color 0.2s,
			background 0.2s;
	}

	.wip-entry:hover {
		border-color: rgba(255, 255, 255, 0.1);
		background: rgba(255, 255, 255, 0.03);
	}

	.wip-left {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		flex: 1;
	}

	.wip-indicator {
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: rgba(251, 146, 60, 0.6);
		margin-top: 0.35rem;
		flex-shrink: 0;
		animation: pulse-wip 2s ease-in-out infinite;
	}

	.wip-text {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.wip-name {
		font-size: 0.85rem;
		font-weight: 300;
		color: rgba(255, 255, 255, 0.75);
		margin: 0;
	}

	.wip-desc {
		font-size: 0.7rem;
		color: rgba(255, 255, 255, 0.35);
		margin: 0;
		line-height: 1.55;
	}

	.wip-right {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 0.5rem;
		flex-shrink: 0;
	}

	.wip-domain {
		font-size: 0.56rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		opacity: 0.7;
	}

	.wip-links {
		display: flex;
		gap: 0.35rem;
	}

	/* ─────────────────────────────────────────────────────
	   BENCH NOTE
	───────────────────────────────────────────────────── */
	.bench-note {
		display: flex;
		gap: 0.75rem;
		align-items: flex-start;
		padding: 2rem 0;
		animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both;
	}

	.bench-dash {
		font-size: 0.9rem;
		color: rgba(210, 160, 255, 0.4);
		flex-shrink: 0;
		margin-top: 0.05rem;
		line-height: 1.65;
	}

	.bench-note p {
		font-size: 0.72rem;
		line-height: 1.7;
		color: rgba(255, 255, 255, 0.25);
		margin: 0;
		font-style: italic;
		max-width: 52ch;
	}

	/* ─────────────────────────────────────────────────────
	   NAVIGATION
	───────────────────────────────────────────────────── */
	.lab-nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 1.5rem;
		border-top: 1px solid rgba(255, 255, 255, 0.07);
		animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.35s both;
	}

	.nav-btn {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1.1rem;
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.03);
		color: rgba(255, 255, 255, 0.5);
		font-size: 0.7rem;
		letter-spacing: 0.06em;
		cursor: pointer;
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

	/* Secret nav gets a subtle hint */
	.nav-secret {
		border-style: dashed;
		color: rgba(255, 255, 255, 0.35);
	}

	.nav-secret:hover {
		border-style: solid;
		border-color: rgba(210, 160, 255, 0.3);
		color: rgba(210, 160, 255, 0.8);
		background: rgba(210, 160, 255, 0.04);
	}

	.nav-arrow {
		display: inline-block;
		transition: translate 0.2s;
	}

	.nav-btn:hover .nav-arrow {
		translate: 3px 0;
	}

	.secret-prompt {
		margin-top: 1rem;
		padding: 1rem 1.25rem;
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 10px;
		background: rgba(255, 255, 255, 0.02);
		transition:
			border-color 0.4s,
			background 0.4s;
		animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both;
	}

	.secret-prompt.ready {
		border-color: rgba(234, 179, 8, 0.2);
		background: rgba(234, 179, 8, 0.04);
	}

	.prompt-inner {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.prompt-row {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
	}

	.prompt-icon {
		font-size: 0.9rem;
		color: rgba(255, 255, 255, 0.2);
		flex-shrink: 0;
		margin-top: 0.1rem;
		transition: color 0.4s;
	}

	.prompt-icon.unlocked {
		color: rgba(234, 179, 8, 0.7);
		animation: star-pulse 2s ease-in-out infinite;
	}

	.prompt-text {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	.prompt-main {
		font-size: 0.72rem;
		color: rgba(255, 255, 255, 0.6);
		margin: 0;
	}

	.secret-prompt.ready .prompt-main {
		color: rgba(255, 255, 255, 0.85);
	}

	.prompt-sub {
		font-size: 0.62rem;
		color: rgba(255, 255, 255, 0.25);
		margin: 0;
		letter-spacing: 0.02em;
	}

	.secret-prompt.ready .prompt-sub {
		color: rgba(234, 179, 8, 0.5);
	}

	.prompt-count {
		font-variant-numeric: tabular-nums;
		color: rgba(255, 255, 255, 0.5);
	}

	/* progress bar */
	.prompt-bar {
		height: 1px;
		background: rgba(255, 255, 255, 0.06);
		border-radius: 999px;
		overflow: hidden;
	}

	.prompt-bar-fill {
		height: 100%;
		background: rgba(255, 255, 255, 0.2);
		border-radius: 999px;
		transition: width 0.5s cubic-bezier(0.16, 1, 0.3, 1);
	}

	@keyframes star-pulse {
		0%,
		100% {
			opacity: 0.7;
		}
		50% {
			opacity: 1;
			text-shadow: 0 0 8px rgba(234, 179, 8, 0.6);
		}
	}

	/* ─────────────────────────────────────────────────────
	   ANIMATIONS
	───────────────────────────────────────────────────── */
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

	@keyframes pulse-wip {
		0%,
		100% {
			opacity: 0.6;
		}
		50% {
			opacity: 1;
		}
	}

	/* ─────────────────────────────────────────────────────
	   RESPONSIVE
	───────────────────────────────────────────────────── */
	@media (max-width: 720px) {
		.lab-root {
			padding: 1.75rem 1.25rem 3rem;
		}

		.lab-header {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		.header-aside {
			flex-direction: row;
			align-items: flex-start;
			gap: 2rem;
		}

		.experiment-entry {
			grid-template-columns: 1fr;
			gap: 1rem;
		}

		.entry-annotation {
			flex-direction: row;
			align-items: center;
			justify-content: flex-start;
			gap: 0.75rem;
		}
	}

	@media (max-width: 480px) {
		.header-aside {
			flex-direction: column;
		}

		.entry-meta {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.6rem;
		}

		.wip-entry {
			flex-direction: column;
			gap: 0.75rem;
		}

		.wip-right {
			flex-direction: row;
			align-items: center;
			justify-content: flex-start;
		}
	}
</style>
