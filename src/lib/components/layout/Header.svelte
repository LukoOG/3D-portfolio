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
		/* background: linear-gradient(135deg, rgba(0, 255, 225, 0.15), rgba(0, 150, 200, 0.1)); */
		backdrop-filter: blur(12px);
		display: flex;
		padding: 0.5rem 1rem;
		/* border-radius: 12px;
		border: 1px solid rgba(0, 255, 225, 0.1); */
	}

	/* Font styling and typewriter animation */
	h2 {
		font-family: 'Pacifico', 'Brush Script MT', cursive;
		font-style: italic;
		font-size: 3rem;
		color: #e0f7f7;

		/* Typewriter effect */
		overflow: hidden;
		white-space: nowrap;
		border-right: 3px solid rgba(224, 247, 247, 0.8);
		animation:
			typing 3s steps(15, end) forwards,
			blink-caret 0.75s step-end 4;
	}

	/* Typewriter keyframes */
	@keyframes typing {
		from {
			width: 0;
		}
		to {
			width: 15ch;
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
</style>
