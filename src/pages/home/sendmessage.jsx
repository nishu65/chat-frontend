import React, { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { sendMessageThunk } from "../../components/store/message/message.thunk";

const SendMessage = ({ socket }) => {
    const dispatch = useDispatch();
    const { userprofile, selecteduser } = useSelector((state) => state.user);
    const [message, setMessage] = useState("");

    const handleSendMessage = () => {
        if (!message.trim()) return;
        if (!userprofile?._id || !selecteduser?._id) {
            console.error("⚠️ Missing userprofile or selecteduser.");
            return;
        }

        const newMessage = {
            senderId: userprofile?._id,
            receiverId: selecteduser?._id,
            message,
            createdAt: new Date().toISOString(),
        };

        dispatch(sendMessageThunk(newMessage)); // ✅ Save message in backend

        if (socket) {
            console.log("📤 Sending message to WebSocket:", newMessage);
            socket.emit("send_message", {
                receiverId: selecteduser._id,
                message: newMessage, // wrap it like this to match server expectations
            });
        }
        
        setMessage("");
    };

    return (
        <div className="w-full p-3 flex gap-2">
            <textarea
                type="text"
                placeholder="Type here..."
                className="input input-bordered input-primary w-full"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={handleSendMessage} className="btn btn-square btn-outline btn-primary">
                <IoIosSend />
            </button>
        </div>
    );
};

export default SendMessage;
