import {
    createAsyncThunk
} from "@reduxjs/toolkit";
import axiosInstance from "../../../utility/axiosinstance";
import toast from "react-hot-toast";

// Define loginuserthunk as a thunk
export const loginuserthunk = createAsyncThunk(
    'user/login', // Action type string
    async (userData, { rejectWithValue }) => {
        console.log("userData login thunk", userData);
        try {
            const response = await axiosInstance.post("/user/login", userData);
            localStorage.setItem('token', response.data.token); // Store the token
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || "Login failed");
            return rejectWithValue(error.response.data);
        }
    }
);



export const registeruserthunk = createAsyncThunk(
    'user/register',
    async ({username,password,gender},{rejectWithValue}) => {
        console.log("userData register thunk", username
        ,password,
        gender);
       try{ const response = await axiosInstance.post("/user/register", {
            username,
            password,
            gender
        });
        toast.success("User registered successfully");
        return response.data;
    }catch(error){
        return rejectWithValue(error.response.data);
    }
}
);



export const logoutuserthunk = createAsyncThunk(
    'user/logout',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/user/logout");
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);



export const getuserthunk = createAsyncThunk(
    'user/getProfile',
    async (_, { rejectWithValue }) => {
        try {
           
            const response = await axiosInstance.get("/user/get-profile");
            return response.data;

        } catch (error) {
            console.error("Failed to fetch user profile:", error);
            return rejectWithValue(error.response
                ? error.response.data
                : error.message
            );
        }
    }
);


export const getotherusersthunk = createAsyncThunk(
    'user/getotherusers',
    async (_, { rejectWithValue }) => {
     try{   const response = await axiosInstance.get("/user/get-other-users");
       
        return response.data;
    }catch(error){
        return rejectWithValue(error.response.data);
    }
}
);

