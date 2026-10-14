<script lang="ts">
	import { onDestroy } from 'svelte';
	import { faceConfig } from '$lib';
	import SecretLayout from '$lib/components/html/pageLayouts/SecretLayout.svelte';
	import MazeGrid, { PALETTE } from './components/MazeGrid.svelte';
	import AlgorithmPicker from './components/AlgorithmPicker.svelte';
	import ResultPanel, { type RunStats } from './components/ResultPanel.svelte';
	import { createGrid, generateMaze, placeStartEnd } from './lib/maze';
	import type { Grid, Cell } from './lib/maze';
	import { solveBFS } from './lib/bfs';
	import { solveDFS } from './lib/dfs';
	import { advance, buildAnimatorState, SPEED_MAP } from './lib/animator';
	import type { AnimatorState, PlaybackSpeed } from './lib/animator';
	import type { Algorithm } from './components/AlgorithmPicker.svelte';
	import {
		Play,
		Pause,
		SkipForward,
		RotateCcw,
		Shuffle,
		Eraser,
		MousePointerClick
	} from '@lucide/svelte';

	// ─── Config ───────────────────────────────────────────────────────────────
	const COLS = 25;
	const ROWS = 17;

	// ─── State ────────────────────────────────────────────────────────────────
	let grid = $state<Grid>(placeStartEnd(generateMaze(COLS, ROWS)));
	let algorithm = $state<Algorithm>('bfs');
	let animState = $state<AnimatorState | null>(null);
	let isRunning = $state(false);
	let isPaused = $state(false);
	let speed = $state<PlaybackSpeed>('normal');

	// results of the most recent run, and of each algorithm on the current maze
	let latest = $state<RunStats | null>(null);
	let runs = $state<Partial<Record<Algorithm, RunStats>>>({});
	let runId = $state(0);
	let hasDrawn = $state(false);

	let animInterval: ReturnType<typeof setInterval> | null = null;

	let phase = $derived<'idle' | 'running' | 'paused' | 'done'>(
		animState?.done ? 'done' : isRunning ? 'running' : isPaused ? 'paused' : 'idle'
	);

	// ─── Grid helpers ─────────────────────────────────────────────────────────
	function makeBlankGrid(): Grid {
		const g = createGrid(COLS, ROWS);
		g[2][2].type = 'start';
		g[ROWS - 3][COLS - 3].type = 'end';
		return g;
	}

	/** Drop the current run but keep the maze and the comparison. */
	function resetRun() {
		stop();
		animState = null;
	}

	/** The maze changed, so earlier results no longer describe it. */
	function mazeChanged() {
		resetRun();
		latest = null;
		runs = {};
	}

	function newMaze() {
		grid = placeStartEnd(generateMaze(COLS, ROWS));
		mazeChanged();
	}

	function emptyGrid() {
		grid = makeBlankGrid();
		mazeChanged();
	}

	function selectAlgorithm(a: Algorithm) {
		if (a === algorithm) return;
		algorithm = a;
		resetRun();
	}

	// ─── Start/End finders ────────────────────────────────────────────────────
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

	// ─── Solve & animate ──────────────────────────────────────────────────────
	function prepare(): boolean {
		const se = getStartEnd();
		if (!se) return false;

		// Time the solve
		const t0 = performance.now();
		const result =
			algorithm === 'bfs' ? solveBFS(grid, se.start, se.end) : solveDFS(grid, se.start, se.end);
		const solveTimeMs = performance.now() - t0;

		animState = buildAnimatorState(
			result.visitedOrder,
			result.path,
			se.start,
			SPEED_MAP[speed],
			solveTimeMs
		);
		return true;
	}

	function run() {
		stop();
		if (!prepare()) return;
		isRunning = true;
		startInterval();
	}

	function startInterval() {
		if (animInterval) clearInterval(animInterval);
		const ms = animState?.intervalMs ?? SPEED_MAP[speed];
		animInterval = setInterval(tick, ms);
	}

	function tick() {
		if (!animState) return;
		advance(animState);
		if (animState.done) finish();
	}

	function finish() {
		stop();
		if (!animState) return;
		const stats: RunStats = {
			algorithm,
			found: animState.pathLength > 0,
			pathLength: animState.pathLength,
			visited: animState.totalSteps,
			solveTimeMs: animState.solveTimeMs
		};
		latest = stats;
		runs = { ...runs, [algorithm]: stats };
		runId += 1;
	}

	function pause() {
		if (animInterval) clearInterval(animInterval);
		animInterval = null;
		isPaused = true;
		isRunning = false;
	}

	function resume() {
		if (!animState || animState.done) return;
		isPaused = false;
		isRunning = true;
		startInterval();
	}

	/** The one big button: Solve → Pause → Resume → Run again. */
	function primaryAction() {
		if (isRunning) pause();
		else if (isPaused) resume();
		else run();
	}

	function stepForward() {
		if (animState?.done) return;
		if (!animState) {
			if (!prepare()) return;
			isPaused = true;
		}
		if (isRunning) pause();
		tick();
	}

	function stop() {
		if (animInterval) clearInterval(animInterval);
		animInterval = null;
		isRunning = false;
		isPaused = false;
	}

	onDestroy(stop);

	// When speed changes mid-run, restart the interval at new speed
	$effect(() => {
		const ms = SPEED_MAP[speed];
		if (animState) animState.intervalMs = ms;
		if (isRunning) startInterval();
	});

	// ─── Cell editing (direct manipulation, no modes) ─────────────────────────
	let dragPaintType: 'wall' | 'open' = 'wall';

	function handlePaintStart(cell: Cell) {
		dragPaintType = cell.type === 'wall' ? 'open' : 'wall';
		cell.type = dragPaintType;
		mazeChanged();
	}

	function handlePaint(cell: Cell) {
		if (cell.type === 'start' || cell.type === 'end' || cell.type === dragPaintType) return;
		cell.type = dragPaintType;
		mazeChanged();
	}

	function handleMoveMarker(kind: 'start' | 'end', cell: Cell) {
		// markers only land on open floor, so dragging one never eats a wall
		if (cell.type !== 'open') return;
		for (const row of grid) for (const c of row) if (c.type === kind) c.type = 'open';
		cell.type = kind;
		mazeChanged();
	}

	// ─── Keyboard ─────────────────────────────────────────────────────────────
	function handleKeydown(e: KeyboardEvent) {
		if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
		if (e.metaKey || e.ctrlKey || e.altKey) return;

		if (e.key === ' ') {
			e.preventDefault(); // also stops a focused button from firing a second time
			primaryAction();
		} else if (e.key === 'ArrowRight') {
			e.preventDefault();
			stepForward();
		} else if (e.key === 'n' || e.key === 'N') {
			newMaze();
		} else if (e.key === 'r' || e.key === 'R') {
			resetRun();
		}
	}

	const SPEED_OPTIONS: { id: PlaybackSpeed; label: string }[] = [
		{ id: 'slow', label: '0.5×' },
		{ id: 'normal', label: '1×' },
		{ id: 'fast', label: '3×' }
	];

	const slimeSwatch = `linear-gradient(90deg, rgb(${PALETTE.slimeCool.join(',')}), rgb(${PALETTE.slimeHot.join(',')}))`;
