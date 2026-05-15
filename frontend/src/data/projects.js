// Import images
import portfolioImage from '../images/portfolio.jpg'
import robotkukaImage from '../images/robotkuka.jpg'
import AllThree from '../images/AllThree.jpeg'
import SimulatorImage from '../images/SimulateurWPF.jpg'
import CASEAPPImage from '../images/CASE-APP.png';
import SmartAssiantImage from '../images/SmartAssistant.jpg';
import IntegrationProjectY1 from '../images/integration-project-y1.jpg';
import IntegrationProjectY2 from '../images/integration-project-y2.jpg';


import TrajectorySoftware from "./projects/TrajectorySoftware"
import IndusSoftware from './projects/IndusSoftware';
import FirstStYearIntegrationProject from './projects/1stYearIntegrationProject';
import SecondYearIntegrationProject from './projects/2ndYearIntegrationProject'
import SmartAssistant from './projects/SmartAssistant';
import RobotProgrammation from './projects/RobotProgrammation';

import categories from '../utils/categories';

export const projectsData = [
	{
		id: 0,
		title: 'Logiciel de calcul de trajectoire pour robot industriel',
		category: categories.SoftDev,
		img: AllThree,
		singleProjectData: TrajectorySoftware,
		hide : true
	},
	{
		id: 1,
		title: "Logiciel de supervision industriel",
		category: categories.SoftDev,
		img: SimulatorImage,
		singleProjectData: IndusSoftware
	},
	{
		id: 2,
		title: "Programmation de robot 6axes",
		category: categories.SoftDev,
		singleProjectData: RobotProgrammation,
		img: robotkukaImage
	},
	{
		id: 3,
		title: "Projet d'intégration 1ère année",
		category: categories.WebApp,
		singleProjectData: FirstStYearIntegrationProject,
		img: IntegrationProjectY1
	},
	{
		id: 4,
		title: "Projet d'intégration 2ème année",
		category: categories.WebApp,
		singleProjectData: SecondYearIntegrationProject,
		img: IntegrationProjectY2
	},
	{
		id: 5,
		title: "Assistant intelligent pour apprendre facilement le français-canadien",
		category: categories.WebApp,
		img: SmartAssiantImage,
		singleProjectData: SmartAssistant
	},
	// {
	// 	id: 6,
	// 	title: "Mon portfolio personnel",
	// 	category: categories.DevOps,
	// 	img: portfolioImage
	// },
	// {
	// 	id: 7,
	// 	title: "Application d'automatisation de maisonn, de domotique (non finis)",
	// 	category: categories.Backend,
	// 	img: CASEAPPImage
	// }
];
