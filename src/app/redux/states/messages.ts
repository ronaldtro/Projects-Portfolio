import { Message } from '../../models/Message';
import { createSlice } from '@reduxjs/toolkit';


export const initialStateMessages: Message[] = [];

export const messagesSlice = createSlice({
    name: "messages",
    initialState: initialStateMessages,
    reducers: {
        addMessage: (state, action) => {
            const { type, payload } = action;
            return [...state, { ...payload }];
        },
        addMessages: (state, action) => {
            const { type, payload } = action;
            return payload;
        },
        deleteMessage: (state, action) => {
            const { type, payload } = action;
            const messages = state.filter(m => m._id != payload);
            return messages;
        }
    }
});

export const { addMessage, addMessages, deleteMessage } = messagesSlice.actions;
