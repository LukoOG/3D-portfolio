import type { Picture } from '@sveltejs/enhanced-img';
import Placeholder from '$lib/assets/project-images/placeholder.png?enhanced';

const images = import.meta.glob('$lib/assets/project-images/*', {
	import: 'default',
	eager: true,
	query: { enhanced: true }
});

//Normalized Map
const imageMap = new Map(
	Object.entries(images).map(([path, image]) => [path.split('/').pop(), image])
);

export function getImage(name: string | undefined): Picture {
	// console.log(Object.keys(images));
	// console.log(imageMap);
	if (!name) return Placeholder;
	return (imageMap.get(name) as Picture) ?? Placeholder;
}
