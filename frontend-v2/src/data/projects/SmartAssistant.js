// Import images
import SmartAssiantImage from '../../images/SmartAssistant.jpg';
import categories from '../../utils/categories';

export default {
	ProjectHeader: {
		title: 'Chat intelligent pour apprendre facilement le français-canadien',
		publishDate: 'Juil 2024',
		tags: categories.WebApp,
	},
	ProjectImages: [
		{
			id: 0,
			title: 'Écran de l\'assistant de chat',
			img: SmartAssiantImage,
		},
	],
	ProjectInfo: {
		ClientHeading: 'À propos la plateforme pour laquelle j\'ai travaillé',
		CompanyInfo: [
			{
				id: 0,
				title: 'Nom',
				details: 'Upwork',
			},
			{
				id: 1,
				title: 'Site web',
				details: 'https://upwork.com',
			},
			{
				id: 5,
				title: 'My situation',
				details: "Freelance"
			}
		],
		ObjectivesHeading: 'Objectif',
		ObjectivesDetails: "Concevoir et créer un chat avec un assistant intelligent, propulsé par chatgpt, pour apprendre le français-canadien",
		Technologies: {
			title: 'Outils & Technologies',
			techs: [
				'Javascript',
				'Nodejs',
				'React.js',
				'Vite.js',
				'Visual Studio Code',
			],
		},
		ProjectDetailsHeading: 'Défis',
		ProjectDetails: [
			{
				id: 0,
				details: "Je réalise ce projet en tant que freelance sur 'upwork'",
			},
			{
				id: 1,
				details: "Le premier objectif était de créer un prototype web qui m'aide à tenir des conversations en direct avec des locuteurs français, en mettant l'accent sur le français canadien, une interface claire et une expérience conviviale.",
			},
			{
				id: 2,
				details: "Le deuxième objectif était de créer un assistant de chat capable de parler et d'apprendre le français canadien à l'utilisateur, en utilisant l'API chatgpt, par un chat divisé en deux parties : le côté français et le côté anglais, les deux chats sont les mêmes, juste traduits dans les deux langues.",
			}
		],
	},
	RelatedProject: {
		title: 'Projets liés',
		Projects: [0, 1, 2],
	},
};
