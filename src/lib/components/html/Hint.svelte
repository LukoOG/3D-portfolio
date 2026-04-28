<script lang="ts">
	let { visible = true }: { visible: boolean } = $props();
</script>

{#if visible}
	<div class="hint">
		<div class="relative">
			<h2>Welcome to My Portfolio</h2>
			<button class="close" onclick={() => (visible = !visible)}>continue</button>
			<div class="hint-body">
				<p>
					Navigation on my portfolio doesn't work the same as most websites. Each face of the cube
					corresponds to a page of my portfolio.
				</p>
				<p>
					If you're on a PC, use the numerical keys 1-6 to face the desired page or simply click the
					navigation menu buttons.
				</p>
				<p class="clue">
					Interested in unlocking the mystery page? Visit all pages to get a clue!😉
				</p>
			</div>
		</div>
	</div>
{/if}

<style>
	/* Main Hint Box */
	.hint {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 1rem;
		background: #1a1a1a; /* Dark solid background to create contrast */
		color: #ffffff; /* White text for maximum readability */
		padding: 30px;
		border-radius: 16px;
		z-index: 1000;
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.6); /* Darker shadow for emphasis */
		max-width: 90%; /* Mobile-friendly */
		width: 370px;
		text-align: center;
		overflow: hidden; /* Prevent any content overflow */
	}

	/* Heading */
	.hint h2 {
		font-size: 1.8rem;
		font-weight: 700;
		margin-bottom: 1.5rem;
		text-transform: uppercase;
		letter-spacing: 1.5px;
		color: #c0c0c0; /* Bright yellow for high contrast */
		text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.6); /* Stronger shadow to improve legibility */
	}

	/* Paragraphs */
	.hint p {
		font-size: 1.1rem;
		line-height: 1.7;
		margin-bottom: 1.5rem;
		color: #e0e0e0; /* Light gray text for readability */
		font-weight: 300;
	}

	/* Clue (Important message) */
	.hint .clue {
		font-size: 1.2rem;
		font-weight: 600;
		color: #0ff0fc; /* Red for call to action */
		border-top: 1px solid #444444; /* Subtle divider */
		padding-top: 1rem;
	}

	.close {
		position: absolute;
		bottom: -2.5rem;
		right: 50%;
        translate: 50% 0;
		background: rgba(255, 255, 255, 0.3);
		border: 1px solid rgba(255, 255, 255, 0.2);
		color: rgba(255, 255, 255, 0.6);
		border-radius: 5%;
		width: 6rem;
		height: 2rem;
		cursor: pointer;
		font-size: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10;
	}

	.close:hover {
		background: rgba(255, 255, 255, 0.1);
		color: white;
	}

	/* Mobile Adjustments */
	@media (max-width: 480px) {
		.hint {
			max-width: 95%;
			padding: 20px;
		}

		.hint h2 {
			font-size: 1.6rem;
		}

		.hint p {
			font-size: 1rem;
		}

		.hint .clue {
			font-size: 1.1rem;
		}
	}

	@keyframes fadeinout {
		0% {
			opacity: 0;
		}
		20% {
			opacity: 1;
		}
		80% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
</style>
