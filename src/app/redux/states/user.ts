import { User } from '../../models/User';
import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';


const crearUsuario = () => {

    const userId = localStorage.getItem('userId');

    if (userId != null) {
        return userId;
    } else {
        const userId = uuidv4();
        localStorage.setItem('userId', userId);
        return userId;
    }

}

export const initialStateUser: User = {
    userId: crearUsuario()
}

export const userSlice = createSlice({
    name: "user",
    initialState: initialStateUser,
    reducers: {
        addUser: (state, action) => {
            return action.payload
        }
    }
});

export const { addUser } = userSlice.actions;


