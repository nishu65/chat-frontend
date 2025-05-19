import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/user.slice";
import socketReducer from "./socket/socket.slice";
import messageReducer from "./message/message.slice";



const store = configureStore({
    reducer: {
        user: userReducer,
        socket: socketReducer,
        message: messageReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(
        {
            serializableCheck: {
                ignoredActions: ["socket.socket"],
                ignoredPaths: ["socket.socket"],
            },
        }
    ),
   
});

export default store;
