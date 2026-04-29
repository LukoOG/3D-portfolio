<!-- src/routes/+page.svelte -->
<script lang="ts">
	import HeroLayout from '$lib/components/html/pageLayouts/HeroLayout.svelte';
	import { navigateTo } from '$lib/index';
	import { testimonials } from '$lib/states/testimonials.svelte';

	let index = $state(0);

	// $effect(() => {
	// 	const timer = setTimeout(() => {
	// 		index += 1;
	// 		index %= testimonials.length;
	// 	}, 3500);
	// 	console.log(index)
	// 	return () => clearInterval(timer);
	// });
</script>

<HeroLayout>
	<!-- top left: role -->
	<div class="quadrant tl">
		<div class="role-badge">
			<span class="dot"></span>
			Backend-focused
		</div>
		<p class="availability">Open to opportunities</p>
	</div>

	<!-- top right: stack -->
	<div class="quadrant tr">
		<div class="stack">
			<span class="stack-label">Backend</span>
			<div class="pills">
				<span>NestJS</span>
				<span>Django</span>
				<span>Flask</span>
				<span>PostgreSQL</span>
			</div>
			<span class="stack-label" style="margin-top: 0.75rem">Frontend</span>
			<div class="pills">
				<span>SvelteKit</span>
				<span>Next.js</span>
			</div>
		</div>
	</div>

	<!-- bottom left: decorative year + quote -->
	<div class="quadrant bl sm:p-0">
		<p class="title">What people say about me</p>
		{#key index}
			<div class="testimonial">
				<p class="testimonial-text">
					{testimonials[index].text}
				</p>
				<p class="testimonial-author">{testimonials[index].author}</p>
			</div>
		{/key}
		<p class="year">EST. {new Date().getFullYear()}</p>
		<p class="quote">"APIs, pipelines and the<br />occasional pretty frontend."</p>
		<div class="about">
			<button class="cta" onclick={() => navigateTo('about', '/about', true)}>
				<span class="arrow">←</span>
				Get to know me
			</button>
		</div>
	</div>

	<!-- bottom right: name + CTA -->
	<div class="quadrant br">
		<div class="intro">
			<h1 class="name">Emmanuel Adesipe</h1>
			<p class="title">Fullstack Developer</p>
			<button class="cta" onclick={() => navigateTo('projects', '/projects', true)}>
				See my work
				<span class="arrow">→</span>
			</button>
		</div>
	</div>
</HeroLayout>

<style>
	/* quadrant base */
	.quadrant {
		padding: 1.75rem;
		display: flex;
		flex-direction: column;
		color: white;
	}

	.tl {
		justify-content: flex-start;
		align-items: flex-start;
	}
	.tr {
		justify-content: center;
		align-items: flex-end;
	}
	.bl {
		justify-content: flex-end;
		align-items: flex-start;
	}
	.br {
		justify-content: flex-end;
		align-items: flex-end;
	}

	/* top left */
	.role-badge {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.7rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.5);
		animation: slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both;
	}

	.dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: #4ade80;
		box-shadow: 0 0 6px #4ade80;
		animation: pulse 2s ease-in-out infinite;
	}

	.availability {
		margin-top: 0.4rem;
		font-size: 0.65rem;
		color: rgba(255, 255, 255, 0.25);
		letter-spacing: 0.08em;
		animation: slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both;
	}

	/* top right */
	.stack {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 0.3rem;
		animation: slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.35s both;
	}

	.stack-label {
		font-size: 0.6rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: rgba(255, 255, 255, 0.25);
	}

	.pills {
		display: flex;
		flex-wrap: wrap;
		gap: 0.3rem;
		justify-content: flex-end;
	}

	.pills span {
		font-size: 0.65rem;
		padding: 0.2rem 0.55rem;
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 999px;
		color: rgba(255, 255, 255, 0.55);
		background: rgba(255, 255, 255, 0.04);
		letter-spacing: 0.04em;
	}

	/* bottom left */
	.year {
		font-size: 0.6rem;
		letter-spacing: 0.15em;
		color: rgba(255, 255, 255, 0.15);
		margin: 0 0 0.5rem;
		animation: slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both;
	}

	.quote {
		font-size: 0.72rem;
		line-height: 1.6;
		color: rgba(255, 255, 255, 0.3);
		font-style: italic;
		margin: 0;
		animation: slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.55s both;
	}

	/* bottom right */
	.intro {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 0.4rem;
	}

	.name {
		font-size: clamp(1.6rem, 3.5vw, 2.8rem);
		font-weight: 300;
		letter-spacing: -0.02em;
		margin: 0;
		line-height: 1;
		animation: slide-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both;
	}

	.title {
		font-size: 0.9rem;
		text-transform: uppercase;
		letter-spacing: 0.14em;
		color: rgba(255, 255, 255, 0.4);
		margin: 0;
		animation: slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both;
	}

	.testimonial {
		margin: 0.6rem 0 0.8rem;
		max-width: 320px;
		border-left: 1px solid rgba(255, 255, 255, 0.08);
		padding-left: 0.6rem;
		animation: slide-left-in 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
	}

	.testimonial-text {
		font-size: 0.75rem;
		line-height: 1.5;
		color: rgba(255, 255, 255, 0.8);
		margin: 0 0 0.35rem;
	}

	.testimonial-author {
		font-size: 0.85rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.35);
		margin: 0;
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

	@media (max-width: 640px) {
		.quadrant.bl {
			padding: 0.5rem 0.5rem 1.75rem 0.5rem; /* smaller padding for mobile */
		}
	}

	/* shared animations */
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

	@keyframes slide-left-in {
		from {
			opacity: 0;
			translate: 16px 0;
		}
		to {
			opacity: 1;
			translate: 0 0;
		}
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.4;
		}
	}
</style>
