import { User } from '../../models/User';
import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialUser = () => {
   const userId = localStorage.getItem("userId");
    if(userId){
        return userId;
    }else{
        const newUser = uuidv4();
        localStorage.setItem("userId", newUser);
        return newUser;
    }
}
export const initialStateUser: string = initialUser();

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


