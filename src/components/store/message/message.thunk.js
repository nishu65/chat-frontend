import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utility/axiosinstance';
import toast from 'react-hot-toast';


export const sendMessageThunk = createAsyncThunk(
    'message/send',
    async ({message,receiverId}, {rejectWithValue}) => {
        try {
            console.log("receiverId",receiverId)
            console.log("message",message)
            const response = await axiosInstance.post(`/message/send/${receiverId}`, {message});
            console.log("response",response)
            return response.data;
        } catch (error) {
            toast.error(error.response.data.message);
            return rejectWithValue(error.response.data);
        }
    }
);

export const getMessagesThunk = createAsyncThunk(
    'message/get',
    async ({receiverId}, {rejectWithValue}) => {
        try {
           
            const response = await axiosInstance.get(`/message/get-messages/${receiverId}`);
            return response.data;
        } catch (error) {
            toast.error(error.response.data.message);
            return rejectWithValue(error.response.data);
        }
    }
);
