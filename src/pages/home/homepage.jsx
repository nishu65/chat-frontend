import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Usersidebar from "./usersidebar";
import Messagecontainer from "./messagecontainer";
import { setConnected } from "../../components/store/socket/socket.slice";
import { io } from "socket.io-client";

const Homepage = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, userprofile } = useSelector((state) => state.user);
    const { connected } = useSelector((state) => state.socket);

    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (!isAuthenticated || !userprofile?._id) return;

        console.log(`🔌 Initializing WebSocket for user: ${userprofile._id}`);

        const socketURL = import.meta.env.VITE_SOCKET_URL;

        const newSocket = io(socketURL, {
            query: {
                userId: userprofile._id,
            },
            withCredentials: true,
        });

        setSocket(newSocket);

        newSocket.on("connect", () => {
            console.log("✅ WebSocket Connected");
            dispatch(setConnected(true));
        });

        newSocket.on("disconnect", () => {
            console.log("❌ WebSocket Disconnected");
            dispatch(setConnected(false));
        });

        newSocket.on("onlineUsers", (users) => {
            console.log("🟢 Online users:", users);
        });

        return () => {
            console.log("🔌 Closing WebSocket...");
            newSocket.disconnect();
            dispatch(setConnected(false));
        };
    }, [isAuthenticated, userprofile?._id, dispatch]);

    return (
        <div className="flex h-screen w-full overflow-hidden bg-base-100">
            <Usersidebar />
            {connected && socket ? (
                <Messagecontainer socket={socket} />
            ) : (
                <p className="text-center text-gray-500 w-full flex items-center justify-center">
                    Loading chat...
                </p>
            )}
        </div>
    );
};

export default Homepage;
