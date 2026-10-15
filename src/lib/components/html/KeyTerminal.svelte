<script lang="ts">
	// Mobile stand-in for pressing the secret key: phones can't send a bare
	// keypress, but every phone keyboard can type the character.

	let {
		hint,
		accepts,
		onUnlock,
		onClose
	}: {
		/** staged clue, same wording as the desktop tooltip */
		hint: string;
		/** characters that count as the key (the key plus look-alikes phone keyboards insert) */
		accepts: string[];
		onUnlock: () => void;
		onClose: () => void;
	} = $props();

	let value = $state('');
	let wrong = $state(false);
	let shaking = $state(false);

	function submit(e: SubmitEvent) {
		e.preventDefault();
		if (accepts.includes(value.trim())) {
			onUnlock();
			return;
		}
		wrong = true;
		shaking = true;
		value = '';
		setTimeout(() => (shaking = false), 450);
	}

	function handleKeydown(e: KeyboardEvent) {
		// keep keys typed here away from the page's global shortcuts (Enter opens a face)
		e.stopPropagation();
		if (e.key === 'Escape') onClose();
	}
</script>

<div class="backdrop" onclick={onClose} aria-hidden="true"></div>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div
	class="term"
	class:shake={shaking}
	onkeydown={handleKeydown}
	role="dialog"
	aria-modal="true"
	aria-label="Hidden face"
	tabindex="-1"
>
	<div class="bar">
		<span class="dots" aria-hidden="true"><i></i><i></i><i></i></span>
		<span class="title">~/secret</span>
		<button type="button" class="x" onclick={onClose} aria-label="Close">✕</button>
	</div>

	<p class="hint">{hint}</p>

	<form onsubmit={submit}>
		<label class="line">
			<span class="ps1" aria-hidden="true">$</span>
			<input
				id="key-terminal-input"
				bind:value
				type="text"
				inputmode="text"
				enterkeyhint="go"
				autocomplete="off"
				autocorrect="off"
				autocapitalize="off"
				spellcheck="false"
				maxlength={8}
				placeholder="type the key"
				aria-label="Type the key"
			/>
		</label>
	</form>

	{#if wrong}
		<p class="wrong" role="status">incorrect. look closer.</p>
	{/if}
</div>

<style>
	.backdrop {
		position: fixed;
		inset: 0;
		z-index: 19;
		background: rgba(0, 0, 0, 0.45);
		animation: fade 0.2s ease both;
	}

	/* sits high on the screen so the phone keyboard never covers it */
	.term {
		position: fixed;
		top: 18vh;
		left: 50%;
		translate: -50% 0;
		z-index: 20;
		width: min(20rem, calc(100vw - 2rem));
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		gap: 0.7rem;
		padding: 0 1rem 1rem;
		border: 1px solid rgba(0, 255, 225, 0.25);
		border-radius: 12px;
		background: rgba(8, 9, 12, 0.94);
		box-shadow: 0 24px 60px -16px rgba(0, 0, 0, 0.9);
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
		color: white;
		animation: rise 0.3s cubic-bezier(0.16, 1, 0.3, 1) both;
	}

	.term.shake {
		animation: shake 0.45s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
	}

	.term:focus {
		outline: none;
	}

	.bar {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		margin: 0 -1rem;
		padding: 0.55rem 0.75rem 0.55rem 1rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
	}

	.dots {
		display: flex;
		gap: 0.3rem;
	}

	.dots i {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.18);
	}

	.title {
		flex: 1;
		font-size: 0.65rem;
		color: rgba(255, 255, 255, 0.5);
		letter-spacing: 0.06em;
	}

	.x {
		width: 1.9rem;
		height: 1.9rem;
		border: none;
		border-radius: 50%;
		background: none;
		color: rgba(255, 255, 255, 0.6);
		font-size: 0.8rem;
		cursor: pointer;
	}

	.hint {
		margin: 0.2rem 0 0;
		font-size: 0.72rem;
		line-height: 1.5;
		color: rgba(255, 255, 255, 0.7);
	}

	.line {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.55rem 0.7rem;
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 8px;
		background: rgba(255, 255, 255, 0.04);
		transition: border-color 0.2s;
	}

	.line:focus-within {
		border-color: rgba(0, 255, 225, 0.6);
	}

	.ps1 {
		color: #00ffe1;
		font-size: 0.85rem;
	}

	/* reset the Tailwind forms plugin's default text-input box and focus ring */
	input,
	input:focus {
		appearance: none;
		padding: 0;
		border: none;
		outline: none;
		box-shadow: none;
	}

	input {
		flex: 1;
		min-width: 0;
		background: none;
		color: white;
		/* 16px stops iOS zooming the page when the field is focused */
		font:
			16px ui-monospace,
			SFMono-Regular,
			Menlo,
			monospace;
		letter-spacing: 0.08em;
		caret-color: #00ffe1;
	}

	input::placeholder {
		color: rgba(255, 255, 255, 0.4);
		font-size: 0.8rem;
		letter-spacing: 0.04em;
	}

	.wrong {
		margin: 0;
		font-size: 0.65rem;
		letter-spacing: 0.08em;
		color: #fca5a5;
	}

	@keyframes fade {
		from {
			opacity: 0;
		}
	}

	@keyframes rise {
		from {
			opacity: 0;
			translate: -50% 10px;
		}
	}

	@keyframes shake {
		15%,
		45%,
		75% {
			translate: calc(-50% - 5px) 0;
		}
		30%,
		60%,
		90% {
			translate: calc(-50% + 5px) 0;
		}
	}
</style>
