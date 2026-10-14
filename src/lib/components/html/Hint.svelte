<script lang="ts">
	let { visible = true }: { visible: boolean } = $props();

	let open = $state(false);
	let closeBtn: HTMLButtonElement | undefined = $state();

	$effect(() => {
		if (visible) open = true;
	});

	$effect(() => {
		if (open) closeBtn?.focus();
	});

	function close() {
		open = false;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' || e.key === 'Enter') {
			// keep Enter from also opening whichever face the cube is on
			e.preventDefault();
			e.stopPropagation();
			close();
		}
	}
</script>

{#if open}
	<div class="backdrop" onclick={close} aria-hidden="true"></div>
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<div
		class="hint"
		role="dialog"
		aria-modal="true"
		aria-labelledby="hint-title"
		tabindex="-1"
		onkeydown={handleKeydown}
	>
		<span class="eyebrow">Before you start</span>
		<h2 id="hint-title">This portfolio is a cube.</h2>
		<p class="lede">Each face is a page. Turn to a face, then step inside to read it.</p>

		<ul class="controls desktop">
			<li>
				<span class="keys"><kbd>1</kbd>–<kbd>5</kbd></span>
				<span>Turn to a page, or use the menu at the bottom</span>
			</li>
			<li>
				<span class="keys"><kbd>Enter</kbd></span>
				<span>Open the face you're looking at (clicking it works too)</span>
			</li>
			<li>
				<span class="keys"><kbd>Esc</kbd></span>
				<span>Step back out to the cube</span>
			</li>
		</ul>

		<ul class="controls touch">
			<li>
				<span class="keys"><kbd>Menu</kbd></span>
				<span>Tap an icon at the bottom to turn to a page</span>
			</li>
			<li>
				<span class="keys"><kbd>Tap</kbd></span>
				<span>Tap the face to open it</span>
			</li>
			<li>
				<span class="keys"><kbd>✕</kbd></span>
				<span>Step back out to the cube</span>
			</li>
		</ul>

		<p class="clue">
			There's a hidden face on this cube. Exploring it takes more than clicking a button.
		</p>

		<button class="go" bind:this={closeBtn} onclick={close}>Got it</button>
	</div>
{/if}

<style>
	.backdrop {
		position: fixed;
		inset: 0;
		z-index: 999;
		background: rgba(0, 0, 0, 0.55);
		backdrop-filter: blur(3px);
		animation: fade 0.3s ease both;
	}

	.hint {
		position: fixed;
		top: 50%;
		left: 50%;
		translate: -50% -50%;
		z-index: 1000;
		width: min(420px, calc(100vw - 2rem));
		max-height: calc(100vh - 2rem);
		overflow-y: auto;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		gap: 0.9rem;
		padding: 1.75rem 1.75rem 1.5rem;
		border: 1px solid rgba(0, 255, 225, 0.14);
		border-radius: 18px;
		background: rgba(10, 10, 14, 0.92);
		box-shadow: 0 30px 80px -20px rgba(0, 0, 0, 0.9);
		color: white;
		outline: none;
		animation: rise 0.45s cubic-bezier(0.16, 1, 0.3, 1) 0.05s both;
	}

	.eyebrow {
		font-size: 0.6rem;
		text-transform: uppercase;
		letter-spacing: 0.18em;
		color: rgba(0, 255, 225, 0.75);
	}

	h2 {
		margin: -0.4rem 0 0;
		font-size: 1.6rem;
		font-weight: 300;
		letter-spacing: -0.02em;
		line-height: 1.15;
	}

	.lede {
		margin: 0;
		font-size: 0.88rem;
		line-height: 1.6;
		color: rgba(255, 255, 255, 0.7);
	}

	.controls {
		list-style: none;
		margin: 0.2rem 0 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.55rem;
	}

	.controls li {
		display: grid;
		grid-template-columns: 4.6rem 1fr;
		align-items: baseline;
		gap: 0.75rem;
		font-size: 0.8rem;
		line-height: 1.45;
		color: rgba(255, 255, 255, 0.82);
	}

	.keys {
		display: inline-flex;
		align-items: center;
		gap: 0.2rem;
		color: rgba(255, 255, 255, 0.4);
	}

	kbd {
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 0.68rem;
		padding: 0.1rem 0.4rem;
		border: 1px solid rgba(255, 255, 255, 0.25);
		border-bottom-width: 2px;
		border-radius: 5px;
		color: white;
		background: rgba(255, 255, 255, 0.05);
	}

	/* show the right set of controls for the device */
	.touch {
		display: none;
	}

	@media (hover: none) and (pointer: coarse) {
		.desktop {
			display: none;
		}

		.touch {
			display: flex;
		}
	}

	.clue {
		margin: 0.3rem 0 0;
		padding-top: 0.9rem;
		border-top: 1px solid rgba(255, 255, 255, 0.08);
		font-size: 0.82rem;
		line-height: 1.55;
		font-style: italic;
		color: #00ffe1;
	}

	.go {
		margin-top: 0.2rem;
		padding: 0.65rem 1rem;
		border: 1px solid rgba(0, 255, 225, 0.4);
		border-radius: 999px;
		background: rgba(0, 255, 225, 0.1);
		color: white;
		font-family: inherit;
		font-size: 0.82rem;
		letter-spacing: 0.04em;
		cursor: pointer;
		transition:
			background 0.15s,
			border-color 0.15s;
	}

	.go:hover,
	.go:focus-visible {
		background: rgba(0, 255, 225, 0.2);
		border-color: rgba(0, 255, 225, 0.7);
		outline: none;
	}

	@keyframes fade {
		from {
			opacity: 0;
		}
	}

	@keyframes rise {
		from {
			opacity: 0;
			translate: -50% calc(-50% + 12px);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.backdrop,
		.hint {
			animation: none;
		}
	}
</style>
