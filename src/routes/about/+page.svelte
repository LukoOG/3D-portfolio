<!-- src/routes/about/+page.svelte -->
<script lang="ts">
	import AboutLayout from '$lib/components/html/pageLayouts/AboutLayout.svelte';
	import profilePic from '$lib/assets/profile/me.png?enhanced';
	import { timeline } from '$lib/states/timeline.svelte';
	import { navigateTo } from '$lib';
	import Github from '$lib/components/icon/github.svelte';
	import X from '$lib/components/icon/X.svelte';
	import LinkedIn from '$lib/components/icon/linkedin.svelte';

	const values = [
		{ label: 'Clean APIs', description: 'Well-designed contracts matter more than clever code.' },
		{ label: 'Ship it', description: 'Working software over perfect architecture.' },
		{ label: 'Keep learning', description: 'The best developers are permanent students.' }
	];

	const social = [
		{ label: 'GitHub', href: 'https://github.com/LukoOG', icon: Github },
		{ label: '', href: 'https://x.com/Sipe_OG1', icon: X },
		{
			label: 'LinkedIn',
			href: 'https://www.linkedin.com/in/emmanuel-adesipe-79b901365/',
			icon: LinkedIn
		}
	];

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.target instanceof HTMLInputElement) return;
		if (e.key === 'ArrowLeft') navigateTo('contact', '/contact', true);
		else if (e.key === 'ArrowRight') navigateTo('hero', '/', true);
	};
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Kalam:wght@300;400;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<svelte:window onkeydown={handleKeyDown} />

