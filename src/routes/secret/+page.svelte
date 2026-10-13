<script lang="ts">
	import SecretLayout from '$lib/components/html/pageLayouts/SecretLayout.svelte';
	import MazeGrid from './components/MazeGrid.svelte';
	import AlgorithmPicker from './components/AlgorithmPicker.svelte';
	import { createGrid, generateMaze, placeStartEnd } from './lib/maze';
	import type { Grid, Cell } from './lib/maze';
	import { solveBFS } from './lib/bfs';
	import { solveDFS } from './lib/dfs';
	import { buildAnimatorState, SPEED_MAP } from './lib/animator';
	import type { AnimatorState, PlaybackSpeed } from './lib/animator';
	import type { Algorithm } from './components/AlgorithmPicker.svelte';
	import { Play, Pause, SkipForward, RotateCcw, Shuffle, Square } from '@lucide/svelte';

	// ─── Config ───────────────────────────────────────────────────────────────
	const COLS = 25;
	const ROWS = 17;

	// ─── State ────────────────────────────────────────────────────────────────
	let grid = $state<Grid>(makeBlankGrid());
	let algorithm = $state<Algorithm>('bfs');
	let animState = $state<AnimatorState | null>(null);
	let isRunning = $state(false);
	let isPaused = $state(false);
	let editMode = $state<'wall' | 'start' | 'end'>('wall');
	let speed = $state<PlaybackSpeed>('normal');

	let animInterval: ReturnType<typeof setInterval> | null = null;

	// ─── Grid helpers ─────────────────────────────────────────────────────────
	function makeBlankGrid(): Grid {
		const g = createGrid(COLS, ROWS);
		g[2][2].type = 'start';
		g[ROWS - 3][COLS - 3].type = 'end';
		return g;
	}

	function doGenerate() {
		stop();
		animState = null;
		grid = placeStartEnd(generateMaze(COLS, ROWS));
	}

	function doReset() {
		stop();
		animState = null;
		// keep the maze layout, just clear visited state by reassigning same grid
		grid = grid.map(row => row.map(cell => ({ ...cell })));
	}

	function doClear() {
		stop();
		animState = null;
		grid = makeBlankGrid();
	}

	// ─── Start/End finders ────────────────────────────────────────────────────
	function getStartEnd(): { start: Cell; end: Cell } | null {
		let start: Cell | null = null;
		let end: Cell | null = null;
		for (const row of grid) {
			for (const cell of row) {
				if (cell.type === 'start') start = cell;
				if (cell.type === 'end')   end   = cell;
			}
		}
		if (!start || !end) return null;
		return { start, end };
	}

	// ─── Solve & animate ──────────────────────────────────────────────────────
	function run() {
		const se = getStartEnd();
		if (!se) return;

		// Time the solve
		const t0 = performance.now();
		const result = algorithm === 'bfs'
			? solveBFS(grid, se.start, se.end)
			: solveDFS(grid, se.start, se.end);
		const solveTimeMs = performance.now() - t0;

		const ms = SPEED_MAP[speed];
		const state = buildAnimatorState(result.visitedOrder, result.path, se.start, ms, solveTimeMs);
		animState = state;
		isRunning = true;
		isPaused  = false;

		startInterval();
	}

	function startInterval() {
		if (animInterval) clearInterval(animInterval);
		const ms = animState?.intervalMs ?? SPEED_MAP[speed];
		animInterval = setInterval(tick, ms);
	}

	function tick() {
		if (!animState) return;

		if (animState.currentStep < animState.totalSteps) {
			animState.currentStep += 1;
			animState = animState;
		} else if (!animState.pathRevealed) {
			animState.pathRevealed = true;
			animState.done = true;
			animState = animState;
			isRunning = false;
			isPaused  = false;
			if (animInterval) clearInterval(animInterval);
		}
	}

	function pause() {
		if (animInterval) clearInterval(animInterval);
		animInterval = null;
		isPaused = true;
		isRunning = false;
	}

	function resume() {
		if (!animState || animState.done) return;
		isPaused  = false;
		isRunning = true;
		startInterval();
	}

	function stepForward() {
		if (!animState || animState.done) return;
		if (isRunning) pause();
		tick();
	}

	function stop() {
		if (animInterval) clearInterval(animInterval);
		animInterval = null;
		isRunning = false;
		isPaused  = false;
	}

	// When speed changes mid-run, restart the interval at new speed
	$effect(() => {
		const _ = speed; // subscribe
		if (animState) animState.intervalMs = SPEED_MAP[speed];
		if (isRunning) startInterval();
	});

	// ─── Cell editing ─────────────────────────────────────────────────────────
	let dragPaintType = $state<'wall' | 'open'>('wall');

	function handleCellClick(cell: Cell) {
		if (isRunning) return;

		if (editMode === 'wall') {
			if (cell.type === 'start' || cell.type === 'end') return;
			dragPaintType = cell.type === 'wall' ? 'open' : 'wall';
			cell.type = dragPaintType;
			grid = grid;
		} else if (editMode === 'start') {
			if (cell.type === 'end') return;
			for (const row of grid) for (const c of row) if (c.type === 'start') c.type = 'open';
			cell.type = 'start';
			grid = grid;
		} else if (editMode === 'end') {
			if (cell.type === 'start') return;
			for (const row of grid) for (const c of row) if (c.type === 'end') c.type = 'open';
			cell.type = 'end';
			grid = grid;
		}
		// clear prior solve result when maze is edited
		if (animState) { animState = null; stop(); }
	}

	function handleCellDrag(cell: Cell) {
		if (editMode !== 'wall') return;
		if (cell.type === 'start' || cell.type === 'end') return;
		cell.type = dragPaintType;
		grid = grid;
		if (animState) { animState = null; stop(); }
	}

	// ─── Derived stats ────────────────────────────────────────────────────────
	let pathLen = $derived.by(() => {
		if (!animState?.done) return null;
		return [...animState.cells.values()].filter(c => c.isPath).length;
	});

	let visitedCount = $derived(animState?.done ? animState.totalSteps : null);

	let efficiency = $derived.by(() => {
		if (pathLen == null || visitedCount == null || visitedCount === 0) return null;
		return Math.round((pathLen / visitedCount) * 100);
	});

	const SPEED_OPTIONS: { id: PlaybackSpeed; label: string }[] = [
		{ id: 'slow',   label: '0.5×' },
		{ id: 'normal', label: '1×'   },
		{ id: 'fast',   label: '3×'   },
	];

	const EDIT_MODES: { id: 'wall' | 'start' | 'end'; label: string; tip: string }[] = [
		{ id: 'wall',  label: 'Wall',  tip: 'Click/drag to toggle walls' },
		{ id: 'start', label: 'Start', tip: 'Click to move start point' },
		{ id: 'end',   label: 'End',   tip: 'Click to move end point'   },
	];
