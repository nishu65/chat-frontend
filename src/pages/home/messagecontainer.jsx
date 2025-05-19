import React, { useEffect } from "react";
import User from "./user";
import SendMessage from "./sendmessage";
import { useDispatch, useSelector } from "react-redux";
import Message from "./message";
import { getMessagesThunk } from "../../components/store/message/message.thunk";
import { setNewMessage } from "../../components/store/message/message.slice";

const MessageContainer = ({ socket }) => {
    const dispatch = useDispatch();
    const { selecteduser } = useSelector((state) => state.user);
    const { messages } = useSelector((state) => state.message);

    console.log("🔍 selecteduser:", selecteduser);  // ✅ Debugging

    useEffect(() => {
        if (!selecteduser?._id) {
            console.warn("⚠️ No user selected!");
            return;
        }

        if (!socket) {
            console.warn("⚠️ WebSocket not available!");
            return;
        }

        console.log(`📢 Joining WebSocket room: ${selecteduser._id}`);
        socket.emit("join", selecteduser._id);
        dispatch(getMessagesThunk({ receiverId: selecteduser._id }));

        return () => {
            socket.off("receive_message");
        };
    }, [selecteduser, socket, dispatch]);

    useEffect(() => {
        if (!socket) {
            console.error("❌ WebSocket is undefined!");
            return;
        }

        socket.on("receive_message", (newMessage) => {
            console.log("🟢 WebSocket Message Received:", newMessage);
            dispatch(setNewMessage(newMessage));
        });

        return () => {
            socket.off("receive_message");
        };
    }, [socket, dispatch]);

    if (!selecteduser) {
        return (
            <div className="w-full flex items-center justify-center flex-col gap-5">
                <h2>Welcome to Nishu Chat</h2>
                <p className="text-xl">Please select a person to continue your chat!!</p>
            </div>
        );
    }

    return (
        <div className="h-screen w-full flex flex-col">
            <div className="p-3 border-b border-b-white/10">
                <User user={selecteduser} />
            </div>
            <div className="h-full overflow-y-auto p-3">
    {!messages || messages.length === 0 ? (
        <p className="text-center text-gray-500">No messages yet</p>
    ) : (
        messages?.map((message) => (
            <Message  key={message?._id} message={message} />
        ))
    )}
</div>

            <SendMessage socket={socket} />
        </div>
    );
};

export default MessageContainer;
