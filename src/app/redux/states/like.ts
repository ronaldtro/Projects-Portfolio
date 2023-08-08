import { Like } from '@/app/models/Like';
import {createSlice } from '@reduxjs/toolkit';

const initialLikes = () => {

    const likes = localStorage.getItem('likes');

    if(likes != null){
        return JSON.parse(likes);
    }else {
        return [];
    }

};


export const likesEmptyState:Like[] = initialLikes();

export const likesSlice = createSlice({
    name: "likes",
    initialState: likesEmptyState,
    reducers: {
        addLikes: (state, action) => {
            const {type, payload} = action;
            //return [...state, { ...payload ?? [] }];
            //return state.map((e) => e.userId != payload.userId);
            if(!state.some((s) => (s.projectId == payload.projectId && s.userId == payload.userId) )){
                localStorage.setItem('likes', JSON.stringify([...state, {...payload}]));
                return [...state, { ...payload }];
            }
            
            return;
        },
        modifyLikes: (state, action) => {
            const {type, payload} = action;
            return state.map((s) => s.userId != payload.userId ? { ...s, ...payload } : s);
        },
        resetLikes: (state, payload) => {
            return likesEmptyState;
        },
        removeLike: (state, action) => {
            const {type, payload} = action;

            const newLikes:any = state.filter(l => (l.likeId != payload) );
            
            localStorage.setItem('likes', JSON.stringify(newLikes));
            return newLikes;
        }
    }
});

export const {addLikes, modifyLikes, resetLikes, removeLike} = likesSlice.actions;