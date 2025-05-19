import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const messageRef = useRef(null);
  const { userprofile, selecteduser } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <>
      <div
        ref={messageRef}
        className={`chat ${
          userprofile?._id === message?.senderId
            ? "chat-end"
            : "chat-start"
        }`}
      >
        <div className="chat-image avatar p-1">
          <div className="w-14 rounded-full border-2 border-primary p-1 bg-amber-50">
            <img
              alt="Tailwind CSS chat bubble component"
              src={
                userprofile?._id === message?.senderId
                  ? userprofile?.avatar || "https://via.placeholder.com/40"
                  : selecteduser?.avatar || "https://via.placeholder.com/40"
              }
            />
          </div>
        </div>
        <div className="chat-header">
        <time className="text-xs opacity-50">
  {new Date(message?.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
</time>
        </div>
        <div className="chat-bubble">
    {(message?.message||"").split("\n").map((line, index) => (
        <p key={index} className="mb-1">{line}</p>
    ))}
</div>
      </div>
    </>
  );
};

export default Message;
