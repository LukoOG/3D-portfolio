export interface Project {
	name: string;
	description: string;
	stack: string[];
	category: string;
	image?: string;
	year: string;
	github: string;
	live: string;
	status?: 'in-progress';
}

export const projects: Project[] = [
	{
		name: 'Swix',
		description:
			'A fully functional Twitter-like social platform with real-time feeds, follows, and interactions.',
		stack: ['SvelteKit 5', 'Django', 'Supabase'],
		category: 'Fullstack',
		year: '2024',
		github: 'https://github.com/',
		live: 'https://',
		status: 'in-progress'
	},
	{
		name: 'Svellit',
		description:
			'A fully functional e-commerce food platform with cart, checkout, and order management.',
		stack: ['SvelteKit 5', 'Django', 'Supabase'],
		category: 'Fullstack',
		year: '2024',
		github: 'https://github.com/',
		live: 'https://'
	},
	{
		name: 'CartoLinks',
		description:
			'Frontend implementation of a Figma design — pixel-perfect, responsive, and production ready.',
		stack: ['Next.js'],
		category: 'Frontend',
		year: '2024',
		github: 'https://github.com/',
		live: 'https://'
	},
	{
		name: 'Sui Project 1',
		description: 'A decentralised application on the Sui blockchain.',
		stack: ['Next.js', 'Move', 'Sui'],
		category: 'Web3',
		year: '2024',
		github: 'https://github.com/',
		live: 'https://'
	},
	{
		name: 'Sui Project 2',
		description: 'A decentralised application on the Sui blockchain.',
		stack: ['Next.js', 'Move', 'Sui'],
		category: 'Web3',
		year: '2024',
		github: 'https://github.com/',
		live: 'https://'
	}
];
