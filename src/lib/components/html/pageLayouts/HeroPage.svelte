<!-- src/lib/components/html/PageTransition.svelte -->
<script lang="ts">
	import type { Snippet } from 'svelte';
	let { children }: { children: Snippet; scrollable?: boolean } = $props();
</script>

<div class="hero-root">
	<!-- The cross lines -->
	<div class="cross">
		<div class="line horizontal"></div>
		<div class="line vertical"></div>
	</div>

	<!-- Content quadrants -->
	<div class="content">
		{@render children()}
	</div>

	<div class="stats">
		<div class="stat">
			<span class="stat-num">3+</span>
			<span class="stat-label">Years exp.</span>
		</div>
		<div class="divider" />
		<div class="stat">
			<span class="stat-num">10+</span>
			<span class="stat-label">Projects shipped</span>
		</div>
		<div class="divider" />
		<div class="stat">
			<span class="stat-num">2</span>
			<span class="stat-label">Frameworks mastered</span>
		</div>
	</div>
</div>

<style>
	.hero-root {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.cross {
		position: absolute;
		inset: 0;
		pointer-events: none;
		z-index: 1;
	}

	.line {
		position: absolute;
		background: rgba(255, 255, 255, 0.15);
	}

	.horizontal {
		left: 0;
		right: 0;
		top: 50%;
		height: 1px;
		transform: scaleX(0);
		animation: grow-h 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards;
	}

	.vertical {
		top: 0;
		bottom: 0;
		left: 50%;
		width: 1px;
		transform: scaleY(0);
		animation: grow-v 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
	}

	.content {
		position: relative;
		z-index: 2;
		width: 100%;
		height: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
	}

	.stats {
		position: absolute;
		top: 50%;
		left: 50%;
		translate: -50% -50%;
		display: flex;
		align-items: center;
		gap: 2rem;
		z-index: 2;
		animation: slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.65s both;
	}

	.stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.2rem;
	}

	.stat-num {
		font-size: clamp(1.2rem, 2.5vw, 1.8rem);
		font-weight: 200;
		color: rgba(255, 255, 255, 0.9);
		letter-spacing: -0.02em;
	}

	.stat-label {
		font-size: 0.6rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: rgba(255, 255, 255, 0.25);
	}

	.divider {
		width: 1px;
		height: 2rem;
		background: rgba(255, 255, 255, 0.1);
	}
	
	@keyframes grow-h {
		from {
			transform: scaleX(0);
		}
		to {
			transform: scaleX(1);
		}
	}

	@keyframes grow-v {
		from {
			transform: scaleY(0);
		}
		to {
			transform: scaleY(1);
		}
	}
</style>
