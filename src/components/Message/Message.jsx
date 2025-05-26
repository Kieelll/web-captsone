import React, { useState } from "react";
import "./Message.scss";
import { Link } from "react-router-dom";

const Message = () => {
  const chatList = [
    { name: "Juan’s Eatery", time: "05/08/2025 (01:17PM)" },
    { name: "Papat Smoke BBQ", time: "06/01/2025 (05:47PM)" },
    { name: "Xplit’s Buffet", time: "05/08/2025 (01:17PM)" },
    { name: "Katipunan Restaurant", time: "05/08/2025 (01:17PM)" },
    { name: "Eat & Greet", time: "05/08/2025 (01:17PM)" },
    { name: "Kiel", time: "12/02/2025 (02:23PM)" },
    { name: "Ez", time: "07/09/2025 (08:32PM)" },
  ];

  const [selectedChat, setSelectedChat] = useState(chatList[0]);
  const [showOptions, setShowOptions] = useState(false);

  const handleChatClick = (chat) => {
    setSelectedChat(chat);
    setShowOptions(false); // close dropdown if open
  };

  const toggleOptions = () => {
    setShowOptions((prev) => !prev);
  };

  return (
    <div className="message-container">
      <div className="dataLocationTable">
        Messages
        <Link to="users/new" className="link">
          ADD
        </Link>
      </div>

      <div className="chatContent">
        {/* Left Panel - Chat List */}
        <div className="chat-list">
          {chatList.map((chat, index) => (
            <div
              key={index}
              className="chat-card"
              onClick={() => handleChatClick(chat)}
            >
              <h3>{chat.name}</h3>
              <p>{chat.time}</p>
            </div>
          ))}
        </div>

        {/* Right Panel - Chat Box */}
        <div className="chat-box">
          <div className="chat-header">
            <div className="chat-title">{selectedChat.name}</div>
            <div className="chat-options">
              <button className="menu-toggle" onClick={toggleOptions}>
                ⋮
              </button>
              {showOptions && (
                <div className="dropdown">
                  <button onClick={() => alert("Viewing Info")}>View Info</button>
                  <button onClick={() => alert("Muted")}>Mute</button>
                  <button onClick={() => alert("Chat Deleted")}>Delete Chat</button>
                </div>
              )}
            </div>
          </div>

          <div className="chat-messages">
            <div className="message left">Hello! Are you available today?</div>
            <div className="message right">Yes, I’m available at 1PM.</div>
            <div className="message left">Perfect, see you then!</div>
          </div>

          <div className="chat-input">
            <input type="text" placeholder="Type a message..." />
            <button className="attach-btn">📎</button>
            <button className="send-btn">➤</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
