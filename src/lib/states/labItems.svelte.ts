import { Palette, Terminal, Package, Wrench } from '@lucide/svelte';

export type LabCategory = 'generative' | 'cli' | 'opensource' | 'experiment';

export interface LabItem {
	name: string;
	description: string;
	category: LabCategory;
	tags: string[];
	github?: string;
	live?: string;
    origin?: string;
	wip?: boolean;
}

export const categoryMeta: Record<LabCategory, { label: string; icon: any; color: string }> = {
	generative: { label: 'Generative', icon: Palette, color: '#e879f9' },
	cli: { label: 'CLI Tool', icon: Terminal, color: '#34d399' },
	opensource: { label: 'Open Source', icon: Package, color: '#60a5fa' },
	experiment: { label: 'Experiment', icon: Wrench, color: '#fb923c' }
};

export const items: LabItem[] = [
	{
		name: 'Experiment 001',
		description:
			'A generative art piece exploring noise fields and particle systems. Replace this with your actual experiment.',
		category: 'generative',
		tags: ['canvas', 'noise', 'animation'],
		live: 'https://',
		github: 'https://github.com/',
		wip: true
	},
	{
		name: 'minigrep',
		description:
			'A command line search tool built from the Rust Book — searches for a string pattern across file contents. My first step into systems programming.',
		category: 'cli',
		tags: ['rust', 'cli', 'systems'],
		github: 'https://github.com/LukoOG/minigrep',
		wip: false,
        origin: "The Official Rust Book"
	},
	{
		name: 'OSS Contribution',
		description: 'A contribution to an open source project. Describe what you fixed or added.',
		category: 'opensource',
		tags: ['typescript', 'open-source'],
		github: 'https://github.com/'
	},
	{
		name: 'Throwaway 001',
		description:
			'A small throwaway project built over a weekend to try out a new technology or idea.',
		category: 'experiment',
		tags: ['rust', 'wasm'],
		github: 'https://github.com/',
		wip: true
	}
];
