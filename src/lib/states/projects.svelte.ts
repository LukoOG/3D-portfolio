export enum Category {
    Web3 = "web3",
    Fullstack = "fullstack",
    Frontend = "frontend",
    Backend = "backend"
}


export interface Project {
	name: string;
	description: string;
	stack: string[];
	category: Category;
	image?: string;
	year: string;
	github: string;
	live: string;
	status?: 'in-progress';
}

// const getImageLink = (name: string) => `${name}`

export const projects: Project[] = [
	{
		name: 'Swix',
		description:
			'A fully functional Twitter-like social platform with real-time feeds, follows, and interactions.',
		stack: ['SvelteKit 5', 'Django', 'Supabase'],
		category: Category.Fullstack,
		image: 'swix.png',
		year: '2024',
		github: 'https://github.com/LukoOG/Fullstack_projects/tree/main/Social-media',
		live: 'https://swix-lake.vercel.app/',
		// status: 'in-progress'
	},
	{
		name: 'Svellit',
		description:
			'A fully functional e-commerce food platform with cart, checkout, and order management.',
		stack: ['SvelteKit 5', 'Django', 'Supabase'],
		category: Category.Fullstack,
		image: 'svellit.png',
		year: '2024',
		github: 'https://github.com/LukoOG/Fullstack_projects/tree/main/E-commerce',
		live: 'https://svellit-diamond.vercel.app/'
	},
	{
		name: 'CartoLinks',
		description:
			'Frontend implementation of a Figma design — pixel-perfect, responsive, and production ready.',
		stack: ['Next.js'],
		category: Category.Frontend,
		image: 'cartolinks-1.png',
		year: '2024',
		github: 'https://github.com/LukoOG/cartolinks-application-assignment',
		live: 'https://cartolinks-application.vercel.app/'
	},
	{
		name: 'Sui Profile',
		description: 'A decentralised application built on the Sui blockchain. It allows Users to own and display profile cards, providing a means of decentralised identification.',
		stack: ['Next.js', 'Move', 'Sui'],
		category: Category.Web3,
		image: 'sui-profile.png',
		year: '2024',
		github: 'https://github.com/LukoOG/sui-profile-dapp',
		live: 'https://sui-profile-dapp.vercel.app/'
	},
];
