// Import images
import IntegrationProjectY1 from '../../images/integration-project-y1.jpg';
import categories from '../../utils/categories';

export default {
	ProjectHeader: {
		title: '1st Year integration project',
		publishDate: 'Jul 2024',
		tags: categories.WebApp,
	},
	ProjectImages: [
		{
			id: 0,
			title: 'Screenshot of one part of my 1st year integration project',
			img: IntegrationProjectY1,
		},
	],
	ProjectInfo: {
		ClientHeading: 'About my school',
		CompanyInfo: [
			{
				id: 0,
				title: 'Name',
				details: 'Imerir / Cnam occitanie',
			},
			{
				id: 1,
				title: 'Website',
				details: 'https://imerir.com',
			},
			{
				id: 2,
				title: 'Website',
				details: 'https://www.cnam-occitanie.fr/',
			},
			{
				id: 3,
				title: "Imerir's Phone",
				details: '+33 (0) 4 68 56 80 18',
			},
			{
				id: 4,
				title: "Cnam's Phone",
				details: '+33 (0) 4 67 63 63 40',
			},
			{
				id: 5,
				title: 'My position',
				details: "work-study"
			}
		],
		ObjectivesHeading: 'Objective',
		ObjectivesDetails: "Create a smart weather station",
		Technologies: {
			title: 'Tools & Technologies',
			techs: [
				'Java',
				'Javascript',
				'Python',
				'Arduino (C++)',
				'Nodejs',
				'React.js',
				'Vite.js',
				'Visual Studio Code',
				'Electronics'
			],
		},
		ProjectDetailsHeading: 'Challenge',
		ProjectDetails: [
			{
				id: 0,
				details: "I realized this project when i was work-study student, currently at my school 'Imerir'",
			},
			{
				id: 1,
				details: "The goal of this project was to create from scratch a DIY weather station by team, in my team i was choosen to devellop the whole project, split in 3 section, the backend server, made wih node.js, the frontend, made with Vite.js + React.js, and the code of the arduino, were all the sensors was plugged, at the end with all elements communicated to each other, created our 1st year integration project",
			}
		],
	},
	RelatedProject: {
		title: 'Related Projects',
		Projects: [0, 1, 2],
	},
};
