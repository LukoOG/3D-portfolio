	export interface Timeline {
		year: string;
		title: string;
		description: string;
		type: 'current' | 'education'
	}
	
	export const timeline: Timeline[] = [
		{
			year: '2025',
			title: 'Open to opportunities',
			description: 'Actively seeking fullstack or backend roles.',
			type: 'current'
		},
		{
			year: '2024',
			title: 'Bootcamp Graduate',
			description:
				'Completed an intensive fullstack development bootcamp, sharpening backend systems and API design.',
			type: 'education'
		},
		{
			year: '2023',
			title: 'Self-taught Journey Begins',
			description:
				'Started learning programming independently — fell in love with building backend systems.',
			type: 'education'
		}
	];