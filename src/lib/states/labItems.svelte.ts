import { Palette, Terminal, Package, Wrench, Cpu, Globe } from '@lucide/svelte';

export type LabDomain =
	| 'systems'
	| 'generative'
	| 'cli'
	| 'web'
	| 'opensource'
	| 'experiment'
	| 'tooling';

export interface LabItem {
	slug: string; // unique identifier
	name: string;
	question?: string; // "what was I curious about?" — the spark
	description: string; // what it is / what I did
	domain: LabDomain;
	tags: string[];
	github?: string;
	live?: string;
	origin?: string; // e.g. "The Rust Book" — where the idea came from
	wip?: boolean;
	featured?: boolean; // marks a current or especially notable experiment
	year?: string;
}

export interface TipItem {
	tip: string;
	probability: number;
}

export const domainMeta: Record<LabDomain, { label: string; icon: any; color: string }> = {
	systems: { label: 'Systems', icon: Cpu, color: '#34d399' },
	generative: { label: 'Generative', icon: Palette, color: '#e879f9' },
	cli: { label: 'CLI', icon: Terminal, color: '#34d399' },
	web: { label: 'Web', icon: Globe, color: '#60a5fa' },
	opensource: { label: 'Open Source', icon: Package, color: '#60a5fa' },
	experiment: { label: 'Experiment', icon: Wrench, color: '#fb923c' },
	tooling: { label: 'Tooling', icon: Wrench, color: '#fb923c' }
};

export const items: LabItem[] = [
	{
		slug: 'minigrep',
		name: 'minigrep',
		question: 'What does it actually take to build a basic search tool from scratch?',
		description:
			'A command-line search tool that finds a string pattern across file contents — built while working through the Rust Book. My first real step into systems programming.',
		domain: 'systems',
		tags: ['rust', 'cli', 'systems programming'],
		github: 'https://github.com/LukoOG/minigrep',
		origin: 'The Rust Book',
		wip: false,
		year: '2024'
	}
];

// More experiments incoming — the lab is actively growing.

export const tips: TipItem[] = [
	{
		tip: 'Return to the 3D scene by pressing Escape or clicking the close button at the top right.',
		probability: 10
	}
];
