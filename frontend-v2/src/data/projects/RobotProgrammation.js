// Import images
import robotkukaImage from '../../images/robotkuka.jpg'
import categories from '../../utils/categories';

export default {
	ProjectHeader: {
		title: 'Programmation de robot 6 axes',
		publishDate: 'Aout 2023 - Juil 2026',
		tags: categories.SoftDev,
	},
	ProjectImages: [
		{
			id: 0,
			title: 'Robot industriel KUKA',
			img: robotkukaImage,
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
		ObjectivesDetails: "Programmation de robots industriels, afin d'automatiser des tâches telles que le soudage, la peinture ou l'assemblage.",
		Technologies: {
			title: 'Outils & Technologies',
			techs: [
				'C#',
				'Visual Studio',
				'KRL (KUKA Robot Language)',
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
				details: "Les robots industriels sont utilisés dans de nombreuses industries, telles que l'automobile, l'aérospatiale et l'électronique. Ils peuvent effectuer des tâches telles que le soudage, la peinture, l'assemblage et la manutention de matériaux. Cependant, la programmation de ces robots peut être complexe et prendre du temps.",
			},
			{
				id: 2,
				details: "Je peux programmer des robots industriels en utilisant le KUKA Robot Language (KRL) et le C#. Je peux également utiliser RoboDK pour simuler et optimiser les mouvements du robot. Cela me permet de créer des programmes efficaces et fiables pour les robots, qui peuvent être utiles aux entreprises industrielles.",
			}
		],
	},
	RelatedProject: {
		title: 'Projets liés',
		Projects: [0, 1, 2],
	},
};
