<script lang="ts">
</script>

<header class="cube-header">
	<div>
		<h2>Sipe's Portfolio</h2>
	</div>
</header>

<style>
	/* Header positioning */
	header {
		position: fixed;
		top: 0;
		left: 50%;
		translate: -50% 0;
		z-index: 10;
		width: max-content;
	}

	/* Gradient, semi-transparent background with glow */
	header div {
		display: flex;
		padding: 0.5rem 1rem;
		left: 50%;
	}

	/* Font styling and typewriter animation */
	h2 {
		font-family: 'Pacifico', 'Brush Script MT', cursive;
		font-style: italic;
		font-size: clamp(1.8rem, 5vw, 3.5rem);
		font-weight: 600;
		color: #f4ffff;

		/* Typewriter effect */
		overflow: hidden;
		white-space: nowrap;
		animation:
			typing 3s steps(15, end) forwards,
			blink-caret 0.75s step-end 4;
	}

	/* Typewriter keyframes */
	@keyframes typing {
		from {
			border-right: 3px solid rgba(224, 247, 247, 0.8);
			width: 0;
		}
		to {
			border-right: transparent;
			width: 13ch;
		}
	}

	/* Blink animation only a few times to disappear */
	@keyframes blink-caret {
		0%,
		100% {
			border-color: transparent;
		}
		50% {
			border-color: rgba(224, 247, 247, 0.8);
		}
	}

	@media (max-width: 600px) {
		h2 {
			font-size: 2rem;
			animation:
				typing 3s steps(12, end) forwards,
				blink-caret 0.75s step-end 4;
		}

		@keyframes typing {
			to {
				width: 10ch;
			}
		}
	}
</style>
