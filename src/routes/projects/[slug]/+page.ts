import { projects } from '$lib/states/projects.svelte';
import { error } from '@sveltejs/kit';
import type { EntryGenerator, PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const project = projects.find((p) => p.slug === params.slug);

	if (!project) {
		error(404, { message: `Project "${params.slug}" not found.` });
	}

	return { project };
};

// Required for static prerendering — tell SvelteKit which slugs exist
export const entries: EntryGenerator = () => {
	return projects.map((p) => ({ slug: p.slug }));
};
