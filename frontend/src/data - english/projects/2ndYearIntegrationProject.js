// Import images
import SecondYearIntegrationProject from '../../images/integration-project-y2.jpg';
import categories from '../../utils/categories';

export default {
	ProjectHeader: {
		title: '2nd Year integration project',
		publishDate: 'Jul 2025',
		tags: categories.WebApp,
	},
	ProjectImages: [
		{
			id: 0,
			title: 'Screenshot of one part of my 2nd year integration project',
			img: SecondYearIntegrationProject,
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
				details: `The goal of this project was to create from scratch a bunch of applications using several programmation langages. There were a backend server were all the missions are stored, and robot (made by us) that pick the data from the server and will move to execute his mission (drag and drop cubes). So in this project there were a mecanical part (made by my colleage) and the developpement part (mostly made by me). For the developmment, there were 3 applications to made :`
			},
			{
				id: 2,
				details: [
					"The on-board system of the robot (esp32), connected by wifi to server, waiting for the next mission",
					"The backend, made in python / fastapi were all the data are stored and contralized, with an API to add/remove/get mission(s)",
					"The frontend, made in pure HTML / CSS (as the specifications), but also in Vite.js + React, were we can see the history and future misisons of all movement of the robot",
					"The simulator made in Java, that emulate the physical robot, in case he can't proccess"
				]
			}
		],
	},
	RelatedProject: {
		title: 'Related Projects',
		Projects: [0, 1, 2],
	},
};
