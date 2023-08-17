import { User } from '../../models/User';
import { createSlice } from '@reduxjs/toolkit';


export const initialStateUser: string = "";

export const userSlice = createSlice({
    name: "user",
    initialState: initialStateUser,
    reducers: {
        addUser: (state, action) => {
            return action.payload;
        }
    }
});

export const { addUser } = userSlice.actions;


