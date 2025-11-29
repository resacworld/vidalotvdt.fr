// Import images
import SimulatorImage from '../../images/SimulateurWPF.jpg'
import categories from '../../utils/categories';

export default {
	ProjectHeader: {
		title: 'Developpement de logiciels industriel',
		publishDate: 'Oct 2023 - Aug 2025',
		tags: categories.SoftDev,
	},
	ProjectImages: [
		{
			id: 0,
			title: 'Logiciel de supervision industriel',
			img: SimulatorImage,
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
		ObjectivesDetails: "Créer des superviseurs industriels",
		Technologies: {
			title: 'Outils & Technologies',
			techs: [
				'C#',
				'Wpf',
				'Visual Studio',
				'Kuka',
				'Fanuc',
				'Yaskawa',
				'RoboDK',
			],
		},
		ProjectDetailsHeading: 'Défis',
		ProjectDetails: [
			{
				details: "ce 'projet' n'est pas vraiment un 'projet' mais juste un résumé de plusieurs projets que j'ai réalisés lorsque j'étais étudiant en alternance, à ce moment-là dans ma société 'Novalynx'",
			},
			{
				id: 1,
				details: "Je parle ici de la création de logiciels de supervision industriels, qui sont installés dans les machines créées par mon entreprise, et qui vont contrôler toutes les machines, c'est-à-dire généralement le robot industriel s'il y en a un (en lui disant quoi faire), l'automate programmable (PLC), en permettant la communication avec plusieurs actionneurs, ainsi qu'avec tout autre élément externe utilisé dans nos machines (balances, microphones, interrupteurs de fin de course, etc.).",
			},
			{
				id: 2,
				details: "Au cours des deux dernières années, j'ai travaillé à plusieurs reprises pour créer des logiciels industriels, à chaque fois différents, sur mesure pour chaque machine que nous avons créée."
			}
		],
	},
	RelatedProject: {
		title: 'Projets liées',
		Projects: [0, 1, 2],
	},
};
