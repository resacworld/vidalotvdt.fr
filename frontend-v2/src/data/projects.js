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

import categories from '../utils/categories';

export const projectsData = [
	{
		id: 0,
		title: 'Industrial robot trajectory calculation software',
		category: categories.SoftDev,
		img: AllThree,
		singleProjectData: TrajectorySoftware
	},
	{
		id: 1,
		title: "Industrial supervision software",
		category: categories.SoftDev,
		img: SimulatorImage,
		singleProjectData: IndusSoftware
	},
	{
		id: 2,
		title: "6axis robot programmation",
		category: categories.SoftDev,
		img: robotkukaImage
	},
	{
		id: 3,
		title: "1st Year integration project",
		category: categories.WebApp,
		singleProjectData: FirstStYearIntegrationProject,
		img: IntegrationProjectY1
	},
	{
		id: 4,
		title: "2nd Year integration project",
		category: categories.WebApp,
		singleProjectData: SecondYearIntegrationProject,
		img: IntegrationProjectY2
	},
	{
		id: 5,
		title: "Smart chat assistant to easly learn french-canadian",
		category: categories.WebApp,
		img: SmartAssiantImage
	},
	{
		id: 6,
		title: "My portfolio page (this one)",
		category: categories.DevOps,
		img: portfolioImage
	},
	{
		id: 7,
		title: "Full home automation system (not finished)",
		category: categories.Backend,
		img: CASEAPPImage
	}
];
