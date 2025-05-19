import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Usersidebar from "./usersidebar";
import Messagecontainer from "./messagecontainer";
import { setConnected } from "../../components/store/socket/socket.slice";
import { io } from "socket.io-client"; // ✅ Import socket.io-client

const Homepage = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, userprofile } = useSelector((state) => state.user);
    const { connected } = useSelector((state) => state.socket);

    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (!isAuthenticated || !userprofile?._id) return;

        console.log(`🔌 Initializing WebSocket for user: ${userprofile._id}`);
        
        const newSocket = io("http://localhost:5100"); // ✅ Create socket instance
        setSocket(newSocket); // ✅ Store socket in state

        newSocket.on("connect", () => {
            console.log("✅ WebSocket Connected");
            dispatch(setConnected(true));
        });

        newSocket.on("disconnect", () => {
            console.log("❌ WebSocket Disconnected");
            dispatch(setConnected(false));
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
            {connected && socket ? <Messagecontainer socket={socket} /> : <p>Loading chat...</p>}
        </div>
    );
};

export default Homepage;
