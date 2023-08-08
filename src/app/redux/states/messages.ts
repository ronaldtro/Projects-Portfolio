import {Message} from '../../models/Message';
import {createSlice} from '@reduxjs/toolkit';

const initialMessages = () => {

    const messages = localStorage.getItem('messages');

    if(messages != null){
        console.log(messages);
        
        return JSON.parse(messages);
    }else {
        return [];
    }
}

export const initialStateMessages:Message[] = initialMessages();

export const messagesSlice = createSlice({
    name: "messages",
    initialState: initialStateMessages,
    reducers: {
        addMessage: (state, action) => {
            const {type, payload} = action;

            localStorage.setItem('messages', JSON.stringify([...state, {...payload}]));
            return [...state, {...payload}];
        },
        deleteMessage: (state, action) => {
            const {type, payload} = action;
            const newState = state.filter(s => s.messageId != payload);
            
            localStorage.setItem('messages', JSON.stringify(newState));
            return newState;
        }
    }
});

export const {addMessage, deleteMessage} = messagesSlice.actions;