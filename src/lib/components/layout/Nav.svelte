<script lang="ts">
	import { flushSync } from 'svelte';
	import { faceConfig, progress, allVisited, lockNudge, persist } from '$lib';
	import { Lock } from '@lucide/svelte';
	import KeyTerminal from '$lib/components/html/KeyTerminal.svelte';
	import { TOKEN_MAP } from '../../../routes/secret/lib/tokens';
	import { cubeState, navigateTo } from '$lib/states/cubeState.svelte';
	import type { FaceConfig } from '$lib/utils/faceConfig';
	import type { FaceName } from '$lib/utils/face';
	import { getKey } from '../../../routes/secret/lib/key.svelte';

	let { isMobile }: { isMobile: boolean } = $props();

	// ─── Locked secret face: explain instead of silently doing nothing ────────
	let locked = $derived(!isMobile && !progress.cipherSolved);
	const totalLength = Object.values(TOKEN_MAP).length
	$inspect(progress.visited)
	let seen = $derived(
		Object.values(TOKEN_MAP).filter((t) => progress.visited.has(t)).length
	)


	// same stages as the lab page's prompt, and never names the key
	let lockHint = $derived(
		progress.keyFound
			? 'Almost — the door still needs a word.'
			: allVisited()
				? 'Locked. The way in is hiding in plain sight.'
				: `Locked. Explore every page first (${seen}/${totalLength}).`
	);

	// ─── Mobile: phones can't press the key, so the "?" opens a terminal to type it ──
	let terminalMode = $derived(isMobile && !progress.keyFound);
	let terminalOpen = $state(false);

	function openTerminal() {
		terminalOpen = true;
		// focus inside the tap itself — iOS only raises the keyboard for a user-initiated focus
		flushSync();
		document.getElementById('key-terminal-input')?.focus();
	}

	function unlockFromTerminal() {
		// same effect as pressing the key on desktop
		progress.keyFound = true;
		persist();
		terminalOpen = false;
		navigateTo('secret', '/secret');
	}

	let pinned = $state(false);
	let pinTimer: ReturnType<typeof setTimeout>;

	function showLockHint() {
		pinned = false;
		clearTimeout(pinTimer);
		requestAnimationFrame(() => (pinned = true)); // restart the shake on repeat clicks
		pinTimer = setTimeout(() => (pinned = false), 2800);
	}

	// any blocked attempt elsewhere (keys, arrows) surfaces the same hint
	$effect(() => {
		if (lockNudge.count > 0) showLockHint();
	});

	// Keyboard shortcuts
	function handleKeydown(e: KeyboardEvent) {
		// ignore if user is typing in an input
		if (e.target instanceof HTMLInputElement) return;
		const face = Object.entries(faceConfig).find(([name, face]) => {
			if (name == 'secret') {
				return getKey() === e.key;
			}
			return face.shortcut == e.key;
		}) as [FaceName, FaceConfig] | undefined;
		if (face) navigateTo(face[0], face[1].route);
		else if (e.key === '6' && locked) showLockHint();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<nav class="cube-nav">
	<ul>
		{#each Object.entries(faceConfig) as [name, face]}
			{@const faceName = name as FaceName}
			{@const isLocked = name == 'secret' && locked}
			{@const showHighlight = cubeState.activeFace === name && cubeState.mode !== 'idle'}
			<li>
				<div class="nav-button-wrapper" class:pinned={isLocked && pinned}>
					<button
						class:active={showHighlight}
						class:locked={isLocked}
						aria-disabled={isLocked || undefined}
						aria-describedby={isLocked ? 'lock-hint' : undefined}
						onclick={(e) => {
							e.currentTarget.blur();
							if (isLocked) showLockHint();
							else if (name === 'secret' && terminalMode) openTerminal();
							else navigateTo(faceName, face.route);
						}}
						aria-label={face.label}
						aria-current={cubeState.activeFace === name ? 'page' : undefined}
					>
						<face.icon />
						<span class="label">{face.label}</span>
						{#if isLocked}
							<span class="lock-badge" aria-hidden="true"><Lock size={9} strokeWidth={2.5} /></span>
						{/if}
					</button>
					{#if isLocked}
						<span class="nav-tooltip lock" id="lock-hint" role="status">{lockHint}</span>
					{/if}
				</div>
			</li>
		{/each}
	</ul>
</nav>

{#if terminalOpen}
	<KeyTerminal
		hint={lockHint}
		accepts={[getKey(), 'ˆ', '＾']}
		onUnlock={unlockFromTerminal}
		onClose={() => (terminalOpen = false)}
	/>
{/if}

<style>
	.nav-button-wrapper {
		position: relative;
	}

	.nav-tooltip {
		position: absolute;
		bottom: calc(100% + 0.6rem);
		right: -0.4rem;

		width: max-content;
		padding: 0.4rem 0.6rem;

		font-family: monospace;
		font-size: 0.6rem;
		color: rgba(255, 255, 255, 0.75);

		background: rgba(20, 20, 20, 0.9);
		border: 1px solid rgba(255, 255, 255, 0.15);
		border-radius: 3px;

		white-space: nowrap;
		pointer-events: none;

		opacity: 0;
		visibility: hidden;
		transition:
			opacity 0.15s ease,
			visibility 0.15s ease;
	}

	.nav-button-wrapper:hover .nav-tooltip,
	.nav-button-wrapper:focus-within .nav-tooltip,
	.nav-button-wrapper.pinned .nav-tooltip {
		opacity: 1;
		visibility: visible;
	}

	/* the locked hint reads as a clue, not an error */
	.nav-tooltip.lock {
		padding: 0.5rem 0.75rem;
		font-size: 0.65rem;
		letter-spacing: 0.02em;
		color: rgba(255, 255, 255, 0.9);
		border-color: rgba(0, 255, 225, 0.3);
		box-shadow: 0 8px 24px -8px rgba(0, 0, 0, 0.8);
		translate: 0 4px;
		transition:
			opacity 0.15s ease,
			visibility 0.15s ease,
			translate 0.2s ease;
	}

	.nav-button-wrapper:hover .nav-tooltip.lock,
	.nav-button-wrapper.pinned .nav-tooltip.lock {
		translate: 0 0;
	}

	.nav-tooltip.lock::after {
		content: '';
		position: absolute;
		top: 100%;
		right: 1.35rem;
		border: 5px solid transparent;
		border-top-color: rgba(0, 255, 225, 0.3);
	}

	button.locked {
		position: relative;
		color: rgba(255, 255, 255, 0.28);
		cursor: help;
	}

	button.locked:hover {
		color: rgba(255, 255, 255, 0.6);
	}

	.pinned button.locked {
		animation: locked-shake 0.4s ease;
	}

	.lock-badge {
		position: absolute;
		top: 0.3rem;
		right: 0.45rem;
		display: grid;
		place-items: center;
		color: rgba(0, 255, 225, 0.7);
	}

	@keyframes locked-shake {
		20%,
		60% {
			translate: -3px 0;
		}
		40%,
		80% {
			translate: 3px 0;
		}
	}

	.cube-nav {
		position: fixed;
		bottom: 2rem;
		left: 50%;
		translate: -50% 0;
		z-index: 10;
	}

	ul {
		display: flex;
		gap: 0.25rem;
		list-style: none;
		margin: 0;
		padding: 0.4rem;
		background: rgba(5, 5, 8, 0.6);
		border: 1px solid rgba(0, 255, 225, 0.12);
		border-radius: 999px;
		backdrop-filter: blur(12px);
	}

	button {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.15rem;
		padding: 0.5rem 0.85rem;
		border: 1px solid transparent;
		border-radius: 999px;
		background: transparent;
		color: rgba(255, 255, 255, 0.4);
		cursor: pointer;
		transition: all 0.2s ease;
		font-family: inherit;
	}

	button:hover {
		color: rgba(255, 255, 255, 0.85);
		background: rgba(0, 255, 225, 0.06);
		border-color: rgba(0, 255, 225, 0.2);
	}

	button.active {
		color: #00ffe1;
		background: rgba(0, 255, 225, 0.1);
		border-color: rgba(0, 255, 225, 0.35);
	}

	/* .icon {
		font-size: 1rem;
		line-height: 1;
	} */

	.label {
		font-size: 0.6rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		font-weight: 500;
	}

	/* Mobile — tighter padding */
	@media (max-width: 480px) {
		.cube-nav {
			bottom: 1.25rem;
			width: calc(100% - 2rem);
		}

		ul {
			justify-content: space-around;
			width: 100%;
			border-radius: 1rem;
		}

		button {
			padding: 0.5rem 0.5rem;
			flex: 1;
		}

		.label {
			font-size: 0.55rem;
		}
	}
</style>
