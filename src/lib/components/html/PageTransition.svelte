<!-- src/lib/components/html/PageTransition.svelte -->
<script lang="ts">
	import type { Snippet } from 'svelte';
	let { children, scrollable = false }: { children: Snippet; scrollable?: boolean } = $props();
</script>

<div class="page-root">
	<!-- The cross lines -->
	<div class="cross">
		<div class="line horizontal"></div>
		<div class="line vertical"></div>
	</div>

	<!-- Content quadrants -->
	<div class="content" class:scrollable>
		{@render children()}
	</div>
</div>

<style>
	.page-root {
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

	.content.scrollable {
		overflow-y: auto;
		align-items: stretch;
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
