// Import images
import robotkukaImage from '../../images/robotkuka.jpg'
import categories from '../../utils/categories';

export default {
	ProjectHeader: {
		title: '6 axis robot programmation',
		publishDate: 'Aug 2023 - Jul 2026',
		tags: categories.SoftDev,
	},
	ProjectImages: [
		{
			id: 0,
			title: 'KUKA industrial robot',
			img: robotkukaImage,
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
		ObjectivesDetails: "Programming of industrial robots, in order to automate tasks such as welding, painting, or assembly.",
		Technologies: {
			title: 'Tools & Technologies',
			techs: [
				'C#',
				'Visual Studio',
				'KRL (KUKA Robot Language)',
				'RoboDK',
			],
		},
		ProjectDetailsHeading: 'Challenge',
		ProjectDetails: [
			{
				id: 0,
				details: "I do this projet as work-study student, at this moment in my company 'Novalynx'",
			},
			{
				id: 1,
				details: "Industrial robots are used in many industries, such as automotive, aerospace, and electronics. They can perform tasks such as welding, painting, assembly, and material handling. However, programming these robots can be complex and time-consuming.",
			},
			{
				id: 2,
				details: "I can program industrial robots using KUKA Robot Language (KRL) and C#. I can also use RoboDK to simulate and optimize the robot's movements. This allows me to create efficient and reliable programs for the robots, that can be usefull to industrial companies.",
			}
		],
	},
	RelatedProject: {
		title: 'Related Projects',
		Projects: [0, 1, 2],
	},
};