<AboutLayout>
	<div class="about-root">

		<!-- ═══════════════════════════════════════════════
		     LEVEL 1 — HERO: Who is this person?
		     ═══════════════════════════════════════════════ -->
		<section class="hero-section">
			<div class="hero-left">
				<span class="micro-label">About</span>

				<h1 class="hero-name">
					Emmanuel<br />
					<em class="cursive-accent">Adesipe</em>
				</h1>

				<p class="hero-role">Fullstack Developer <span class="role-sep">·</span> Backend Focus</p>

				<p class="hero-intro">
					I started coding because I wanted to understand how things worked — not just use them.
					That curiosity became a habit, and the habit became a craft. I build backend systems and
					the interfaces that sit on top of them, with a preference for clean contracts over clever
					tricks.
				</p>

				<p class="hero-intro">
					I care about the details most people skip: naming things well, writing code the next
					person can reason about, shipping something that actually works. I'm currently going deep
					on systems programming and distributed systems — because there's always another layer worth
					understanding.
				</p>

				<div class="social-row">
					{#each social as link}
						<a href={link.href} target="_blank" rel="noopener" class="social-link">
							<link.icon size={15} />
							{#if link.label}<span>{link.label}</span>{/if}
						</a>
					{/each}
				</div>
			</div>

			<div class="hero-right">
				<div class="photo-frame">
					<enhanced:img
						src={profilePic}
						alt="Emmanuel Adesipe"
						class="photo"
					/>
					<div class="photo-bg-shape"></div>
				</div>

				<div class="hero-stats">
					<div class="hero-stat">
						<span class="hero-stat-num">3</span>
						<span class="hero-stat-label">years coding</span>
					</div>
					<div class="hero-stat-divider"></div>
					<div class="hero-stat">
						<span class="hero-stat-num">5+</span>
						<span class="hero-stat-label">projects shipped</span>
					</div>
					<div class="hero-stat-divider"></div>
					<div class="hero-stat">
						<span class="hero-stat-num">2</span>
						<span class="hero-stat-label">blockchains explored</span>
					</div>
				</div>
			</div>
		</section>

		<!-- ═══════════════════════════════════════════════
		     LEVEL 2 — SUBSTANCE: What does he build?
		     ═══════════════════════════════════════════════ -->
		<section class="substance-section">

			<!-- Left: Philosophy + Approach -->
			<div class="substance-left">
				<div class="section-block philosophy-block">
					<span class="micro-label">How I think</span>
					<h2 class="section-title">
						<em class="cursive-accent cursive-lg">Things I believe</em>
					</h2>
					<div class="values-list">
						{#each values as value, i}
							<div class="value-item" style="animation-delay: {0.2 + i * 0.1}s">
								<div class="value-marker"></div>
								<div>
									<span class="value-label">{value.label}</span>
									<p class="value-desc">{value.description}</p>
								</div>
							</div>
						{/each}
					</div>
				</div>

				<div class="section-block approach-block">
					<span class="micro-label">My Approach</span>
					<div class="approach-grid">
						<div class="approach-item">
							<span class="approach-num">01</span>
							<h4 class="approach-title">Problem First</h4>
							<p class="approach-desc">
								I start by deeply understanding the problem before jumping to solutions. The best
								code solves real problems elegantly.
							</p>
						</div>
						<div class="approach-item">
							<span class="approach-num">02</span>
							<h4 class="approach-title">Iterative Development</h4>
							<p class="approach-desc">
								Ship early, gather feedback, iterate. Perfect is the enemy of good, but good is the
								foundation of great.
							</p>
						</div>
						<div class="approach-item">
							<span class="approach-num">03</span>
							<h4 class="approach-title">Documentation Matters</h4>
							<p class="approach-desc">
								Code is read more than it's written. Clear documentation saves countless hours.
							</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Right: Timeline + Currently -->
			<div class="substance-right">
				<div class="section-block timeline-block">
					<span class="micro-label">Journey</span>
					<h2 class="section-title">
						<em class="cursive-accent cursive-lg">The story so far</em>
					</h2>
					<div class="timeline">
						{#each timeline as item, i}
							<div class="timeline-item" class:is-current={item.type === 'current'} style="animation-delay: {0.2 + i * 0.12}s">
								<div class="tl-year-col">
									<span class="tl-year">{item.year}</span>
									<div class="tl-connector" class:current={item.type === 'current'}></div>
								</div>
								<div class="tl-content-col">
									<div class="tl-dot" class:current={item.type === 'current'}></div>
									<div class="tl-text">
										<p class="tl-title">{item.title}</p>
										<p class="tl-desc">{item.description}</p>
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>

				<div class="section-block currently-block">
					<span class="micro-label">Right now</span>
					<h2 class="section-title">
						<em class="cursive-accent cursive-lg">What I'm building</em>
					</h2>
					<div class="currently-list">
						<div class="currently-item">
							<span class="currently-key">Building</span>
							<span class="currently-val">Swix — a Twitter clone</span>
						</div>
						<div class="currently-item">
							<span class="currently-key">Learning</span>
							<span class="currently-val">Rust + systems programming</span>
						</div>
						<div class="currently-item">
							<span class="currently-key">Reading</span>
							<span class="currently-val">Designing Data-Intensive Applications</span>
						</div>
						<div class="currently-item highlight">
							<span class="currently-key">Open to</span>
							<span class="currently-val">Backend · Fullstack · Remote roles</span>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- ═══════════════════════════════════════════════
		     LEVEL 3 — PERSON: What makes him interesting?
		     ═══════════════════════════════════════════════ -->
		<section class="person-section">
			<div class="person-header">
				<span class="micro-label">Beyond the code</span>
				<h2 class="section-title">
					<em class="cursive-accent cursive-xl">Outside the terminal</em>
				</h2>
			</div>

			<div class="person-grid">
				<div class="interest-item">
					<div class="interest-icon-area">
						<span class="interest-glyph">🎮</span>
					</div>
					<div class="interest-text">
						<h4 class="interest-title">Gaming</h4>
						<p class="interest-desc">Strategy games and competitive multiplayer — the same instinct as debugging, but louder.</p>
					</div>
				</div>

				<div class="interest-item">
					<div class="interest-icon-area">
						<span class="interest-glyph">📚</span>
					</div>
					<div class="interest-text">
						<h4 class="interest-title">Reading</h4>
						<p class="interest-desc">Tech books, sci-fi, system design — anything that changes how I think about problems.</p>
					</div>
				</div>

				<div class="interest-item">
					<div class="interest-icon-area">
						<span class="interest-glyph">🎵</span>
					</div>
					<div class="interest-text">
						<h4 class="interest-title">Music</h4>
						<p class="interest-desc">Lo-fi for deep work, new artists for everything else. Good music makes the diff land cleaner.</p>
					</div>
				</div>

				<div class="interest-item">
					<div class="interest-icon-area">
						<span class="interest-glyph">🌍</span>
					</div>
					<div class="interest-text">
						<h4 class="interest-title">Travel</h4>
						<p class="interest-desc">Lagos, Nigeria — and curious about everywhere else. New places reset my perspective.</p>
					</div>
				</div>
			</div>

			<!-- Aside strip: fun facts -->
			<div class="facts-strip">
				<div class="fact">
					<span class="fact-mark">—</span>
					<p>My best work happens after 10 PM. The night is just quieter.</p>
				</div>
				<div class="fact">
					<span class="fact-mark">—</span>
					<p>I keep a personal wiki of everything I learn. Notes are how I think.</p>
				</div>
				<div class="fact">
					<span class="fact-mark">—</span>
					<p>Coffee first, then code. I've tried brewing methods from five different countries.</p>
				</div>
			</div>
		</section>

		<!-- ═══════════════════════════════════════════════
		     LEVEL 4 — TOOLS: Supporting information
		     ═══════════════════════════════════════════════ -->
		<section class="tools-section">
			<div class="tools-header">
				<span class="micro-label">Tech Stack</span>
				<p class="tools-sub">The tools I reach for — not the definition of who I am.</p>
			</div>

			<div class="tools-grid">
				<div class="tool-group">
					<span class="tool-group-label">Backend</span>
					<div class="tool-tags">
						<span class="tool-tag">Node.js</span>
						<span class="tool-tag">Python</span>
						<span class="tool-tag">PostgreSQL</span>
						<span class="tool-tag">Redis</span>
						<span class="tool-tag">Docker</span>
					</div>
				</div>
				<div class="tool-group">
					<span class="tool-group-label">Frontend</span>
					<div class="tool-tags">
						<span class="tool-tag">SvelteKit</span>
						<span class="tool-tag">React</span>
						<span class="tool-tag">TypeScript</span>
						<span class="tool-tag">Three.js</span>
						<span class="tool-tag">Tailwind</span>
					</div>
				</div>
				<div class="tool-group">
					<span class="tool-group-label">Tools & Infra</span>
					<div class="tool-tags">
						<span class="tool-tag">Git</span>
						<span class="tool-tag">Linux</span>
						<span class="tool-tag">AWS</span>
						<span class="tool-tag">GraphQL</span>
						<span class="tool-tag">REST APIs</span>
					</div>
				</div>
			</div>
		</section>

		<!-- ═══════════════════════════════════════════════
		     NAVIGATION
		     ═══════════════════════════════════════════════ -->
		<div class="page-nav">
			<button class="nav-btn" onclick={() => navigateTo('contact', '/contact', true)}>
				<span class="nav-arrow">←</span>
				Contact me
			</button>
			<button class="nav-btn" onclick={() => navigateTo('hero', '/', true)}>
				Home Page
				<span class="nav-arrow">→</span>
			</button>
		</div>

	</div>
</AboutLayout>

<style>
	/* ─────────────────────────────────────────────────────
	   BASE
	───────────────────────────────────────────────────── */
	:global(picture) {
		display: contents;
	}

	.about-root {
		width: 100%;
		max-width: 1100px;
		margin: 0 auto;
		padding: 3rem 2.5rem 4rem;
		color: white;
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.micro-label {
		display: block;
		font-size: 0.6rem;
		text-transform: uppercase;
		letter-spacing: 0.18em;
		color: rgba(255, 255, 255, 0.3);
		margin-bottom: 0.6rem;
	}

	.section-title {
		margin: 0 0 1.6rem;
		font-weight: 300;
		font-size: 1rem;
		letter-spacing: -0.01em;
		color: rgba(255, 255, 255, 0.85);
	}

	.cursive-accent {
		font-family: 'Kalam', cursive;
		font-style: normal;
		font-weight: 400;
		color: rgba(255, 255, 255, 0.9);
	}

	.cursive-lg {
		font-size: 1.35rem;
	}

	.cursive-xl {
		font-size: 1.75rem;
	}

	/* ─────────────────────────────────────────────────────
	   SECTION DIVIDER
	───────────────────────────────────────────────────── */
	.hero-section,
	.substance-section,
	.person-section,
	.tools-section {
		padding: 3rem 0;
	}

	.substance-section,
	.person-section,
	.tools-section {
		border-top: 1px solid rgba(255, 255, 255, 0.07);
	}

	/* ─────────────────────────────────────────────────────
	   LEVEL 1 — HERO SECTION
	───────────────────────────────────────────────────── */
	.hero-section {
		display: grid;
		grid-template-columns: 1fr 340px;
		gap: 4rem;
		align-items: start;
		animation: slide-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
	}

	.hero-name {
		font-size: clamp(2.8rem, 6vw, 4.5rem);
		font-weight: 200;
		letter-spacing: -0.03em;
		line-height: 1.05;
		margin: 0.4rem 0 1rem;
		color: white;
	}

	.hero-name .cursive-accent {
		font-size: clamp(3rem, 6.5vw, 5rem);
		color: rgba(210, 160, 255, 0.9);
	}

	.hero-role {
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.14em;
		color: rgba(255, 255, 255, 0.3);
		margin: 0 0 1.8rem;
	}

	.role-sep {
		margin: 0 0.4em;
		opacity: 0.4;
	}

	.hero-intro {
		font-size: 0.92rem;
		line-height: 1.75;
		color: rgba(255, 255, 255, 0.65);
		margin: 0 0 1rem;
		max-width: 520px;
	}

	/* Social row */
	.social-row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-top: 1.8rem;
	}

	.social-link {
		display: flex;
		align-items: center;
		gap: 0.35rem;
		padding: 0.35rem 0.75rem;
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.03);
		color: rgba(255, 255, 255, 0.5);
		font-size: 0.68rem;
		letter-spacing: 0.06em;
		text-decoration: none;
		transition:
			border-color 0.2s,
			color 0.2s,
			background 0.2s;
	}

	.social-link:hover {
		border-color: rgba(255, 255, 255, 0.28);
		color: white;
		background: rgba(255, 255, 255, 0.07);
	}

	/* Photo */
	.hero-right {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
		animation: slide-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
	}

	.photo-frame {
		position: relative;
		width: 100%;
	}

	.photo-bg-shape {
		position: absolute;
		inset: -6px -6px 6px 6px;
		border: 1px solid rgba(180, 100, 255, 0.18);
		border-radius: 3px;
		z-index: 0;
		pointer-events: none;
	}

	.photo {
		width: 100%;
		aspect-ratio: 3 / 4;
		object-fit: cover;
		object-position: center top;
		display: block;
		border-radius: 2px;
		position: relative;
		z-index: 1;
		filter: grayscale(15%);
		transition: filter 0.3s ease;
	}

	.photo:hover {
		filter: grayscale(0%);
	}

	/* Stats under photo */
	.hero-stats {
		display: flex;
		align-items: center;
		gap: 1.2rem;
		width: 100%;
		justify-content: center;
	}

	.hero-stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.2rem;
	}

	.hero-stat-num {
		font-size: 1.4rem;
		font-weight: 200;
		color: rgba(255, 255, 255, 0.9);
		letter-spacing: -0.02em;
		line-height: 1;
	}

	.hero-stat-label {
		font-size: 0.58rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: rgba(255, 255, 255, 0.25);
		text-align: center;
	}

	.hero-stat-divider {
		width: 1px;
		height: 1.8rem;
		background: rgba(255, 255, 255, 0.1);
	}

	/* ─────────────────────────────────────────────────────
	   LEVEL 2 — SUBSTANCE SECTION
	───────────────────────────────────────────────────── */
	.substance-section {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4rem;
		animation: slide-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both;
	}

	.section-block {
		display: flex;
		flex-direction: column;
	}

	.section-block + .section-block {
		margin-top: 3rem;
	}

	/* Philosophy / Values */
	.values-list {
		display: flex;
		flex-direction: column;
		gap: 1.1rem;
	}

	.value-item {
		display: flex;
		gap: 1rem;
		align-items: flex-start;
		animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
	}

	.value-marker {
		width: 3px;
		height: 3px;
		border-radius: 50%;
		background: rgba(180, 100, 255, 0.7);
		margin-top: 0.6rem;
		flex-shrink: 0;
	}

	.value-label {
		display: block;
		font-size: 0.78rem;
		font-weight: 500;
		color: rgba(255, 255, 255, 0.85);
		letter-spacing: 0.04em;
		margin-bottom: 0.2rem;
	}

	.value-desc {
		font-size: 0.75rem;
		color: rgba(255, 255, 255, 0.4);
		line-height: 1.55;
		margin: 0;
	}

	/* Approach */
	.approach-block {
		padding-top: 0.5rem;
	}

	.approach-grid {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.approach-item {
		padding: 1rem 1.1rem;
		border: 1px solid rgba(255, 255, 255, 0.06);
		background: rgba(255, 255, 255, 0.02);
		border-radius: 2px;
		position: relative;
		transition: border-color 0.2s, background 0.2s;
	}

	.approach-item:hover {
		border-color: rgba(255, 255, 255, 0.12);
		background: rgba(255, 255, 255, 0.04);
	}

	.approach-num {
		position: absolute;
		top: 0.75rem;
		right: 0.85rem;
		font-size: 0.6rem;
		letter-spacing: 0.1em;
		color: rgba(255, 255, 255, 0.12);
	}

	.approach-title {
		font-size: 0.78rem;
		font-weight: 500;
		color: rgba(255, 255, 255, 0.8);
		margin: 0 0 0.35rem;
		letter-spacing: 0.02em;
	}

	.approach-desc {
		font-size: 0.72rem;
		color: rgba(255, 255, 255, 0.4);
		line-height: 1.6;
		margin: 0;
	}

	/* Timeline */
	.timeline {
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.timeline-item {
		display: flex;
		gap: 0.8rem;
		animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
	}

	.tl-year-col {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		min-width: 2.6rem;
		padding-top: 0.15rem;
	}

	.tl-year {
		font-size: 0.62rem;
		letter-spacing: 0.06em;
		color: rgba(255, 255, 255, 0.25);
		line-height: 1.2;
	}

	.tl-connector {
		flex: 1;
		width: 1px;
		background: rgba(255, 255, 255, 0.08);
		margin: 0.3rem auto 0;
		min-height: 2rem;
	}

	.tl-connector.current {
		background: rgba(180, 100, 255, 0.35);
	}

	.tl-content-col {
		display: flex;
		gap: 0.75rem;
		align-items: flex-start;
		padding-bottom: 1.8rem;
		flex: 1;
	}

	.tl-dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.15);
		border: 1px solid rgba(255, 255, 255, 0.2);
		margin-top: 0.25rem;
		flex-shrink: 0;
		transition: background 0.2s;
	}

	.tl-dot.current {
		background: rgba(180, 100, 255, 0.7);
		border-color: rgba(180, 100, 255, 0.5);
		box-shadow: 0 0 8px rgba(180, 100, 255, 0.4);
	}

	.tl-title {
		font-size: 0.78rem;
		font-weight: 500;
		color: rgba(255, 255, 255, 0.8);
		margin: 0 0 0.3rem;
	}

	.tl-desc {
		font-size: 0.72rem;
		color: rgba(255, 255, 255, 0.38);
		line-height: 1.6;
		margin: 0;
	}

	/* Currently */
	.currently-block {
		background: rgba(180, 100, 255, 0.04);
		border: 1px solid rgba(180, 100, 255, 0.1);
		border-radius: 3px;
		padding: 1.4rem 1.5rem;
	}

	.currently-list {
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.currently-item {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 1rem;
		padding: 0.65rem 0;
		border-bottom: 1px solid rgba(255, 255, 255, 0.05);
	}

	.currently-item:last-child {
		border-bottom: none;
	}

	.currently-item.highlight .currently-val {
		color: rgba(180, 100, 255, 0.8);
	}

	.currently-key {
		font-size: 0.6rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: rgba(255, 255, 255, 0.25);
		flex-shrink: 0;
	}

	.currently-val {
		font-size: 0.78rem;
		color: rgba(255, 255, 255, 0.7);
		text-align: right;
	}

	/* ─────────────────────────────────────────────────────
	   LEVEL 3 — PERSON SECTION
	───────────────────────────────────────────────────── */
	.person-section {
		animation: slide-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
	}

	.person-header {
		margin-bottom: 2.2rem;
	}

	.person-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0;
	}

	.interest-item {
		display: flex;
		gap: 1.1rem;
		align-items: flex-start;
		padding: 1.4rem 1.2rem;
		border: 1px solid rgba(255, 255, 255, 0.05);
		margin: -1px -1px 0 0;
		transition: background 0.2s;
	}

	.interest-item:hover {
		background: rgba(255, 255, 255, 0.025);
	}

	.interest-icon-area {
		font-size: 1.4rem;
		line-height: 1;
		flex-shrink: 0;
		margin-top: 0.1rem;
	}

	.interest-glyph {
		display: block;
	}

	.interest-title {
		font-size: 0.8rem;
		font-weight: 500;
		color: rgba(255, 255, 255, 0.8);
		margin: 0 0 0.3rem;
	}

	.interest-desc {
		font-size: 0.72rem;
		color: rgba(255, 255, 255, 0.38);
		line-height: 1.55;
		margin: 0;
	}

	/* Facts strip */
	.facts-strip {
		display: flex;
		gap: 0;
		margin-top: 0;
		border-top: 1px solid rgba(255, 255, 255, 0.05);
	}

	.fact {
		flex: 1;
		padding: 1.2rem 1.2rem;
		border-right: 1px solid rgba(255, 255, 255, 0.05);
		display: flex;
		gap: 0.6rem;
		align-items: flex-start;
	}

	.fact:last-child {
		border-right: none;
	}

	.fact-mark {
		font-size: 0.9rem;
		color: rgba(180, 100, 255, 0.5);
		flex-shrink: 0;
		margin-top: 0.05rem;
		line-height: 1.55;
	}

	.fact p {
		font-size: 0.72rem;
		color: rgba(255, 255, 255, 0.35);
		line-height: 1.65;
		margin: 0;
		font-style: italic;
	}

	/* ─────────────────────────────────────────────────────
	   LEVEL 4 — TOOLS SECTION
	───────────────────────────────────────────────────── */
	.tools-section {
		animation: slide-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both;
	}

	.tools-header {
		margin-bottom: 1.6rem;
	}

	.tools-sub {
		font-size: 0.72rem;
		color: rgba(255, 255, 255, 0.25);
		margin: 0.3rem 0 0;
		font-style: italic;
	}

	.tools-grid {
		display: flex;
		gap: 3rem;
		flex-wrap: wrap;
	}

	.tool-group {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}

	.tool-group-label {
		font-size: 0.58rem;
		text-transform: uppercase;
		letter-spacing: 0.14em;
		color: rgba(255, 255, 255, 0.2);
	}

	.tool-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
	}

	.tool-tag {
		font-size: 0.66rem;
		padding: 0.25rem 0.65rem;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 999px;
		color: rgba(255, 255, 255, 0.45);
		background: rgba(255, 255, 255, 0.03);
		letter-spacing: 0.03em;
		transition: border-color 0.2s, color 0.2s;
	}

	.tool-tag:hover {
		border-color: rgba(255, 255, 255, 0.22);
		color: rgba(255, 255, 255, 0.7);
	}

	/* ─────────────────────────────────────────────────────
	   NAVIGATION
	───────────────────────────────────────────────────── */
	.page-nav {
		display: flex;
		justify-content: space-between;
		margin-top: 3rem;
		padding-top: 2rem;
		border-top: 1px solid rgba(255, 255, 255, 0.07);
	}

	.nav-btn {
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

	.nav-btn:hover {
		background: rgba(255, 255, 255, 0.09);
		border-color: rgba(255, 255, 255, 0.3);
		color: white;
	}

	.nav-arrow {
		transition: translate 0.2s;
		display: inline-block;
	}

	.nav-btn:hover .nav-arrow {
		translate: 3px 0;
	}

	/* ─────────────────────────────────────────────────────
	   ANIMATIONS
	───────────────────────────────────────────────────── */
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

	/* ─────────────────────────────────────────────────────
	   RESPONSIVE
	───────────────────────────────────────────────────── */
	@media (max-width: 900px) {
		.hero-section {
			grid-template-columns: 1fr;
			gap: 2.5rem;
		}

		.hero-right {
			flex-direction: row;
			align-items: flex-start;
			gap: 1.5rem;
		}

		.photo-frame {
			width: 180px;
			flex-shrink: 0;
		}

		.hero-stats {
			flex-direction: column;
			align-items: flex-start;
			justify-content: flex-start;
			gap: 1rem;
		}

		.hero-stat-divider {
			width: 2rem;
			height: 1px;
		}

		.substance-section {
			grid-template-columns: 1fr;
			gap: 0;
		}

		.substance-right {
			border-top: 1px solid rgba(255, 255, 255, 0.07);
			padding-top: 3rem;
		}
	}

	@media (max-width: 640px) {
		.about-root {
			padding: 2rem 1.25rem 3rem;
		}

		.person-grid {
			grid-template-columns: 1fr;
		}

		.facts-strip {
			flex-direction: column;
		}

		.fact {
			border-right: none;
			border-bottom: 1px solid rgba(255, 255, 255, 0.05);
		}

		.fact:last-child {
			border-bottom: none;
		}

		.tools-grid {
			gap: 1.8rem;
		}

		.hero-right {
			flex-direction: column;
		}

		.photo-frame {
			width: 100%;
			max-width: 260px;
		}

		.hero-stats {
			flex-direction: row;
			align-items: center;
			justify-content: center;
		}

		.hero-stat-divider {
			width: 1px;
			height: 1.8rem;
		}

		.currently-item {
			flex-direction: column;
			gap: 0.2rem;
		}

		.currently-val {
			text-align: left;
		}
	}
</style>
