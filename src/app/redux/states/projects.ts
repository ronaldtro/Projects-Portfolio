import { Project } from '../../models/Project';
import { createSlice } from '@reduxjs/toolkit';

const initialProjects = () => {
    return [];
}

export const initialStateProjects: Project[] = initialProjects();

export const projectsSlice = createSlice({
    name: "projects",
    initialState: initialStateProjects,
    reducers: {
        addProject: (state, action) => {
            const { type, payload } = action;
            return [...state, { ...payload }];
        },
        deleteProject: (state, action) => {
            const { type, payload } = action;
            const projects = state.filter(p => p._id != payload._id);
            return projects;
        },
        addProjects: (state, action) => {
            return action.payload;
        }
    }
});

export const { addProject, deleteProject, addProjects } = projectsSlice.actions;
