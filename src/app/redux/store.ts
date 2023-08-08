import { configureStore } from "@reduxjs/toolkit";
import { likesSlice } from "./states/like";
import { messagesSlice } from "./states/messages";
import { projectsSlice } from "./states/projects";
import { userSlice } from "./states/user";

export const configStore = configureStore({
    reducer: {
        likes: likesSlice.reducer,
        user: userSlice.reducer,
        projects: projectsSlice.reducer,
        messages: messagesSlice.reducer
    }
})