<!-- src/routes/about/+page.svelte -->
<script lang="ts">
	import AboutLayout from '$lib/components/html/pageLayouts/AboutLayout.svelte';
	import { X as Twitter, Link as Linkedin } from '@lucide/svelte';
	import Github from '$lib/components/icon/github.svelte';
	import profilePic from '$lib/assets/profile/me.png?enhanced';
	import { timeline } from '$lib/states/timeline.svelte';
	import { navigateTo } from '$lib';

	const values = [
		{ label: 'Clean APIs', description: 'Well-designed contracts matter more than clever code.' },
		{ label: 'Ship it', description: 'Working software over perfect architecture.' },
		{ label: 'Keep learning', description: 'The best developers are permanent students.' }
	];

	const social = [
		{ label: 'GitHub', href: 'https://github.com/LukoOG', icon: Github },
		{ label: '', href: 'https://x.com/Sipe_OG1', icon: Twitter },
		{
			label: 'LinkedIn',
			href: 'https://www.linkedin.com/in/emmanuel-adesipe-79b901365/',
			icon: Linkedin
		}
	];

	// console.log(profilePic)

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.target instanceof HTMLInputElement) return;
		if (e.key === 'ArrowLeft') navigateTo('contact', '/contact', true);
		else if (e.key === 'ArrowRight') navigateTo('hero', '/', true);
	};
</script>

<svelte:window onkeydown={handleKeyDown} />