</script>

<svelte:window onkeydown={handleKeydown} />

<SecretLayout>
	<!-- The cube face's grey stays at the rim while a dark board spreads out from the centre -->
	<div class="reveal-bg" style="--face: {faceConfig.secret.color}" aria-hidden="true"></div>

	<div class="page">
		<!-- ── Arrival ──────────────────────────────────────────────────────── -->
		<header class="arrival">
			<span class="eyebrow">✦ Secret unlocked</span>
			<h1>You cracked it.</h1>
			<p>
				Here's your prize: a pathfinding playground. Pick an algorithm, hit Solve, and watch it grow
				its way to the goal — then draw your own walls and try to trip it up.
			</p>
		</header>

		<!-- ── Controls, in the order you use them ──────────────────────────── -->
		<div class="controls">
			<div class="group">
				<span class="label">1 · Algorithm</span>
				<AlgorithmPicker selected={algorithm} onSelect={selectAlgorithm} disabled={isRunning} />
			</div>

			<div class="group">
				<span class="label">2 · Run</span>
				<div class="row">
					<button class="solve" class:running={isRunning} onclick={primaryAction}>
						{#if isRunning}
							<Pause size={15} /> Pause
						{:else if isPaused}
							<Play size={15} /> Resume
						{:else if phase === 'done'}
							<RotateCcw size={15} /> Run again
						{:else}
							<Play size={15} /> Solve
						{/if}
						<kbd>Space</kbd>
					</button>
					<button
						class="btn"
						onclick={stepForward}
						disabled={isRunning || phase === 'done'}
						title="Advance one cell at a time (→)"
					>
						<SkipForward size={14} /> Step <kbd>→</kbd>
					</button>
				</div>
			</div>

			<div class="group">
				<span class="label">Speed</span>
				<div class="segmented" role="radiogroup" aria-label="Playback speed">
					{#each SPEED_OPTIONS as opt}
						<button
							role="radio"
							aria-checked={speed === opt.id}
							class:active={speed === opt.id}
							onclick={() => (speed = opt.id)}>{opt.label}</button
						>
					{/each}
				</div>
			</div>

			<div class="group maze-actions">
				<span class="label">Maze</span>
				<div class="row">
					<button class="btn" onclick={newMaze} title="Generate a new maze (N)">
						<Shuffle size={14} /> New maze <kbd>N</kbd>
					</button>
					<button
						class="btn"
						onclick={resetRun}
						disabled={phase === 'idle'}
						title="Clear the run but keep this maze (R)"
					>
						<RotateCcw size={14} /> Reset run
					</button>
					<button class="btn" onclick={emptyGrid} title="Remove every wall">
						<Eraser size={14} /> Empty grid
					</button>
				</div>
			</div>
		</div>

		<!-- ── Board + results ──────────────────────────────────────────────── -->
		<div class="main">
			<div class="board">
				<div class="maze-area">
					<MazeGrid
						{grid}
						{animState}
						{isRunning}
						onPaintStart={handlePaintStart}
						onPaint={handlePaint}
						onMoveMarker={handleMoveMarker}
						onInteract={() => (hasDrawn = true)}
					/>
				</div>

				<div class="hint" class:locked={isRunning}>
					{#if isRunning}
						<span>Editing is paused while it solves — press <kbd>Space</kbd> to pause.</span>
					{:else}
						<span class="tip" class:nudge={!hasDrawn}>
							<MousePointerClick size={14} />
							<span><b>Click or drag</b> to draw walls · drag over a wall to erase</span>
						</span>
						<span class="tip">
							<span class="chip" style="background:{PALETTE.start}"></span>
							<span><b>Drag</b> to move the start</span>
						</span>
						<span class="tip">
							<span class="chip" style="background:{PALETTE.end}"></span>
							<span><b>Drag</b> to move the goal</span>
						</span>
					{/if}
				</div>
			</div>

			<aside class="side">
				<ResultPanel
					{phase}
					liveVisited={animState?.currentStep ?? 0}
					{latest}
					{runs}
					{runId}
					{algorithm}
					onTryOther={(a) => {
						algorithm = a;
						run();
					}}
				/>

				<div class="legend">
					<span class="legend-item"><span class="dot" style="background:{PALETTE.start}"></span>Start</span>
					<span class="legend-item"><span class="dot" style="background:{PALETTE.end}"></span>Goal</span>
					<span class="legend-item"><span class="dot" style="background:{slimeSwatch}"></span>Explored</span>
					<span class="legend-item"><span class="dot" style="background:{PALETTE.path}"></span>Path</span>
					<span class="legend-item"><span class="dot" style="background:{PALETTE.open}"></span>Floor</span>
					<span class="legend-item"
						><span class="dot wall" style="background:{PALETTE.board}"></span>Wall</span
					>
				</div>
			</aside>
		</div>
	</div>
</SecretLayout>

<style>
	/* ── Reveal: grow a dark board out of the face colour ─────────────────────── */
	@property --reveal {
		syntax: '<percentage>';
		inherits: false;
		initial-value: 0%;
	}

	.reveal-bg {
		position: fixed;
		inset: 0;
		z-index: 0;
		pointer-events: none;
		/* the face colour keeps a share of the rim, so the page still reads as this face */
		background: radial-gradient(
			ellipse at 50% 55%,
			#0e0e10 0%,
			#121113 55%,
			color-mix(in srgb, var(--face) 30%, #121113) 100%
		);
		--mask: radial-gradient(
			ellipse at 50% 55%,
			#000 calc(var(--reveal) - 25%),
			transparent var(--reveal)
		);
		-webkit-mask-image: var(--mask);
		mask-image: var(--mask);
		animation: reveal 1.3s cubic-bezier(0.65, 0, 0.35, 1) 0.05s both;
	}

	@keyframes reveal {
		from {
			--reveal: 0%;
			opacity: 0.4;
		}
		to {
			--reveal: 140%;
			opacity: 1;
		}
	}

	/* ── Layout shell ────────────────────────────────────────────────────────── */
	.page {
		position: relative;
		z-index: 1;
		width: 100%;
		max-width: 1280px;
		height: 100%;
		margin: 0 auto;
		display: grid;
		grid-template-rows: auto auto minmax(0, 1fr);
		gap: 1rem;
		padding: 1.4rem 1.75rem 1.2rem;
		box-sizing: border-box;
		color: white;
	}

	kbd {
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 0.58rem;
		padding: 0.05rem 0.32rem;
		border: 1px solid rgba(255, 255, 255, 0.22);
		border-bottom-width: 2px;
		border-radius: 4px;
		color: rgba(255, 255, 255, 0.75);
		line-height: 1.3;
	}

	/* ── Arrival ─────────────────────────────────────────────────────────────── */
	.arrival {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		padding-right: 3rem; /* clear the overlay's close button */
		animation: slide-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.45s both;
	}

	.eyebrow {
		font-size: 0.62rem;
		text-transform: uppercase;
		letter-spacing: 0.18em;
		color: rgb(250, 204, 21);
	}

	h1 {
		margin: 0;
		font-size: clamp(1.5rem, 3vw, 2.3rem);
		font-weight: 300;
		letter-spacing: -0.02em;
		line-height: 1.1;
	}

	.arrival p {
		margin: 0;
		max-width: 62ch;
		font-size: 0.8rem;
		line-height: 1.55;
		color: rgba(255, 255, 255, 0.68);
	}

	/* ── Controls ────────────────────────────────────────────────────────────── */
	.controls {
		display: flex;
		align-items: flex-end;
		gap: 1.1rem 1.5rem;
		flex-wrap: wrap;
		animation: slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.55s both;
	}

	.group {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.maze-actions {
		margin-left: auto;
	}

	.label {
		font-size: 0.6rem;
		text-transform: uppercase;
		letter-spacing: 0.14em;
		color: rgba(255, 255, 255, 0.55);
	}

	.row {
		display: flex;
		gap: 0.4rem;
		flex-wrap: wrap;
	}

	button {
		font-family: inherit;
	}

	.solve {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		/* fits the longest label ("Run again") so the row never reflows mid-run */
		min-width: 11.25rem;
		justify-content: center;
		padding: 0.62rem 1.1rem;
		border: 1px solid rgb(250, 204, 21);
		border-radius: 999px;
		background: rgb(250, 204, 21);
		color: #1a1405;
		font-size: 0.8rem;
		font-weight: 600;
		letter-spacing: 0.02em;
		cursor: pointer;
		box-shadow: 0 0 24px -4px rgba(250, 204, 21, 0.55);
		transition:
			transform 0.12s,
			box-shadow 0.2s,
			background 0.2s;
	}

	.solve kbd {
		border-color: rgba(26, 20, 5, 0.35);
		color: rgba(26, 20, 5, 0.75);
	}

	.solve:hover {
		box-shadow: 0 0 32px -2px rgba(250, 204, 21, 0.75);
	}

	.solve:active {
		transform: scale(0.97);
	}

	.solve.running {
		background: transparent;
		color: rgb(253, 224, 71);
	}

	.solve.running kbd {
		border-color: rgba(253, 224, 71, 0.4);
		color: rgba(253, 224, 71, 0.8);
	}

	.btn {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.5rem 0.85rem;
		border: 1px solid rgba(255, 255, 255, 0.16);
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.05);
		color: rgba(255, 255, 255, 0.85);
		font-size: 0.72rem;
		cursor: pointer;
		transition:
			border-color 0.15s,
			background 0.15s,
			color 0.15s;
	}

	.btn:hover:not(:disabled) {
		border-color: rgba(255, 255, 255, 0.35);
		background: rgba(255, 255, 255, 0.1);
		color: white;
	}

	.btn:disabled {
		opacity: 0.35;
		cursor: not-allowed;
	}

	.segmented {
		display: inline-flex;
		padding: 0.2rem;
		border: 1px solid rgba(255, 255, 255, 0.14);
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.04);
	}

	.segmented button {
		padding: 0.35rem 0.75rem;
		border: none;
		border-radius: 999px;
		background: none;
		color: rgba(255, 255, 255, 0.6);
		font-size: 0.72rem;
		cursor: pointer;
		transition:
			background 0.15s,
			color 0.15s;
	}

	.segmented button:hover {
		color: white;
	}

	.segmented button.active {
		background: rgba(255, 255, 255, 0.9);
		color: #111;
		font-weight: 600;
	}

	/* ── Board + side panel ──────────────────────────────────────────────────── */
	.main {
		display: grid;
		grid-template-columns: minmax(0, 1fr) 270px;
		gap: 1rem;
		min-height: 0;
		animation: slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.65s both;
	}

	.board {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		min-height: 0;
		padding: 0.9rem;
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 14px;
		background: #0c0c0e;
		box-shadow:
			0 30px 80px -30px rgba(0, 0, 0, 0.9),
			inset 0 1px 0 rgba(255, 255, 255, 0.04);
	}

	.maze-area {
		flex: 1;
		min-height: 0;
		display: flex;
	}

	.hint {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.4rem 1.2rem;
		font-size: 0.72rem;
		color: rgba(255, 255, 255, 0.65);
	}

	.hint b {
		color: white;
		font-weight: 600;
	}

	.hint.locked {
		color: rgba(253, 224, 71, 0.85);
	}

	.tip {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
	}

	/* a gentle nudge until the visitor first touches the grid */
	.tip.nudge {
		animation: nudge 2.4s ease-in-out 1.6s infinite;
	}

	.chip {
		width: 0.75rem;
		height: 0.75rem;
		border-radius: 3px;
		flex-shrink: 0;
	}

	.side {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		min-height: 0;
		overflow-y: auto;
	}

	.legend {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.45rem 0.75rem;
		padding: 0.8rem 1rem;
		border: 1px solid rgba(255, 255, 255, 0.07);
		border-radius: 10px;
	}

	.legend-item {
		display: flex;
		align-items: center;
		gap: 0.45rem;
		font-size: 0.62rem;
		color: rgba(255, 255, 255, 0.65);
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}

	.dot {
		width: 11px;
		height: 11px;
		border-radius: 3px;
		flex-shrink: 0;
	}

	.dot.wall {
		border: 1px solid rgba(255, 255, 255, 0.25);
	}

	/* ── Animations ──────────────────────────────────────────────────────────── */
	@keyframes slide-up {
		from {
			opacity: 0;
			translate: 0 10px;
		}
		to {
			opacity: 1;
			translate: 0 0;
		}
	}

	@keyframes nudge {
		0%,
		100% {
			color: rgba(255, 255, 255, 0.65);
		}
		50% {
			color: rgb(253, 224, 71);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.reveal-bg,
		.arrival,
		.controls,
		.main,
		.tip.nudge {
			animation: none;
		}

		.reveal-bg {
			--reveal: 140%;
		}
	}

	/* ── Responsive ──────────────────────────────────────────────────────────── */
	@media (max-width: 900px) {
		.page {
			height: auto;
			grid-template-rows: auto;
			padding: 1rem 1rem 1.5rem;
		}

		.main {
			grid-template-columns: 1fr;
		}

		.maze-area {
			flex: none;
			aspect-ratio: 25 / 17;
		}

		.maze-actions {
			margin-left: 0;
		}

		.side {
			overflow: visible;
		}
	}
</style>
