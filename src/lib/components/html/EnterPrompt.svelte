<script lang="ts">
	import { persist, progress } from '$lib';
	import { cubeState, enterFace } from '$lib/states/cubeState.svelte';
	import { CIPHER_ANSWER } from '../../../routes/secret/lib/cipher_answer';

	let { handleKeyDown }: { handleKeyDown: (e: KeyboardEvent) => void } = $props();

	let answer = $state('');
	let wrong = $state(false);
	let shaking = $state(false);
	let inputRef: HTMLInputElement | undefined = $state();

	$effect(() => {
		if (cubeState.mode === 'arrived' && cubeState.activeFace === 'secret' && !progress.cipherSolved) {
			setTimeout(() => inputRef?.focus(), 100);
		} else {
			answer = '';
			wrong = false;
		}
	});

	function handleCipherKey(e: KeyboardEvent) {
		if (e.key !== 'Enter') return;
		e.preventDefault();

		if (answer.trim().toLowerCase() === CIPHER_ANSWER.toLowerCase()) {
			progress.cipherSolved = true;
			persist();
			wrong = false;
			enterFace();
		} else {
			triggerWrong();
		}
	}

	function triggerWrong() {
		wrong = true;
		shaking = true;
		answer = '';
		setTimeout(() => {
			shaking = false;
		}, 500);
	}
</script>

<svelte:window onkeydown={handleKeyDown} />

{#if cubeState.mode == 'arrived' && cubeState.activeFace != 'secret'}
	<div class="prompt">
		<span class="key">Enter</span>
		<span class="label">or click the face</span>
	</div>
{:else if cubeState.mode == 'arrived' && cubeState.activeFace == 'secret'}
	{#if progress.cipherSolved}
		<div class="prompt on-light">
			<span class="key">Enter</span>
			<span class="label">or click the face</span>
		</div>
	{:else}
		<div class="cipher-prompt" class:shake={shaking}>
			<p class="cipher-hint">what is the destination of that curiosity?</p>

			<div class="cipher-input-row">
				<span class="cursor-prefix">_</span>
				<input
					bind:this={inputRef}
					bind:value={answer}
					onkeydown={handleCipherKey}
					class="cipher-input"
					type="text"
					autocomplete="off"
					autocorrect="off"
					autocapitalize="off"
					spellcheck="false"
					maxlength={20}
					placeholder="type your answer"
				/>
			</div>

			{#if wrong}
				<p class="cipher-wrong">incorrect. look closer.</p>
			{/if}
		</div>
	{/if}
{/if}

<style>
	.prompt {
		position: fixed;
		bottom: 50%;
		left: 50%;
		translate: -50% 0;
		z-index: 50;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		animation: fadein 0.4s ease;
		pointer-events: none;
	}

	.key {
		font-size: 0.75rem;
		font-family: monospace;
		padding: 0.2rem 0.5rem;
		border: 1px solid rgba(255, 255, 255, 0.3);
		border-radius: 4px;
		color: rgba(255, 255, 255, 0.8);
		background: rgba(255, 255, 255, 0.05);
		backdrop-filter: blur(4px);
	}

	.label {
		font-size: 0.75rem;
		color: rgba(255, 255, 255, 0.4);
	}

	/* The secret face renders light grey, so translucent white disappears on it.
	   Give anything shown there a dark glass backing instead. */
	.prompt.on-light {
		padding: 0.45rem 0.75rem;
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 999px;
		background: rgba(12, 12, 14, 0.82);
		backdrop-filter: blur(8px);
		box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.7);
	}

	.prompt.on-light .key {
		color: white;
		border-color: rgba(255, 255, 255, 0.4);
	}

	.prompt.on-light .label {
		color: rgba(255, 255, 255, 0.75);
	}

	/* cipher */
	.cipher-prompt {
		position: fixed;
		bottom: 50%;
		left: 50%;
		translate: -50% 0;
		z-index: 50;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.7rem;
		width: max-content;
		max-width: calc(100vw - 2rem);
		box-sizing: border-box;
		padding: 1rem 1.25rem 1.1rem;
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 12px;
		background: rgba(12, 12, 14, 0.85);
		backdrop-filter: blur(10px);
		box-shadow: 0 18px 48px -12px rgba(0, 0, 0, 0.8);
		animation: fadein 0.4s ease;
		pointer-events: all;
	}

	.cipher-prompt.shake {
		animation: shake 0.45s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
	}

	.cipher-hint {
		font-size: 0.8rem;
		font-family: monospace;
		color: rgba(255, 255, 255, 0.85);
		margin: 0;
		letter-spacing: 0.08em;
	}

	.cipher-input-row {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.3rem 0.75rem;
		border: 1px solid rgba(255, 255, 255, 0.3);
		border-radius: 6px;
		background: rgba(255, 255, 255, 0.06);
		transition: border-color 0.2s;
	}

	.cipher-input-row:focus-within {
		border-color: rgba(0, 255, 225, 0.6);
	}

	.cursor-prefix {
		font-family: monospace;
		font-size: 0.75rem;
		color: rgba(255, 255, 255, 0.65);
		animation: blink 1s step-end infinite;
	}

	.cipher-input {
		background: none;
		border: none;
		outline: none;
		font-family: monospace;
		font-size: 0.75rem;
		color: rgba(255, 255, 255, 0.95);
		width: 21ch;
		letter-spacing: 0.1em;
		caret-color: transparent; /* hide default caret, underscore acts as cursor */
	}

	.cipher-input:focus,
	.cipher-input:focus-visible {
		outline: none;
		box-shadow: none;
	}

	.cipher-input::placeholder {
		color: rgba(255, 255, 255, 0.45);
		letter-spacing: 0.04em;
	}

	.cipher-wrong {
		font-size: 0.6rem;
		font-family: monospace;
		color: #fca5a5;
		margin: 0;
		letter-spacing: 0.08em;
		animation: fadein 0.2s ease;
	}

	@keyframes fadein {
		from {
			opacity: 0;
			translate: -50% 6px;
		}
		to {
			opacity: 1;
			translate: -50% 0;
		}
	}

	@keyframes shake {
		0%,
		100% {
			translate: -50% 0;
		}
		15% {
			translate: calc(-50% - 6px) 0;
		}
		30% {
			translate: calc(-50% + 6px) 0;
		}
		45% {
			translate: calc(-50% - 4px) 0;
		}
		60% {
			translate: calc(-50% + 4px) 0;
		}
		75% {
			translate: calc(-50% - 2px) 0;
		}
		90% {
			translate: calc(-50% + 2px) 0;
		}
	}

	@keyframes blink {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
	}
</style>
