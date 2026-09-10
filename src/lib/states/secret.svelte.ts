import { TOKEN_MAP } from '../../routes/secret/lib/tokens';
import { cubeState } from './cubeState.svelte';

const PAGE_TOKENS = Object.values(TOKEN_MAP);

export const progress = $state({
	visited: new Set<String>(),
	stage: 0,
	keyFound: false,
	cipherSolved: false
});

export const markVisited = (token: String) => {
	if(cubeState.mode != 'entered') return
	progress.visited.add(token);
	persist();
};

export const allVisited = (): boolean => {
	return PAGE_TOKENS.every((t) => progress.visited.has(t));
};

export function persist() {
	localStorage.setItem(
		'_p',
		JSON.stringify({
			v: [...progress.visited],
			s: progress.stage,
			k: progress.keyFound,
			c: progress.cipherSolved,
		})
	);
}

export function hydrate() {
	const raw = localStorage.getItem('_p');
	if (!raw) return;
	try {
		const data = JSON.parse(raw);
		progress.visited = new Set(data.v);
		progress.stage = data.s;
		progress.keyFound = data.k;
		progress.cipherSolved = data.c;
	} catch {}
}

