// Import images
import SmartAssiantImage from '../../images/SmartAssistant.jpg';
import categories from '../../utils/categories';

export default {
	ProjectHeader: {
		title: 'Smart chat assistant to easly learn french-canadian',
		publishDate: 'Jul 2024',
		tags: categories.WebApp,
	},
	ProjectImages: [
		{
			id: 0,
			title: 'Screen of the chat assistant',
			img: SmartAssiantImage,
		},
	],
	ProjectInfo: {
		ClientHeading: 'About my school',
		CompanyInfo: [
			{
				id: 0,
				title: 'Name',
				details: 'Upwork',
			},
			{
				id: 1,
				title: 'Website',
				details: 'https://upwork.com',
			},
			{
				id: 5,
				title: 'My position',
				details: "Freelancer"
			}
		],
		ObjectivesHeading: 'Objective',
		ObjectivesDetails: "Design and create a chat with a smart assistant, powered by chatgpt, to learn canadian-french",
		Technologies: {
			title: 'Tools & Technologies',
			techs: [
				'Javascript',
				'Nodejs',
				'React.js',
				'Vite.js',
				'Visual Studio Code',
			],
		},
		ProjectDetailsHeading: 'Challenge',
		ProjectDetails: [
			{
				id: 0,
				details: "I realized this project as a freelancer on 'upwork'",
			},
			{
				id: 1,
				details: "",
			}
		],
	},
	RelatedProject: {
		title: 'Related Projects',
		Projects: [0, 1, 2],
	},
};
