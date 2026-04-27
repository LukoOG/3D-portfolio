<!-- src/routes/about/+page.svelte -->
<script lang="ts">
	import AboutLayout from '$lib/components/html/pageLayouts/AboutLayout.svelte';
	import {
		GitBranchPlus as Github,
		X as Twitter,
		Link as Linkedin,
		ExternalLink
	} from '@lucide/svelte';
  import profilePic from '$lib/assets/profile/me.png'

	const timeline = [
		{
			year: '2025',
			title: 'Open to opportunities',
			description: 'Actively seeking fullstack or backend roles.',
			type: 'current'
		},
		{
			year: '2024',
			title: 'Bootcamp Graduate',
			description:
				'Completed an intensive fullstack development bootcamp, sharpening backend systems and API design.',
			type: 'education'
		},
		{
			year: '2023',
			title: 'Self-taught Journey Begins',
			description:
				'Started learning programming independently — fell in love with building backend systems.',
			type: 'education'
		}
	];

	const values = [
		{ label: 'Clean APIs', description: 'Well-designed contracts matter more than clever code.' },
		{ label: 'Ship it', description: 'Working software over perfect architecture.' },
		{ label: 'Keep learning', description: 'The best developers are permanent students.' }
	];

	const social = [
		{ label: 'GitHub', href: 'https://github.com/LukoOG', icon: Github },
		{ label: '', href: 'https://x.com/Sipe_OG1', icon: Twitter },
		{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/emmanuel-adesipe-79b901365/', icon: Linkedin }
	];
</script>

<AboutLayout>
	<div class="about-root">
		<!-- left column -->
		<div class="left">
			<!-- bio block -->
			<section class="section bio-section">

				<div class="photo-block">
					<img src={profilePic} alt="Emmanuel Adesipe" class="photo" />
					<div class="photo-info">
						<h2 class="bio-name">Emmanuel<br />Adesipe</h2>
						<p class="bio-role">Fullstack Developer · Backend Focus</p>
					</div>
				</div>

				<span class="section-label">About</span>
				<h2 class="bio-name">Emmanuel<br />Adesipe</h2>
				<p class="bio-role">Fullstack Developer · Backend Focus</p>
				<p class="bio-text">
					Your bio goes here. Talk about what drives you, the kinds of problems you love solving,
					and what makes you different as a developer. Keep it human, not a resume.
				</p>

				<div class="social">
					{#each social as link}
						<a href={link.href} target="_blank" rel="noopener" class="social-link">
							<!-- <svelte:component this={link.icon} size={14} /> -->
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
								<div class="timeline-line" class:current={item.type === 'current'} />
							</div>
							<div class="timeline-right">
								<div class="timeline-dot" class:current={item.type === 'current'} />
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
			</section>
		</div>
	</div>
</AboutLayout>

<style>
	.about-root {
		width: 100%;
		min-height: 100%;
		padding: 2rem 1.75rem 3rem;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
		align-items: start;
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
	}

	.photo-block {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.photo {
		width: 64px;
		height: 64px;
		border-radius: 50%;
		object-fit: cover;
		border: 1px solid rgba(255, 255, 255, 0.1);
		flex-shrink: 0;
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
