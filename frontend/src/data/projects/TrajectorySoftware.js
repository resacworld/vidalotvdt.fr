// Import images
import TrajectorySoftware from "../../images/AllThree.jpeg";
import categories from '../../utils/categories';

export default {
	ProjectHeader: {
		title: 'Logiciel de calcul de trajectoire pour robot industriel',
		publishDate: 'Oct 2024 - Avr 2025',
		tags: categories.SoftDev,
	},
	ProjectImages: [
		{
			id: 0,
			title: 'Nuage de points d\'un capot de voiture',
			img: TrajectorySoftware,
		},
	],
	ProjectInfo: {
		ClientHeading: 'À propos de l\'entreprise pour laquelle j\'ai travaillé',
		CompanyInfo: [
			{
				id: 0,
				title: 'Nom',
				details: 'Novalynx',
			},
			{
				id: 1,
				title: 'Services',
				details: 'On-measure build of industrial machinery',
			},
			{
				id: 2,
				title: 'Site web',
				details: 'https://novalynx.fr',
			},
			{
				id: 3,
				title: 'Téléphone',
				details: ' +33 (0) 9 72 44 69 71',
			},
			{
				id: 4,
				title: 'Ma situation',
				details: "Alternant"
			}
		],
		ObjectivesHeading: 'Objectif',
		ObjectivesDetails: "Corriger toutes les trajectoires générées par le logiciel de nos clients, afin qu'elles soient optimisées pour un robot industriel de peinture",
		Technologies: {
			title: 'Outils & Technologies',
			techs: [
				'C#',
				'Visual Studio',
				'Cloud Compare',
				'RoboDK',
			],
		},
		ProjectDetailsHeading: 'Défis',
		ProjectDetails: [
			{
				id: 0,
				details: "Je réalise ce projet en tant qu'étudiant en alternance, à ce moment-là dans ma société 'Novalynx'",
			},
			{
				id: 1,
				details: "Ce projet portait sur des trajectoires, générées par le logiciel de l'un de nos clients, ces trajectoires ont été générées dans le but de peindre un capot de voiture, visuellement, ces trajectoires s'adaptaient parfaitement à la courbe du capot de la voiture. Mais le problème avec celles-ci était qu'elles n'étaient pas générées dans le but d'être exécutées par un robot industriel, donc le robot ne respectait pas bien la trajectoire, et était saccadé.",
			},
			{
				id: 2,
				details: "Notre tâche était de créer un logiciel pour recalculer ces trajectoires, afin de les optimiser pour un robot industriel."
			}
		],
	},
	RelatedProject: {
		title: 'Projets liés',
		Projects: [0, 1, 2],
	},
};
