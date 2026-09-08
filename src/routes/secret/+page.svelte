<script lang="ts">
	import SecretLayout from '$lib/components/html/pageLayouts/SecretLayout.svelte';
	import MazeGrid from './components/MazeGrid.svelte';
	import AlgorithmPicker from './components/AlgorithmPicker.svelte';
	import { createGrid, DEFAULT_CONFIG } from './lib/maze';
	import type { Grid, Cell, CellType } from './lib/maze';
	import { solveBFS } from './lib/bfs';
	import { solveDFS } from './lib/dfs';
	import { buildAnimatorState } from './lib/animator';
	import type { AnimatorState } from './lib/animator';
	import type { Algorithm } from './components/AlgorithmPicker.svelte';
	import { Play, RotateCcw, Square } from '@lucide/svelte';

	let { cols, rows } = DEFAULT_CONFIG;

	let grid = $state<Grid>(createGrid(cols, rows));
	let algorithm = $state<Algorithm>('bfs');
	let animState = $state<AnimatorState | null>(null);
	let isRunning = $state(false);
	let editMode = $state<'wall' | 'start' | 'end'>('wall');

	// place default start + end
	$effect.pre(() => {
		grid[2][2].type = 'start';
		grid[rows - 3][cols - 3].type = 'end';
	});

	let animInterval: ReturnType<typeof setInterval> | null = null;

	function getStartEnd(): { start: Cell; end: Cell } | null {
		let start: Cell | null = null;
		let end: Cell | null = null;
		for (const row of grid) {
			for (const cell of row) {
				if (cell.type === 'start') start = cell;
				if (cell.type === 'end') end = cell;
			}
		}
		if (!start || !end) return null;
		return { start, end };
	}

	let dragPaintType = $state<'wall' | 'open'>('wall');

	function handleCellClick(cell: Cell) {
		if (isRunning) return;
		if (cell.type === 'start' || cell.type === 'end') return;

		if (editMode === 'wall') {
			dragPaintType = cell.type === 'wall' ? 'open' : 'wall';
			cell.type = dragPaintType;
			grid = grid;
		} else if (editMode === 'start') {
			for (const row of grid) for (const c of row) if (c.type === 'start') c.type = 'open';
			cell.type = 'start';
			grid = grid;
		} else if (editMode === 'end') {
			for (const row of grid) for (const c of row) if (c.type === 'end') c.type = 'open';
			cell.type = 'end';
			grid = grid;
		}
	}

	function handleCellDrag(cell: Cell) {
		if (editMode !== 'wall') return;
		cell.type = dragPaintType;
		grid = grid;
	}

	function run() {
		const se = getStartEnd();
		if (!se) return;

		const result =
			algorithm === 'bfs' ? solveBFS(grid, se.start, se.end) : solveDFS(grid, se.start, se.end);

		const state = buildAnimatorState(result.visitedOrder, result.path, se.start);
		animState = state;
		isRunning = true;

		// reveal visited cells step by step
		animInterval = setInterval(() => {
			if (!animState) return;

			if (animState.currentStep < animState.totalSteps) {
				animState.currentStep += 1;
				animState = animState; // trigger reactivity
			} else if (!animState.pathRevealed) {
				// all visited revealed — now reveal path
				animState.pathRevealed = true;
				animState.done = true;
				animState = animState;
				isRunning = false;
				if (animInterval) clearInterval(animInterval);
			}
		}, 18); // ~55 steps/sec — feels like slime spreading
	}

	function stop() {
		if (animInterval) clearInterval(animInterval);
		isRunning = false;
	}

	function reset() {
		stop();
		animState = null;
		grid = createGrid(cols, rows);
		grid[2][2].type = 'start';
		grid[rows - 3][cols - 3].type = 'end';
	}
</script>

