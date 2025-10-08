import { Section } from './types';

export const SECTION_DATA: Section[] = [
    { // 0 degrees
        id: 'what-we-build',
        title: 'SYNAPSE DIGITAL',
        subtitle: 'Innovate. Perform. Scale.',
        items: [
            { text: "UI/UX Design", position: [-2.5, 4, 1] },
            { text: "Frontend Development with AI", position: [-1.5, 1, 2] },
            { text: "API Integration", position: [2, 3.5, 0.5] },
            { text: "Cloud Solutions", position: [1, 1.5, 1.8] },
        ]
    },
    { // 90 degrees
        id: 'our-work',
        title: 'Our Work',
        subtitle: 'Case Studies in Innovation',
        items: [
            { 
                text: "Project Alpha", 
                position: [-2, 3.8, -0.5],
                description: "A groundbreaking UI/UX redesign for a leading fintech company, leveraging AI-driven analytics to personalize user journeys. The result was a 40% increase in user engagement and a 25% reduction in churn.",
                image: "https://via.placeholder.com/400x300.png/00e7ff/000510?text=Project+Alpha"
            },
            { 
                text: "Project Beta", 
                position: [-1.2, 1.2, -1.8],
                description: "Developed a scalable cloud-native platform for a major e-commerce client, handling over 1 million concurrent users during peak loads. Integrated a serverless architecture to optimize costs and performance.",
                image: "https://via.placeholder.com/400x300.png/00e7ff/000510?text=Project+Beta"
            },
            { 
                text: "Project Gamma", 
                position: [2.2, 4, -0.2],
                description: "Seamless API integration for a healthcare provider, connecting disparate legacy systems into a unified, modern data fabric. This enabled real-time patient data access and improved diagnostic accuracy.",
                image: "https://via.placeholder.com/400x300.png/00e7ff/000510?text=Project+Gamma"
            },
            { 
                text: "Project Delta", 
                position: [1.5, 1.8, -1.5],
                description: "Created a bespoke frontend experience for a streaming service, featuring a custom 3D interactive content browser. The project focused on performance and a visually rich, immersive user interface.",
                image: "https://via.placeholder.com/400x300.png/00e7ff/000510?text=Project+Delta"
            },
        ]
    },
    { // 180 degrees
        id: 'our-philosophy',
        title: 'Our Philosophy',
        subtitle: 'Principles that Guide Us',
        items: [
            { text: "Innovation", position: [-2.2, 3, -1] },
            { text: "Performance", position: [-1, 1.5, -2] },
            { text: "Scalability", position: [2.5, 3.5, -0.8] },
            { text: "User-Centric", position: [1.2, 1, -1.8] },
        ]
    },
    { // 270 degrees
        id: 'contact-us',
        title: 'Contact Us',
        subtitle: 'Let\'s Build the Future Together',
        items: []
    }
];