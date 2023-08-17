import { Like } from '@/app/models/Like';
import { createSlice } from '@reduxjs/toolkit';

const initialLikes = () => {
    return [];
};


export const likesEmptyState: Like[] = initialLikes();

export const likesSlice = createSlice({
    name: "likes",
    initialState: likesEmptyState,
    reducers: {
        addLike: (state, action) => {
            const { type, payload } = action;
            //return [...state, { ...payload ?? [] }];
            //return state.map((e) => e.userId != payload.userId);
            if (!state.some((s) => (s.projectId == payload.projectId && s.userId == payload.userId))) {
                    return [...state, { ...payload }];
            }
            
            return;
        },
        addLikes: (state, action) => {
            return action.payload;
        },
        modifyLikes: (state, action) => {
            const { type, payload } = action;
            return state.map((s) => s.userId != payload.userId ? { ...s, ...payload } : s);
        },
        resetLikes: (state, payload) => {
            return likesEmptyState;
        },
        removeLike: (state, action) => {
            const { type, payload } = action;

            const newLikes: any = state.filter(l => (l._id != payload._id));
            
            return newLikes;
        }
    }
});

export const { addLike, addLikes, modifyLikes, resetLikes, removeLike } = likesSlice.actions;