</script>

<SecretLayout>
	<div class="page">

		<!-- ── Top toolbar ──────────────────────────────────────────────────── -->
		<div class="toolbar">
			<div class="toolbar-left">
				<div class="section-label">Algorithm</div>
				<AlgorithmPicker
					selected={algorithm}
					onSelect={(a) => { algorithm = a; }}
					disabled={isRunning}
				/>
			</div>

			<div class="toolbar-divider"></div>

			<div class="toolbar-mid">
				<div class="section-label">Draw mode</div>
				<div class="mode-btns">
					{#each EDIT_MODES as mode}
						<button
							class="mode-btn"
							class:active={editMode === mode.id}
							title={mode.tip}
							onclick={() => (editMode = mode.id)}
							disabled={isRunning}
						>{mode.label}</button>
					{/each}
				</div>
			</div>

			<div class="toolbar-divider"></div>

			<div class="toolbar-right">
				<div class="section-label">Speed</div>
				<div class="speed-btns">
					{#each SPEED_OPTIONS as opt}
						<button
							class="speed-btn"
							class:active={speed === opt.id}
							onclick={() => (speed = opt.id)}
						>{opt.label}</button>
					{/each}
				</div>
			</div>
		</div>

		<!-- ── Maze ─────────────────────────────────────────────────────────── -->
		<div class="maze-area">
			<MazeGrid
				{grid}
				{animState}
				onCellDrag={handleCellDrag}
				onCellClick={handleCellClick}
				{isRunning}
				{editMode}
			/>
		</div>

		<!-- ── Bottom bar: playback + actions + stats ────────────────────────── -->
		<div class="bottom-bar">
			<!-- Playback controls -->
			<div class="playback">
				{#if isRunning}
					<button class="ctrl-btn primary" onclick={pause} title="Pause">
						<Pause size={13} />
					</button>
				{:else if isPaused}
					<button class="ctrl-btn primary" onclick={resume} title="Resume">
						<Play size={13} />
					</button>
				{:else}
					<button class="ctrl-btn primary" onclick={run} disabled={!!animState?.done} title="Run">
						<Play size={13} />
						<span>Run</span>
					</button>
				{/if}

				<button
					class="ctrl-btn"
					onclick={stepForward}
					disabled={isRunning || (!isPaused && !animState) || animState?.done}
					title="Step forward"
				>
					<SkipForward size={13} />
				</button>

				<button class="ctrl-btn" onclick={doReset} disabled={isRunning} title="Reset visualization">
					<Square size={13} />
					<span>Clear</span>
				</button>
			</div>

			<div class="bottom-divider"></div>

			<!-- Generation / layout actions -->
			<div class="actions">
				<button class="action-btn" onclick={doGenerate} disabled={isRunning} title="Generate a new maze">
					<Shuffle size={12} />
					<span>Generate</span>
				</button>
				<button class="action-btn" onclick={doClear} disabled={isRunning} title="Clear to blank grid">
					<RotateCcw size={12} />
					<span>Blank</span>
				</button>
			</div>

			<div class="bottom-divider"></div>

			<!-- Stats -->
			<div class="stats" class:visible={animState?.done}>
				{#if animState?.done && pathLen != null}
					<div class="stat">
						<span class="stat-val">{pathLen}</span>
						<span class="stat-key">path</span>
					</div>
					<span class="stat-sep">·</span>
					<div class="stat">
						<span class="stat-val">{visitedCount}</span>
						<span class="stat-key">visited</span>
					</div>
					<span class="stat-sep">·</span>
					<div class="stat">
						<span class="stat-val">{efficiency}%</span>
						<span class="stat-key">efficiency</span>
					</div>
					<span class="stat-sep">·</span>
					<div class="stat">
						<span class="stat-val">{animState.solveTimeMs < 1 ? '<1' : animState.solveTimeMs.toFixed(1)}ms</span>
						<span class="stat-key">compute</span>
					</div>
				{:else if animState?.done && pathLen == null}
					<span class="no-path">no path found</span>
				{:else}
					<span class="stats-idle">run an algorithm to see stats</span>
				{/if}
			</div>
		</div>

		<!-- ── Legend ────────────────────────────────────────────────────────── -->
		<div class="legend">
			<span class="legend-item"><span class="dot" style="background:#4ade80"></span>Start</span>
			<span class="legend-item"><span class="dot" style="background:#f87171"></span>End</span>
			<span class="legend-item"><span class="dot" style="background:rgba(234,179,8,0.65)"></span>Visited</span>
			<span class="legend-item"><span class="dot" style="background:#22d3ee"></span>Path</span>
			<span class="legend-item"><span class="dot" style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06)"></span>Wall</span>
		</div>

	</div>
</SecretLayout>

<style>
	/* ── Layout shell ────────────────────────────────────────────────────────── */
	.page {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		padding: 1.25rem 1.5rem 1rem;
		gap: 0.75rem;
		box-sizing: border-box;
		overflow: hidden;
	}

	/* ── Toolbar ─────────────────────────────────────────────────────────────── */
	.toolbar {
		display: flex;
		align-items: flex-end;
		gap: 1rem;
		flex-wrap: wrap;
		flex-shrink: 0;
		animation: slide-up 0.45s cubic-bezier(0.16,1,0.3,1) 0.05s both;
	}

	.toolbar-left,
	.toolbar-mid,
	.toolbar-right {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	.toolbar-divider {
		width: 1px;
		height: 2.6rem;
		background: rgba(255,255,255,0.06);
		align-self: flex-end;
		margin-bottom: 0.1rem;
	}

	.section-label {
		font-size: 0.52rem;
		text-transform: uppercase;
		letter-spacing: 0.14em;
		color: rgba(255,255,255,0.2);
	}

	/* Draw mode buttons */
	.mode-btns,
	.speed-btns {
		display: flex;
		gap: 0.25rem;
	}

	.mode-btn,
	.speed-btn {
		font-size: 0.62rem;
		padding: 0.3rem 0.6rem;
		border: 1px solid rgba(255,255,255,0.07);
		border-radius: 999px;
		background: none;
		color: rgba(255,255,255,0.35);
		cursor: pointer;
		letter-spacing: 0.04em;
		transition: border-color 0.15s, color 0.15s, background 0.15s;
	}

	.mode-btn.active {
		border-color: rgba(234,179,8,0.35);
		background: rgba(234,179,8,0.07);
		color: rgba(255,255,255,0.85);
	}

	.speed-btn.active {
		border-color: rgba(255,255,255,0.2);
		background: rgba(255,255,255,0.06);
		color: rgba(255,255,255,0.85);
	}

	.mode-btn:hover:not(:disabled),
	.speed-btn:hover {
		border-color: rgba(255,255,255,0.16);
		color: rgba(255,255,255,0.65);
	}

	.mode-btn:disabled {
		opacity: 0.35;
		cursor: not-allowed;
	}

	/* ── Maze area ───────────────────────────────────────────────────────────── */
	.maze-area {
		flex: 1;
		min-height: 0;
		display: flex;
		animation: fade-in 0.5s ease 0.1s both;
	}

	/* ── Bottom bar ──────────────────────────────────────────────────────────── */
	.bottom-bar {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		flex-wrap: wrap;
		flex-shrink: 0;
		animation: slide-up 0.45s cubic-bezier(0.16,1,0.3,1) 0.15s both;
	}

	.bottom-divider {
		width: 1px;
		height: 1.6rem;
		background: rgba(255,255,255,0.06);
	}

	/* Playback */
	.playback,
	.actions {
		display: flex;
		align-items: center;
		gap: 0.3rem;
	}

	.ctrl-btn {
		display: flex;
		align-items: center;
		gap: 0.3rem;
		font-size: 0.66rem;
		padding: 0.38rem 0.75rem;
		border: 1px solid rgba(255,255,255,0.09);
		border-radius: 999px;
		background: rgba(255,255,255,0.03);
		color: rgba(255,255,255,0.5);
		cursor: pointer;
		letter-spacing: 0.04em;
		transition: border-color 0.15s, color 0.15s, background 0.15s;
	}

	.ctrl-btn.primary {
		border-color: rgba(234,179,8,0.3);
		background: rgba(234,179,8,0.07);
		color: rgba(255,255,255,0.9);
	}

	.ctrl-btn.primary:hover:not(:disabled) {
		background: rgba(234,179,8,0.13);
		border-color: rgba(234,179,8,0.5);
	}

	.ctrl-btn:hover:not(:disabled):not(.primary) {
		border-color: rgba(255,255,255,0.18);
		color: rgba(255,255,255,0.8);
	}

	.ctrl-btn:disabled {
		opacity: 0.3;
		cursor: not-allowed;
	}

	/* Action buttons */
	.action-btn {
		display: flex;
		align-items: center;
		gap: 0.3rem;
		font-size: 0.62rem;
		padding: 0.35rem 0.7rem;
		border: 1px solid rgba(255,255,255,0.07);
		border-radius: 999px;
		background: none;
		color: rgba(255,255,255,0.35);
		cursor: pointer;
		letter-spacing: 0.04em;
		transition: border-color 0.15s, color 0.15s;
	}

	.action-btn:hover:not(:disabled) {
		border-color: rgba(255,255,255,0.15);
		color: rgba(255,255,255,0.65);
	}

	.action-btn:disabled {
		opacity: 0.3;
		cursor: not-allowed;
	}

	/* Stats */
	.stats {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.65rem;
		color: rgba(255,255,255,0.3);
		min-width: 0;
	}

	.stat {
		display: flex;
		align-items: baseline;
		gap: 0.25rem;
	}

	.stat-val {
		font-size: 0.75rem;
		font-family: monospace;
		color: rgba(255,255,255,0.8);
		letter-spacing: -0.01em;
	}

	.stat-key {
		font-size: 0.55rem;
		color: rgba(255,255,255,0.25);
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.stat-sep {
		color: rgba(255,255,255,0.12);
	}

	.no-path {
		font-size: 0.65rem;
		color: rgba(248,113,113,0.65);
		font-family: monospace;
	}

	.stats-idle {
		font-size: 0.58rem;
		color: rgba(255,255,255,0.15);
		font-style: italic;
	}

	/* ── Legend ──────────────────────────────────────────────────────────────── */
	.legend {
		display: flex;
		gap: 0.85rem;
		flex-wrap: wrap;
		flex-shrink: 0;
		animation: slide-up 0.45s cubic-bezier(0.16,1,0.3,1) 0.2s both;
	}

	.legend-item {
		display: flex;
		align-items: center;
		gap: 0.35rem;
		font-size: 0.56rem;
		color: rgba(255,255,255,0.25);
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}

	.dot {
		width: 9px;
		height: 9px;
		border-radius: 2px;
		flex-shrink: 0;
	}

	/* ── Animations ──────────────────────────────────────────────────────────── */
	@keyframes slide-up {
		from { opacity: 0; translate: 0 8px; }
		to   { opacity: 1; translate: 0 0;   }
	}

	@keyframes fade-in {
		from { opacity: 0; }
		to   { opacity: 1; }
	}

	/* ── Responsive ──────────────────────────────────────────────────────────── */
	@media (max-width: 640px) {
		.page {
			padding: 0.85rem 0.85rem 0.75rem;
			gap: 0.5rem;
		}

		.toolbar-divider,
		.bottom-divider {
			display: none;
		}

		.toolbar {
			gap: 0.6rem;
		}

		.bottom-bar {
			gap: 0.5rem;
		}

		.stats-idle {
			display: none;
		}
	}
</style>
