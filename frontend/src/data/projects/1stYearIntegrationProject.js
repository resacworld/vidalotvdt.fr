// Import images
import IntegrationProjectY1 from '../../images/integration-project-y1.jpg';
import categories from '../../utils/categories';

export default {
	ProjectHeader: {
		title: 'Projet d \'integration 1ère année',
		publishDate: 'Juil 2024',
		tags: categories.WebApp,
	},
	ProjectImages: [
		{
			id: 0,
			title: 'Image d\'un extrait de mon projet d\'intégration de 1ère année',
			img: IntegrationProjectY1,
		},
	],
	ProjectInfo: {
		ClientHeading: 'A propos de mon école',
		CompanyInfo: [
			{
				id: 0,
				title: 'Nom',
				details: 'Imerir / Cnam occitanie',
			},
			{
				id: 1,
				title: 'Site internet',
				details: 'https://imerir.com',
			},
			{
				id: 2,
				title: 'Site internet',
				details: 'https://www.cnam-occitanie.fr/',
			},
			{
				id: 4,
				title: "Téléphone du Cnam",
				details: '+33 (0) 4 67 63 63 40',
			},
			{
				id: 5,
				title: 'Ma situation',
				details: "Alternant"
			}
		],
		ObjectivesHeading: 'Objectif',
		ObjectivesDetails: "Créer une station météo intelligente",
		Technologies: {
			title: 'Outils & Technologies',
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
		ProjectDetailsHeading: 'Défis relevés',
		ProjectDetails: [
			{
				id: 0,
				details: "J'ai réalise ce projet quand j'était étudiant en alternance à l'IMERIR, dans le cadre de mon cursus en 1ère année d'école d'ingénieur en informatique / robotique.",
			},
			{
				id: 1,
				details: "Le but de ce projet était de créer à partir de zéro une station météo DIY en équipe, dans mon équipe j'ai été choisi pour développer l'ensemble du projet, divisé en 3 sections, le serveur backend, réalisé avec node.js, le frontend, réalisé avec Vite.js + React.js, et le code de l'arduino, où tous les capteurs étaient branchés, à la fin avec tous les éléments communiquant entre eux, nous avons créé notre projet d'intégration de 1ère année.",
			}
		],
	},
	RelatedProject: {
		title: 'Projets liées',
		Projects: [0, 1, 2],
	},
};
