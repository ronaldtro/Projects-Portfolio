import {Project} from '../../models/Project';
import {createSlice} from '@reduxjs/toolkit';

const initialProjects = () => {

    const projects = localStorage.getItem('projects');

    if(projects != null){
        console.log(projects);
        
        return JSON.parse(projects);
    }else {
        return [];
    }
}

export const initialStateProjects:Project[] = initialProjects();

export const projectsSlice = createSlice({
    name: "projects",
    initialState: initialStateProjects,
    reducers: {
        addProject: (state, action) => {
            const {type, payload} = action;

            localStorage.setItem('projects', JSON.stringify([...state, {...payload}]));
            return [...state, {...payload}];
        },
        deleteProject: (state, action) => {
            const {type, payload} = action;
            const newState = state.filter(s => s.projectId != payload);
            
            localStorage.setItem('projects', JSON.stringify(newState));
            return newState;
        }
    }
});

export const {addProject, deleteProject} = projectsSlice.actions;
