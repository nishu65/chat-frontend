import { createSlice } from '@reduxjs/toolkit';
import { sendMessageThunk, getMessagesThunk } from './message.thunk';



const initialState = {
    messages: [],
    screenLoading: false,
    buttonLoading: false,
};


const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        setNewMessage: (state, action) => {
            const oldMessages = state.messages??[];
            console.log("oldMessages",oldMessages)
            console.log("action",action.payload)
            state.messages = [...oldMessages, action.payload];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(sendMessageThunk.pending, (state,action) => {
            state.buttonLoading = true;
        });
        builder.addCase(sendMessageThunk.fulfilled, (state,action) => {
           const oldMessages = state.messages??[];
           state.messages = [...oldMessages, action.payload?.responseData?.message];
            state.buttonLoading = false;
        });
        builder.addCase(sendMessageThunk.rejected, (state,action) => {
            state.buttonLoading = false;
        });

        //get messages
        builder.addCase(getMessagesThunk.pending, (state) => {
            state.buttonLoading = true;
        });
        builder.addCase(getMessagesThunk.fulfilled, (state, action) => {
          
            state.messages = action.payload?.responseData?.messages??[];
            console.log("message slice :",action.payload);
            state.buttonLoading = false;
        });
        builder.addCase(getMessagesThunk.rejected, (state) => {
            state.buttonLoading = false;
        });
    },
});

export const { setNewMessage } = messageSlice.actions;
export default messageSlice.reducer;


