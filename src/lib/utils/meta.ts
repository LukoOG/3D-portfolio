// Link-preview metadata (Open Graph + Twitter cards) for every route.
//
// Pages render inside the cube overlay only on the client, so their own
// <svelte:head> never reaches the prerendered HTML that X/LinkedIn scrape.
// The root layout renders these tags instead.

import type { Project } from '$lib/states/projects.svelte';

/** Production origin — prerendering has no real host, so absolute URLs use this. */
export const SITE_URL = 'https://sipe-portfolio.vercel.app';

const NAME = 'Emmanuel Adesipe';
const X_HANDLE = '@Sipe_OG1';

const DEFAULT_IMAGE = {
	url: `${SITE_URL}/og.png`,
	width: 1200,
	height: 630,
	alt: 'Emmanuel Adesipe — Fullstack Developer. A portfolio you explore as a 3D cube.'
};

// project screenshots as plain asset URLs (the enhanced-img versions aren't linkable)
const projectImageUrls = import.meta.glob('$lib/assets/project-images/*', {
	query: '?url',
	import: 'default',
	eager: true
}) as Record<string, string>;

function projectImage(name: string | undefined): string | null {
	if (!name) return null;
	const match = Object.entries(projectImageUrls).find(([path]) => path.endsWith(`/${name}`));
	return match ? `${SITE_URL}${match[1]}` : null;
}

export interface PageMeta {
	title: string;
	description: string;
	url: string;
	image: { url: string; width?: number; height?: number; alt: string };
	handle: string;
	siteName: string;
}

const PAGES: Record<string, { title: string; description: string }> = {
	'/': {
		title: `${NAME} · Fullstack Developer`,
		description:
			'Backend-focused fullstack developer building APIs, pipelines and the occasional pretty frontend. Open to backend, fullstack and freelance work. Explore my portfolio as a 3D cube — and find the hidden face.'
	},
	'/about': {
		title: `About · ${NAME}`,
		description:
			'Fullstack developer with a backend focus. I build backend systems and the interfaces on top of them, and I’m going deep on Rust, Go and systems design.'
	},
	'/projects': {
		title: `Projects · ${NAME}`,
		description:
			'Products, experiments and systems — from Snapr, a content-addressed snapshot tool in Rust, to Swix, a real-time social platform.'
	},
	'/lab': {
		title: `The Lab · ${NAME}`,
		description:
			'Questions that became code: experiments, rabbit holes and things I built to understand how they work.'
	},
	'/contact': {
		title: `Contact · ${NAME}`,
		description:
			'Open to backend, fullstack and remote roles, and to freelance projects. Get in touch.'
	},
	'/secret': {
		title: `? · ${NAME}`,
		description: 'There’s a hidden face on this cube. Exploring it takes more than clicking a button.'
	}
};

export function getMeta(pathname: string, data: { project?: Project } = {}): PageMeta {
	const path = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname;
	const url = `${SITE_URL}${path}`;
	const base = { url, handle: X_HANDLE, siteName: NAME };

	if (data.project) {
		const p = data.project;
		const shot = projectImage(p.image);
		return {
			...base,
			title: `${p.name} · ${NAME}`,
			description: p.tagline,
			image: shot ? { url: shot, alt: `${p.name} — ${p.tagline}` } : DEFAULT_IMAGE
		};
	}

	const page = PAGES[path] ?? PAGES['/'];
	return { ...base, ...page, image: DEFAULT_IMAGE };
}
