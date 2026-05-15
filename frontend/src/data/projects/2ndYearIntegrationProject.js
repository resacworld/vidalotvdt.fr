// Import images
import SecondYearIntegrationProject from '../../images/integration-project-y2.jpg';
import categories from '../../utils/categories';

export default {
	ProjectHeader: {
		title: 'Projet d\'intégration 2ème année',
		publishDate: 'Jul 2025',
		tags: categories.WebApp,
	},
	ProjectImages: [
		{
			id: 0,
			title: 'Image d\'un extrait de mon projet d\'intégration de 2ème année',
			img: SecondYearIntegrationProject,
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
				'Visual Studio Code',
				'Electronics'
			],
		},
		ProjectDetailsHeading: 'Défis',
		ProjectDetails: [
			{
				id: 0,
				details: "J'ai réalise ce projet quand j'était étudiant en alternance à l'IMERIR, dans le cadre de mon cursus en 2ème année d'école d'ingénieur en informatique / robotique.",
			},
			{
				id: 1,
				details: "Le but de ce projet était de créer à partir de zéro une série d'applications utilisant plusieurs langages de programmation. Il y avait un serveur backend où toutes les missions étaient stockées, et un robot (construit par nous) qui récupérait les données du serveur et se déplaçait pour exécuter sa mission (déplacer des cubes). Ainsi, dans ce projet, il y avait une partie mécanique (réalisée par mon collègue) et la partie développement (principalement réalisée par moi). Pour le développement, il y avait 3 applications à réaliser :"
			},
			{
				id: 2,
				details: [
					"Le Système embarqué du robot (esp32), connecté en wifi au serveur, en attente de la prochaine mission",
					"Le backend, réalisé en python / fastapi où toutes les données sont stockées et contrôlées, avec une API pour ajouter/supprimer/obtenir des missions",
					"Le frontend, réalisé en HTML / CSS pur (selon les spécifications), mais aussi en Vite.js + React, où l'on peut voir l'historique et les futures missions de tous les déplacements du robot",
					"Le simulateur réalisé en Java, qui émule le robot physique, au cas où il ne pourrait pas traiter"
				]
			}
		],
	},
	RelatedProject: {
		title: 'Projets liées',
		Projects: [0, 1, 2],
	},
};