<AboutLayout>
	<div class="about-root">
		<!-- left column -->
		<div class="left">
			<!-- bio block -->
			<section class="section bio-section">
				<div class="photo-wrapper">
					<enhanced:img src={profilePic} alt="Emmanuel Adesipe's Profile Picture" class="photo" />
				</div>

				<span class="section-label">About</span>
				<h2 class="bio-name">Emmanuel<br />Adesipe</h2>
				<p class="bio-role">Fullstack Developer · Backend Focus</p>
				<p class="bio-text">
					I'm a fullstack developer with a passion for building scalable backend systems and elegant
					user experiences. I thrive on solving complex problems and turning ideas into
					production-ready applications. My journey in tech started with curiosity about how things
					work under the hood, and that curiosity continues to drive me to explore new technologies
					and push boundaries.
				</p>
				<p class="bio-text">
					When I'm not coding, you'll find me diving deep into system design patterns, contributing
					to open source, or experimenting with emerging technologies. I believe in writing code
					that's not just functional, but maintainable, testable, and a joy to work with.
				</p>

				<div class="social">
					{#each social as link}
						<a href={link.href} target="_blank" rel="noopener" class="social-link">
							<link.icon size={14} />
							<span>{link.label}</span>
						</a>
					{/each}
				</div>
			</section>

			<!-- values -->
			<section class="section">
				<span class="section-label">What I believe</span>
				<div class="values">
					{#each values as value, i}
						<div class="value" style="animation-delay: {0.3 + i * 0.08}s">
							<span class="value-label">{value.label}</span>
							<p class="value-desc">{value.description}</p>
						</div>
					{/each}
				</div>
			</section>

			<!-- tech stack -->
			<section class="section">
				<span class="section-label">Tech Stack</span>
				<div class="tech-categories">
					<div class="tech-category">
						<h4 class="tech-category-title">Backend</h4>
						<div class="tech-tags">
							<span class="tech-tag">Node.js</span>
							<span class="tech-tag">Python</span>
							<span class="tech-tag">PostgreSQL</span>
							<span class="tech-tag">Redis</span>
							<span class="tech-tag">Docker</span>
						</div>
					</div>
					<div class="tech-category">
						<h4 class="tech-category-title">Frontend</h4>
						<div class="tech-tags">
							<span class="tech-tag">SvelteKit</span>
							<span class="tech-tag">React</span>
							<span class="tech-tag">TypeScript</span>
							<span class="tech-tag">Three.js</span>
							<span class="tech-tag">Tailwind</span>
						</div>
					</div>
					<div class="tech-category">
						<h4 class="tech-category-title">Tools & Others</h4>
						<div class="tech-tags">
							<span class="tech-tag">Git</span>
							<span class="tech-tag">Linux</span>
							<span class="tech-tag">AWS</span>
							<span class="tech-tag">GraphQL</span>
							<span class="tech-tag">REST APIs</span>
						</div>
					</div>
				</div>
			</section>

			<!-- approach -->
			<section class="section">
				<span class="section-label">My Approach</span>
				<div class="approach-items">
					<div class="approach-item">
						<h4 class="approach-title">Problem First</h4>
						<p class="approach-desc">
							I start by deeply understanding the problem before jumping to solutions. The best code
							solves real problems elegantly.
						</p>
					</div>
					<div class="approach-item">
						<h4 class="approach-title">Iterative Development</h4>
						<p class="approach-desc">
							Ship early, gather feedback, iterate. Perfect is the enemy of good, but good is the
							foundation of great.
						</p>
					</div>
					<div class="approach-item">
						<h4 class="approach-title">Documentation Matters</h4>
						<p class="approach-desc">
							Code is read more than it's written. Clear documentation and self-explanatory code
							save countless hours down the line.
						</p>
					</div>
				</div>
			</section>
		</div>

		<!-- right column -->
		<div class="right">
			<!-- stats -->
			<section class="section stats-section">
				<div class="stats">
					<div class="stat">
						<span class="stat-num">3</span>
						<span class="stat-label">Years coding</span>
					</div>
					<div class="stat">
						<span class="stat-num">5+</span>
						<span class="stat-label">Projects shipped</span>
					</div>
					<div class="stat">
						<span class="stat-num">2</span>
						<span class="stat-label">Blockchains explored</span>
					</div>
				</div>
			</section>

			<!-- timeline -->
			<section class="section">
				<span class="section-label">Timeline</span>
				<div class="timeline">
					{#each timeline as item, i}
						<div class="timeline-item" style="animation-delay: {0.2 + i * 0.1}s">
							<div class="timeline-left">
								<span class="timeline-year">{item.year}</span>
								<div class="timeline-line" class:current={item.type === 'current'}></div>
							</div>
							<div class="timeline-right">
								<div class="timeline-dot" class:current={item.type === 'current'}></div>
								<div class="timeline-content">
									<p class="timeline-title">{item.title}</p>
									<p class="timeline-desc">{item.description}</p>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</section>

			<!-- currently section -->
			<section class="section currently">
				<span class="section-label">Currently</span>
				<div class="current-items">
					<div class="current-item">
						<span class="current-key">Building</span>
						<span class="current-val">Swix — a Twitter clone</span>
					</div>
					<div class="current-item">
						<span class="current-key">Learning</span>
						<span class="current-val">Rust + systems programming</span>
					</div>
					<div class="current-item">
						<span class="current-key">Reading</span>
						<span class="current-val">Designing Data-Intensive Applications</span>
					</div>
					<div class="current-item">
						<span class="current-key">Open to</span>
						<span class="current-val">Backend · Fullstack · Remote roles</span>
					</div>
				</div>

				<!-- interests & hobbies -->
				<section class="section">
					<span class="section-label">Beyond Code</span>
					<div class="interests-grid">
						<div class="interest-card">
							<span class="interest-emoji">🎮</span>
							<h4 class="interest-title">Gaming</h4>
							<p class="interest-desc">Strategy games and competitive multiplayer</p>
						</div>
						<div class="interest-card">
							<span class="interest-emoji">📚</span>
							<h4 class="interest-title">Reading</h4>
							<p class="interest-desc">Tech books, sci-fi, and system design</p>
						</div>
						<div class="interest-card">
							<span class="interest-emoji">🎵</span>
							<h4 class="interest-title">Music</h4>
							<p class="interest-desc">Coding soundtracks and discovering new artists</p>
						</div>
						<div class="interest-card">
							<span class="interest-emoji">🌍</span>
							<h4 class="interest-title">Travel</h4>
							<p class="interest-desc">Exploring new places and cultures</p>
						</div>
					</div>
				</section>

				<!-- fun facts -->
				<section class="section">
					<span class="section-label">Fun Facts</span>
					<div class="fun-facts">
						<div class="fun-fact">
							<span class="fact-icon">💡</span>
							<p class="fact-text">I debug better with music on — preferably lo-fi beats</p>
						</div>
						<div class="fun-fact">
							<span class="fact-icon">☕</span>
							<p class="fact-text">
								Coffee enthusiast — I've tried brewing methods from 5 different countries
							</p>
						</div>
						<div class="fun-fact">
							<span class="fact-icon">🌙</span>
							<p class="fact-text">Night owl coder — my best work happens after 10 PM</p>
						</div>
						<div class="fun-fact">
							<span class="fact-icon">🎯</span>
							<p class="fact-text">I maintain a personal wiki of everything I learn</p>
						</div>
					</div>
				</section>
			</section>
		</div>

		<div class="flex flex-row justify-between gap-1">
			<!-- left button -->
			<span>
				<button class="cta" onclick={() => navigateTo('contact', '/contact', true)}>
					<span class="arrow">←</span>
					Contact me
				</button>
			</span>

			<!-- right button -->
			<span class="flex-end flex flex-row justify-end">
				<button class="cta" onclick={() => navigateTo('hero', '/', true)}>
					Home Page
					<span class="arrow">→</span>
				</button>
			</span>
		</div>
	</div>
</AboutLayout>

<style>
	/* because of enhanced:img adding a picture tag on the img elemtn  */
	picture {
		min-width: max-content;
	}

	.about-root {
		width: 100%;
		min-height: 100%;
		padding: 2rem 1.75rem 3rem;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
		align-items: start;
	}

	@media (max-width: 768px) {
		.about-root {
			grid-template-columns: 1fr;
			padding: 1.5rem 1rem 2rem;
			gap: 0;
		}
	}

	/* sections */
	.section {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both;
	}

	.section + .section {
		margin-top: 2rem;
		padding-top: 2rem;
		border-top: 1px solid rgba(255, 255, 255, 0.05);
	}

	.section-label {
		font-size: 0.58rem;
		text-transform: uppercase;
		letter-spacing: 0.14em;
		color: rgba(255, 255, 255, 0.25);
	}

	/* bio */
	.bio-name {
		font-size: clamp(1.4rem, 2.5vw, 2rem);
		font-weight: 200;
		letter-spacing: -0.02em;
		line-height: 1.1;
		margin: 0;
		color: rgba(255, 255, 255, 0.92);
	}

	.bio-role {
		font-size: 0.65rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: rgba(255, 255, 255, 0.3);
		margin: 0;
	}

	.bio-text {
		font-size: 0.75rem;
		line-height: 1.75;
		color: rgba(255, 255, 255, 0.5);
		margin: 0;
		max-width: 65ch;
	}

	@media (max-width: 768px) {
		.bio-text {
			max-width: 100%;
			font-size: 0.7rem;
			line-height: 1.65;
		}
	}

	.photo-wrapper {
		display: flex;
		justify-content: center;
		margin-bottom: 1rem;
	}

	.photo {
		width: 120px;
		height: 120px;
		border-radius: 50%;
		object-fit: cover;
		border: 2px solid rgba(255, 255, 255, 0.15);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
		flex-shrink: 0;
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
	}

	.photo:hover {
		transform: scale(1.05);
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
	}

	@media (max-width: 768px) {
		.photo {
			width: 100px;
			height: 100px;
		}
	}

	.social {
		display: flex;
		gap: 0.6rem;
		flex-wrap: wrap;
	}

	.social-link {
		display: flex;
		align-items: center;
		gap: 0.3rem;
		font-size: 0.65rem;
		color: rgba(255, 255, 255, 0.35);
		padding: 0.3rem 0.65rem;
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 999px;
		text-decoration: none;
		transition:
			color 0.2s,
			border-color 0.2s;
	}

	.social-link:hover {
		color: rgba(255, 255, 255, 0.8);
		border-color: rgba(255, 255, 255, 0.2);
	}

	/* stats */
	.stats {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.5rem;
	}

	@media (max-width: 768px) {
		.stats {
			grid-template-columns: repeat(3, 1fr);
			gap: 0.4rem;
		}

		.stat {
			padding: 0.7rem 0.5rem;
		}

		.stat-num {
			font-size: 1.3rem;
		}

		.stat-label {
			font-size: 0.55rem;
		}
	}

	.stat {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		padding: 0.85rem;
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 10px;
		background: rgba(255, 255, 255, 0.02);
	}

	.stat-num {
		font-size: 1.5rem;
		font-weight: 200;
		color: rgba(255, 255, 255, 0.85);
		letter-spacing: -0.02em;
		line-height: 1;
	}

	.stat-label {
		font-size: 0.58rem;
		color: rgba(255, 255, 255, 0.25);
		letter-spacing: 0.06em;
	}

	.cta {
		margin-top: 0.75rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1.1rem;
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.06);
		color: rgba(255, 255, 255, 0.8);
		font-size: 0.75rem;
		letter-spacing: 0.06em;
		cursor: pointer;
		transition:
			background 0.2s,
			border-color 0.2s,
			color 0.2s;
		animation: slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both;
	}

	.cta:hover {
		background: rgba(255, 255, 255, 0.12);
		border-color: rgba(255, 255, 255, 0.35);
		color: white;
	}

	.arrow {
		transition: translate 0.2s;
	}

	.cta:hover .arrow {
		translate: 3px 0;
	}

	/* values */
	.values {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.value {
		padding: 0.75rem;
		border: 1px solid rgba(255, 255, 255, 0.05);
		border-radius: 8px;
		background: rgba(255, 255, 255, 0.02);
		opacity: 0;
		animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
	}

	.value-label {
		font-size: 0.68rem;
		color: rgba(255, 255, 255, 0.7);
		font-weight: 400;
		display: block;
		margin-bottom: 0.2rem;
	}

	.value-desc {
		font-size: 0.65rem;
		color: rgba(255, 255, 255, 0.3);
		margin: 0;
		line-height: 1.5;
	}

	/* timeline */
	.timeline {
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.timeline-item {
		display: flex;
		gap: 0.75rem;
		opacity: 0;
		animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
	}

	.timeline-left {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		width: 2.5rem;
		flex-shrink: 0;
		padding-top: 0.1rem;
	}

	.timeline-year {
		font-size: 0.58rem;
		color: rgba(255, 255, 255, 0.25);
		letter-spacing: 0.06em;
	}

	.timeline-line {
		flex: 1;
		width: 1px;
		background: rgba(255, 255, 255, 0.06);
		margin-top: 0.35rem;
		min-height: 1.5rem;
	}

	.timeline-line.current {
		background: rgba(74, 222, 128, 0.3);
	}

	.timeline-right {
		display: flex;
		gap: 0.6rem;
		padding-bottom: 1.25rem;
		flex: 1;
	}

	.timeline-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.15);
		flex-shrink: 0;
		margin-top: 0.2rem;
	}

	.timeline-dot.current {
		background: #4ade80;
		box-shadow: 0 0 6px #4ade80;
	}

	.timeline-content {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	.timeline-title {
		font-size: 0.72rem;
		color: rgba(255, 255, 255, 0.75);
		margin: 0;
		font-weight: 400;
	}

	.timeline-desc {
		font-size: 0.65rem;
		color: rgba(255, 255, 255, 0.35);
		margin: 0;
		line-height: 1.55;
	}

	/* currently */
	.current-items {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.current-item {
		display: flex;
		align-items: baseline;
		gap: 0.75rem;
		padding: 0.5rem 0;
		border-bottom: 1px solid rgba(255, 255, 255, 0.04);
	}

	.current-key {
		font-size: 0.58rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: rgba(255, 255, 255, 0.2);
		width: 4rem;
		flex-shrink: 0;
	}

	.current-val {
		font-size: 0.7rem;
		color: rgba(255, 255, 255, 0.6);
	}

	/* tech stack */
	.tech-categories {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.tech-category {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.tech-category-title {
		font-size: 0.68rem;
		color: rgba(255, 255, 255, 0.6);
		font-weight: 400;
		margin: 0;
		letter-spacing: 0.05em;
	}

	.tech-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}

	.tech-tag {
		font-size: 0.62rem;
		padding: 0.35rem 0.7rem;
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.03);
		color: rgba(255, 255, 255, 0.5);
		transition: all 0.2s;
	}

	.tech-tag:hover {
		background: rgba(255, 255, 255, 0.08);
		border-color: rgba(255, 255, 255, 0.15);
		color: rgba(255, 255, 255, 0.75);
	}

	/* approach */
	.approach-items {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.approach-item {
		padding: 0.85rem;
		border: 1px solid rgba(255, 255, 255, 0.05);
		border-radius: 8px;
		background: rgba(255, 255, 255, 0.02);
	}

	.approach-title {
		font-size: 0.7rem;
		color: rgba(255, 255, 255, 0.7);
		font-weight: 400;
		margin: 0 0 0.3rem 0;
	}

	.approach-desc {
		font-size: 0.65rem;
		color: rgba(255, 255, 255, 0.35);
		margin: 0;
		line-height: 1.6;
	}

	/* interests */
	.interests-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.6rem;

		@media (max-width: 768px) {
			.interests-grid {
				grid-template-columns: 1fr;
				gap: 0.5rem;
			}
		}
	}

	.interest-card {
		padding: 0.85rem;
		border: 1px solid rgba(255, 255, 255, 0.05);
		border-radius: 8px;
		background: rgba(255, 255, 255, 0.02);
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		transition: all 0.2s;
	}

	.interest-card:hover {
		background: rgba(255, 255, 255, 0.04);
		border-color: rgba(255, 255, 255, 0.1);
	}

	.interest-emoji {
		font-size: 1.5rem;
		line-height: 1;
	}

	.interest-title {
		font-size: 0.7rem;
		color: rgba(255, 255, 255, 0.7);
		font-weight: 400;
		margin: 0;
	}

	.interest-desc {
		font-size: 0.62rem;
		color: rgba(255, 255, 255, 0.35);
		margin: 0;
		line-height: 1.5;
	}

	/* fun facts */
	.fun-facts {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}

	.fun-fact {
		display: flex;
		align-items: flex-start;
		gap: 0.6rem;
		padding: 0.7rem;
		border: 1px solid rgba(255, 255, 255, 0.05);
		border-radius: 8px;
		background: rgba(255, 255, 255, 0.02);
	}

	.fact-icon {
		font-size: 1.2rem;
		line-height: 1;
		flex-shrink: 0;
	}

	.fact-text {
		font-size: 0.68rem;
		color: rgba(255, 255, 255, 0.5);
		margin: 0;
		line-height: 1.6;
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