<SecretLayout>
	<div class="secret-root">
		<div class="page-header">
			<div class="header-left">
				<span class="secret-label">/// Yay! You unlocked the secret 🎉</span>
				<h2 class="page-title">Maze Solver</h2>
				<p class="page-sub">Watch algorithms find their way through the void.</p>
			</div>
		</div>

		<!-- controls bar -->
		<div class="controls">
			<AlgorithmPicker
				selected={algorithm}
				onSelect={(a) => {
					algorithm = a;
					// reset();
				}}
				disabled={isRunning}
			/>

			<div class="control-divider"></div>

			<!-- edit mode -->
			<div class="edit-modes">
				<span class="edit-label">Draw</span>
				<div class="edit-btns">
					{#each ['wall', 'start', 'end'] as const as mode}
						<button
							class="edit-btn"
							class:active={editMode === mode}
							onclick={() => (editMode = mode)}
							disabled={isRunning}
						>
							{mode}
						</button>
					{/each}
				</div>
			</div>

			<div class="control-divider"></div>

			<!-- run / stop / reset -->
			<div class="run-btns">
				{#if !isRunning}
					<button class="run-btn primary" onclick={run}>
						<Play size={13} />
						<span>Run</span>
					</button>
				{:else}
					<button class="run-btn" onclick={stop}>
						<Square size={13} />
						<span>Stop</span>
					</button>
				{/if}
				<button class="run-btn" onclick={reset} disabled={isRunning}>
					<RotateCcw size={13} />
					<span>Reset</span>
				</button>
			</div>
		</div>

		<!-- legend -->
		<div class="legend">
			<div class="legend-item">
				<span class="legend-dot" style="background:#4ade80; box-shadow: 0 0 6px #4ade80"></span>
				Start
			</div>
			<div class="legend-item">
				<span class="legend-dot" style="background:#f87171; box-shadow: 0 0 6px #f87171"></span>
				End
			</div>
			<div class="legend-item">
				<span class="legend-dot" style="background:rgba(234,179,8,0.6)"></span>
				Visited
			</div>
			<div class="legend-item">
				<span class="legend-dot" style="background:#22d3ee; box-shadow: 0 0 6px #22d3ee"></span>
				Path
			</div>
			<div class="legend-item">
				<span class="legend-dot" style="background:rgba(255,255,255,0.04)"></span>
				Wall
			</div>
		</div>

		<!-- maze -->
		<MazeGrid {grid} {animState} onCellDrag={handleCellDrag} onCellClick={handleCellClick} {isRunning} />

		{#if animState?.done}
			<div class="result">
				{#if animState.cells.size > 0}
					{@const pathLen = [...animState.cells.values()].filter((c) => c.isPath).length}
					<span>Path found — <strong>{pathLen}</strong> steps</span>
					<span class="result-sep">·</span>
					<span><strong>{animState.totalSteps}</strong> cells visited</span>
				{:else}
					<span class="no-path">No path found</span>
				{/if}
			</div>
		{/if}
	</div>
</SecretLayout>

<style>
	.secret-root {
		width: 100%;
		height: 100%;
		padding: 1.5rem 1.75rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		overflow-y: auto;
	}

	.page-header {
		animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
	}

	.secret-label {
		font-size: 0.58rem;
		letter-spacing: 0.2em;
		color: rgba(234, 179, 8, 0.5);
		font-family: monospace;
	}

	.page-title {
		font-size: 1.2rem;
		font-weight: 200;
		letter-spacing: -0.02em;
		color: rgba(255, 255, 255, 0.9);
		margin: 0.2rem 0 0.3rem;
	}

	.page-sub {
		font-size: 0.68rem;
		color: rgba(255, 255, 255, 0.3);
		margin: 0;
	}

	/* controls */
	.controls {
		display: flex;
		align-items: center;
		gap: 1rem;
		flex-wrap: wrap;
		animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both;
	}

	.control-divider {
		width: 1px;
		height: 2rem;
		background: rgba(255, 255, 255, 0.07);
	}

	.edit-modes {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.edit-label {
		font-size: 0.58rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: rgba(255, 255, 255, 0.25);
	}

	.edit-btns {
		display: flex;
		gap: 0.3rem;
	}

	.edit-btn {
		font-size: 0.62rem;
		padding: 0.3rem 0.65rem;
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 999px;
		background: none;
		color: rgba(255, 255, 255, 0.4);
		cursor: pointer;
		text-transform: capitalize;
		letter-spacing: 0.04em;
		transition: all 0.2s;
	}

	.edit-btn.active {
		border-color: rgba(234, 179, 8, 0.4);
		background: rgba(234, 179, 8, 0.08);
		color: rgba(255, 255, 255, 0.85);
	}

	.edit-btn:hover:not(:disabled) {
		border-color: rgba(255, 255, 255, 0.2);
		color: rgba(255, 255, 255, 0.75);
	}

	.run-btns {
		display: flex;
		gap: 0.4rem;
	}

	.run-btn {
		display: flex;
		align-items: center;
		gap: 0.35rem;
		font-size: 0.68rem;
		padding: 0.4rem 0.9rem;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.04);
		color: rgba(255, 255, 255, 0.6);
		cursor: pointer;
		letter-spacing: 0.04em;
		transition: all 0.2s;
	}

	.run-btn.primary {
		border-color: rgba(234, 179, 8, 0.35);
		background: rgba(234, 179, 8, 0.08);
		color: rgba(255, 255, 255, 0.9);
	}

	.run-btn.primary:hover {
		background: rgba(234, 179, 8, 0.15);
		border-color: rgba(234, 179, 8, 0.5);
	}

	.run-btn:hover:not(:disabled):not(.primary) {
		border-color: rgba(255, 255, 255, 0.2);
		color: rgba(255, 255, 255, 0.85);
	}

	.run-btn:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	/* legend */
	.legend {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
		animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
	}

	.legend-item {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.6rem;
		color: rgba(255, 255, 255, 0.3);
		letter-spacing: 0.06em;
	}

	.legend-dot {
		width: 10px;
		height: 10px;
		border-radius: 2px;
		flex-shrink: 0;
	}

	/* result */
	.result {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.68rem;
		color: rgba(255, 255, 255, 0.5);
		animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
	}

	.result strong {
		color: rgba(255, 255, 255, 0.85);
	}

	.result-sep {
		color: rgba(255, 255, 255, 0.15);
	}

	.no-path {
		color: rgba(248, 113, 113, 0.7);
	}

	@keyframes slide-up {
		from {
			opacity: 0;
			translate: 0 8px;
		}
		to {
			opacity: 1;
			translate: 0 0;
		}
	}
</style>
