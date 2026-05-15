// Import images
import SimulatorImage from '../../images/SimulateurWPF.jpg'
import categories from '../../utils/categories';

export default {
	ProjectHeader: {
		title: 'Industrial software developpement',
		publishDate: 'Oct 2023 - Aug 2025',
		tags: categories.SoftDev,
	},
	ProjectImages: [
		{
			id: 0,
			title: 'Industrial supervision software',
			img: SimulatorImage,
		},
	],
	ProjectInfo: {
		ClientHeading: 'About Company I worked for',
		CompanyInfo: [
			{
				id: 0,
				title: 'Name',
				details: 'Novalynx',
			},
			{
				id: 1,
				title: 'Services',
				details: 'On-measure build of industrial machinery',
			},
			{
				id: 2,
				title: 'Website',
				details: 'https://novalynx.fr',
			},
			{
				id: 3,
				title: 'Phone',
				details: ' +33 (0) 9 72 44 69 71',
			},
			{
				id: 4,
				title: 'My position',
				details: "Alternant"
			}
		],
		ObjectivesHeading: 'Objective',
		ObjectivesDetails: "Create industrial supervisors",
		Technologies: {
			title: 'Tools & Technologies',
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
		ProjectDetailsHeading: 'Challenge',
		ProjectDetails: [
			{
				id: 0,
				details: "this 'projet' is not really a 'project' but just a summary of many project i do when i was work-study student, at this moment in my company 'Novalynx'",
			},
			{
				id: 1,
				details: "I'm talking here about the creation of industrial supervision software, which is installed in the machines created by my company, and which will control all the machines, i.e. generally the industrial robot if there is one (telling it what to do), the PLC, enabling communication with several actuators, as well as any other external element used in our machines (scales, microphones, limit switches, etc.).",
			},
			{
				id: 2,
				details: "Over the past two years, I've worked on several occasions to build industrial software, each time different, tailor-made for each machine we've created."
			}
		],
	},
	RelatedProject: {
		title: 'Related Projects',
		Projects: [0, 1, 2],
	},
};
