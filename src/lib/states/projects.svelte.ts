export enum Category {
	Web3 = 'web3',
	Fullstack = 'fullstack',
	Frontend = 'frontend',
	Backend = 'backend',
	Hackathon = 'hackathon',
	Featured = 'featured',
	Experiment = 'experiment'
}

export interface ProjectLink {
	label: string;
	href: string;
	kind: 'live' | 'github' | 'demo' | 'other';
}

export interface Project {
	slug: string;
	name: string;
	tagline: string; // short compelling one-liner (new)
	description: string;
	stack: string[];
	categories: Category[]; // was single `category`, now array
	image?: string;
	images?: string[]; // additional screenshots
	year: string;
	status?: 'in-progress' | 'complete' | 'archived';
	featured?: boolean; // marks hero-tier projects
	role?: string; // my role on the project
	overview?: string; // what the project does / why it was built
	approach?: string; // how I built it — architecture, key decisions
	contribution?: string; // what I personally did / built
	outcome?: string; // result, what was learned
	links: ProjectLink[];
}

export const projects: Project[] = [
	{
		slug: 'swix',
		name: 'Swix',
		tagline: 'A full Twitter clone built from scratch — real-time feeds, follows, interactions.',
		description:
			'A fully functional Twitter-like social platform with real-time feeds, follows, and interactions.',
		stack: ['SvelteKit 5', 'Django', 'Supabase', 'PostgreSQL'],
		categories: [Category.Fullstack, Category.Featured],
		image: 'swix.png',
		year: '2024',
		status: 'complete',
		featured: true,
		role: 'Solo developer — full-stack',
		overview:
			'Swix is a full-featured social platform modelled after Twitter. Users can sign up, post, follow other users, like and reply to posts, and see a personalised feed in real time. The project was built to demonstrate end-to-end fullstack capability: authentication, relational data modelling, real-time subscriptions, and a polished SvelteKit frontend.',
		approach:
			'The backend is a Django REST API backed by PostgreSQL, with Supabase handling real-time subscriptions and auth. The frontend is SvelteKit 5 using Svelte\'s runes reactivity model. The feed is driven by a PostgreSQL query that aggregates posts from followed users, sorted by recency. Real-time updates use Supabase\'s websocket channels so new posts appear without a page reload.',
		contribution:
			'Designed and built the entire project solo — API design, database schema, auth flow, feed algorithm, frontend components, and deployment.',
		outcome:
			'A production-deployed application that demonstrates end-to-end fullstack development. The project is live and functional at swix-lake.vercel.app.',
		links: [
			{ label: 'Live', href: 'https://swix-lake.vercel.app/', kind: 'live' },
			{
				label: 'GitHub',
				href: 'https://github.com/LukoOG/Fullstack_projects/tree/main/Social-media',
				kind: 'github'
			}
		]
	},
	{
		slug: 'sui-profile',
		name: 'Sui Profile',
		tagline: 'Decentralised identity on-chain — own your profile as a Sui blockchain object.',
		description:
			'A decentralised application built on the Sui blockchain. It allows users to own and display profile cards, providing a means of decentralised identification.',
		stack: ['Next.js', 'Move', 'Sui', 'TypeScript'],
		categories: [Category.Web3, Category.Frontend, Category.Featured],
		image: 'sui-profile.png',
		year: '2024',
		status: 'complete',
		featured: true,
		role: 'Solo developer — smart contract + frontend',
		overview:
			'Sui Profile is a decentralised identity application on the Sui blockchain. Users connect their wallet and mint a profile object — stored on-chain as a Sui Move object they genuinely own. The profile is then displayed through a Next.js frontend. The project explores what self-sovereign identity looks like in a blockchain context.',
		approach:
			'The smart contract is written in Move, Sui\'s native language. The profile is represented as a non-transferable on-chain object owned by the user\'s wallet address. The frontend uses Sui\'s TypeScript SDK to read on-chain state and submit transactions. State management is minimal — the source of truth is the blockchain.',
		contribution:
			'Wrote the Move smart contract, designed the on-chain data model, and built the entire frontend integration with Sui\'s wallet adapter.',
		outcome:
			'A deployed dApp that demonstrates smart contract development in Move and on-chain state management. Gave me practical experience with blockchain app architecture beyond typical EVM chains.',
		links: [
			{ label: 'Live', href: 'https://sui-profile-dapp.vercel.app/', kind: 'live' },
			{ label: 'GitHub', href: 'https://github.com/LukoOG/sui-profile-dapp', kind: 'github' }
		]
	},
	{
		slug: 'svellit',
		name: 'Svellit',
		tagline: 'A food e-commerce platform with cart, checkout, and real order management.',
		description:
			'A fully functional e-commerce food platform with cart, checkout, and order management.',
		stack: ['SvelteKit 5', 'Django', 'Supabase'],
		categories: [Category.Fullstack],
		image: 'svellit.png',
		year: '2024',
		status: 'complete',
		role: 'Solo developer — full-stack',
		overview:
			'Svellit is a food e-commerce platform where users can browse a menu, add items to a cart, check out, and track orders. It covers the full lifecycle of an e-commerce transaction from browsing to order confirmation.',
		approach:
			'Same Django + SvelteKit stack as Swix, with Supabase for the database. The cart state is managed client-side in Svelte stores and synced to the backend on checkout. Order management persists to PostgreSQL with status tracking.',
		contribution:
			'Built the entire project solo — product catalogue API, cart logic, checkout flow, order management, and the SvelteKit frontend.',
		outcome: 'A functional e-commerce application deployed to Vercel.',
		links: [
			{ label: 'Live', href: 'https://svellit-diamond.vercel.app/', kind: 'live' },
			{
				label: 'GitHub',
				href: 'https://github.com/LukoOG/Fullstack_projects/tree/main/E-commerce',
				kind: 'github'
			}
		]
	},
	{
		slug: 'cartolinks',
		name: 'CartoLinks',
		tagline: 'Pixel-perfect Figma-to-code implementation — responsive and production ready.',
		description:
			'Frontend implementation of a Figma design — pixel-perfect, responsive, and production ready.',
		stack: ['Next.js', 'TypeScript'],
		categories: [Category.Frontend],
		image: 'cartolinks-1.png',
		images: ['cartolinks-1.png', 'cartolinks-2.png'],
		year: '2024',
		status: 'complete',
		role: 'Frontend developer',
		overview:
			'CartoLinks is a pixel-perfect implementation of a provided Figma design, built as a frontend engineering exercise. The goal was to translate a design specification into production-ready code — matching layout, typography, spacing, and interaction fidelity as closely as possible.',
		approach:
			'Built with Next.js and TypeScript. Used CSS modules for component-scoped styling. Responsive layout implemented with CSS Grid and Flexbox. Hover states and interactive elements matched the Figma spec.',
		contribution:
			'Translated the complete Figma design into a fully responsive Next.js application, independently.',
		outcome:
			'A deployed, responsive implementation that demonstrates precision in frontend engineering and design fidelity.',
		links: [
			{ label: 'Live', href: 'https://cartolinks-application.vercel.app/', kind: 'live' },
			{
				label: 'GitHub',
				href: 'https://github.com/LukoOG/cartolinks-application-assignment',
				kind: 'github'
			}
		]
	}
];
