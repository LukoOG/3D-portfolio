<script lang="ts">
	import type { Snippet } from 'svelte';
	import { progress } from '$lib';

	let { children }: { children: Snippet } = $props();
</script>

{#if progress.cipherSolved}
	{@render children?.()}
{:else if !progress.cipherSolved && progress.keyFound}
	<div class="flex h-[90%] flex-col items-center justify-center gap-4 text-center">
		<p class="text-xs tracking-[0.2em] text-white/40 uppercase">You found the way in.</p>
		<h1 class="text-3xl text-white">But the door still needs a word.</h1>
		<p class="max-w-md text-sm leading-relaxed text-white/50">
			One sentence on this portfolio tells you who I am — and ends with the answer.
		</p>
	</div>
{:else}
	<div class="flex h-[90%] flex-col items-center justify-center">
		<h1 class="text-3xl text-white">Check out my portfolio first 🫵</h1>
	</div>
{/if}

<style>
	h1 {
		font-size: clamp(2rem, 5vw, 4rem);
		font-weight: 300;
		letter-spacing: -0.02em;
		margin: 0;
		animation: slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both;
	}

	@keyframes slide-up {
		from {
			opacity: 0;
			translate: 0 12px;
		}
		to {
			opacity: 1;
			translate: 0 0;
		}
	}
</style>
