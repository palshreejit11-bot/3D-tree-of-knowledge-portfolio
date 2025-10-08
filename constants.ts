
import { Section } from './types';

export const SECTION_DATA: Section[] = [
    { // 0 degrees
        id: 'what-we-build',
        title: 'SYNAPSE DIGITAL',
        subtitle: 'Innovate. Perform. Scale.',
        items: [
            { text: "UI/UX Design", position: [-1.8, 2.5, 2] },
            { text: "Frontend Development with AI", position: [-0.8, 1, 2.8] },
            { text: "API Integration", position: [0.8, 1.5, 2.5] },
            { text: "Cloud Solutions", position: [2, 3, 1.8] },
        ]
    },
    { // 90 degrees
        id: 'our-work',
        title: 'Our Work',
        subtitle: 'Case Studies in Innovation',
        items: [
            { text: "Project Alpha", position: [-2, 3, -1.5] },
            { text: "Project Beta", position: [-1, 1.2, -2.5] },
            { text: "Project Gamma", position: [1.2, 2, -2.8] },
            { text: "Project Delta", position: [2.2, 3.5, -1] },
        ]
    },
    { // 180 degrees
        id: 'our-philosophy',
        title: 'Our Philosophy',
        subtitle: 'Principles that Guide Us',
        items: [
            { text: "Innovation", position: [-2, 2, -2] },
            { text: "Performance", position: [0, 1, -3] },
            { text: "Scalability", position: [2, 2.5, -2.2] },
        ]
    },
    { // 270 degrees
        id: 'contact-us',
        title: 'Contact Us',
        subtitle: 'Let\'s Build the Future Together',
        items: [
            // No fruits, panel is handled separately
        ]
    }
];
