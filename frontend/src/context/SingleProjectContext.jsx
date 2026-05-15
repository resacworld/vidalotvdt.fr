import { useState, createContext, useEffect } from 'react';
// import { singleProjectData as singleProjectDataJson } from '../data/projects/singleProjectData';
import { projectsData } from "../data/projects"

const SingleProjectContext = createContext();

export const SingleProjectProvider = ({ children, id }) => {
	const [singleProjectData, setSingleProjectData] = useState(
		projectsData[id].singleProjectData
	);

	return (
		<SingleProjectContext.Provider
			value={{ singleProjectData, setSingleProjectData }}
		>
			{children}
		</SingleProjectContext.Provider>
	);
};

export default SingleProjectContext;
