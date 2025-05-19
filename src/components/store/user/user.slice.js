import { createSlice } from "@reduxjs/toolkit";
import { loginuserthunk } from "./user.thunk";
import { registeruserthunk } from "./user.thunk";
import { logoutuserthunk } from "./user.thunk";
import { getotherusersthunk } from "./user.thunk";
import { getuserthunk } from "./user.thunk";

const initialState = {
    isAuthenticated: false,
    userprofile: null,
    buttonloading: false,
    screenloading: false,
    otheruser: [],
    selecteduser:JSON.parse(localStorage.getItem("selecteduser")),
    error: null,
}



export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setselecteduser: (state, action) => {
            localStorage.setItem("selecteduser", JSON.stringify(action.payload));
            state.selecteduser = action.payload;
        },
    },
    extraReducers: (builder) => {

        //login user
        builder.addCase(loginuserthunk.pending, (state,action) => {
           

            state.buttonloading = true;
        });
        builder.addCase(loginuserthunk.fulfilled, (state, action) => {
            state.buttonloading = false;
            state.userprofile = action.payload;
            state.isAuthenticated = true;
            
            
            
        });
        builder.addCase(loginuserthunk.rejected, (state, action) => {   
            state.buttonloading = false;
            state.error = action.error.message;
        });

        //register user
        builder.addCase(registeruserthunk.pending, (state,action ) => {
            state.buttonloading = true;
        });
        builder.addCase(registeruserthunk.fulfilled, (state, action) => {
            state.userprofile = action.payload?.responsedata?.user;
            state.isAuthenticated = true;
            state.buttonloading = false;
        }); 
        builder.addCase(registeruserthunk.rejected, (state, action) => {
            state.buttonloading = false;
        });

        //logout user
        builder.addCase(logoutuserthunk.pending, (state,action) => {
            state.buttonloading = true;
        });
        builder.addCase(logoutuserthunk.fulfilled, (state, action) => {
            state.buttonloading = false;
            state.isAuthenticated = false;
            state.userprofile = null;
            state.otheruser = [];
            state.selecteduser = null;
            localStorage.clear();
            
        });
        builder.addCase(logoutuserthunk.rejected, (state, action) => {
            state.buttonloading = false;
        });


        //get user
        builder.addCase(getuserthunk.pending, (state,action) => {
            state.screenloading = true;
        });
        builder.addCase(getuserthunk.fulfilled, (state, action) => {
            state.screenloading = false;
            state.isAuthenticated = true;
           
            state.userprofile = action.payload?.responseData;
            
        
        });
        builder.addCase(getuserthunk.rejected, (state, action) => {
            state.screenloading = false;
            state.error = action.error.message;
        });


        //get other users
        builder.addCase(getotherusersthunk.pending, (state,action) => {
            state.screenloading = true;
        });
        builder.addCase(getotherusersthunk.fulfilled, (state, action) => {
            state.screenloading = false;
            state.otheruser = action.payload?.responseData;
           
        });
        builder.addCase(getotherusersthunk.rejected, (state, action) => {
            state.screenloading = false;
        });
        

    }
});






export const {setselecteduser,setisAuthenticated,setUserProfile} = userSlice.actions;

export const selectUserProfile = (state) => state.user.userprofile;

export default userSlice.reducer;   

