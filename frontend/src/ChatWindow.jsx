import "./ChatWindow.css";
import "./Chat.css";
import "./Sidebar.css";
import Chat from "./Chat";
import { ScaleLoader } from "react-spinners";

import { MyContext } from "./MyContext";
import { useContext, useState, useEffect } from "react";
import {v1 as uuidv1} from "uuid"

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";
function ChatWindow() {
  const {
    prompt,
    setPrompt,
    reply,
    setReply,
    currentThreadId,
    setCurrentThreadId,
    prevChats,
    setPrevChats,
    setNewChat,
  } = useContext(MyContext);

  const [loading, setLoading] = useState(false);

  const getReply = async () => {
    if (!prompt.trim()) return; // prevent empty sends
    setLoading(true);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: prompt,
        threadId: currentThreadId,
      }),
    };

    try {
      const response = await fetch(`${API_BASE}/api/chat`, options);
      const res = await response.json();

      // add user message immediately (optimistic update)
      setPrevChats((prev) => [
        ...prev,
        { role: "user", content: prompt },
      ]);

      // clear input box
      setPrompt("");

      // set assistant reply once fetched
      setReply(res.reply);
    } catch (err) {
      console.log(`getReply Error: ${err}`);
    }

    setLoading(false);
  };

  // when reply updates, add assistant message
  useEffect(() => {
    if (reply) {
      setPrevChats((prev) => [
        ...prev,
        { role: "assistant", content: reply },
      ]);
    }
  }, [reply]);



// NewChat_Function to start a New chat


const  createNewChat = () =>{
    setNewChat(true);
    setPrompt("");
    setReply(null);
    setCurrentThreadId(uuidv1());
    setPrevChats([]);
}

  return (
    <div className="chatWindow text-center">
      <div className="navbar">
        <button>
          <img
            className="logo"
            src="src/assets/logo.png"
            alt="PhoenixAi logo"
          />
          <h3 className="heading" style={{fontWeight:"700"}}>Phoenix</h3>
        </button>

        <div className="DropDown cursor-pointer  ">
          <span
            className="hist"
            style={{ fontSize: "29px", color: "#B197FC" }}
          >
            <i onClick={createNewChat}  id="heading2" className="fa-regular fa-circle fa-fade"></i>
          </span>
        </div>
      </div>

      {/* Chat Messages */}
      <Chat />

      {/* Loader */}
      <ScaleLoader
        className="mb-7 flex justify-center"
        color="#7A85C1"
        loading={loading}
      />

      {/* Input Section */}
      <div className="chatInput">
        <div className="inputBox">
          <input
            placeholder="Drop it, I Got You"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" ? getReply() : null
            }
          />
          <div id="submit" onClick={getReply}>
            <i className="fa-solid fa-paper-plane"></i>
          </div>
        </div>
        <p className="info">
          Phoenix isn't flawless, so double-check the important stuff!  Visit  <a href="https://github.com/abhishekpundhir" className="alink">Er. Abhi</a>
        </p>
      </div>
    </div>
  );
}

export default ChatWindow;
