import "./Chat.css";
import { useContext, useState ,useEffect } from "react";
import { MyContext } from "./MyContext";

// highlight.js theme
import "highlight.js/styles/atom-one-dark.css";


// react-markdown
import ReactMarkdown from "react-markdown";

// rehype-highlight
import RehypeHighlight from "rehype-highlight";

function Chat() {
  const { newChat, prevChats  , reply} = useContext(MyContext);
  const [latestReply , setLatestReply] = useState(null);
  useEffect(()=>{
    // Saperating latest Reply = typing effect
      if (!prevChats?.length)  return;
      const content = reply.split(" "); // stored individual words
      let idx = 0;
      const interval = setInterval(() => {
        setLatestReply(content.slice(0,idx+1).join(" ")) 
         idx++;
         if(idx >= content.length) clearInterval(interval);
      }, 10);

       return () => clearInterval(interval);
  } , [prevChats , reply])
  return (
    <>
      {newChat && (
        <h2 className="text-center">
          Wassup!  Cutie <a href="https://www.instagram.com/iashlyee/" className=" alink"> 🕊️</a>
          {/* If Smiles Were Currency! You'd be a Billionaire */}
        </h2>
      )}

      <div className="chats max-[790px]:ml-0 text-center ">
        {prevChats?.slice(0,-1).map((chat, idx) => (
          <div
            className={
              chat.role === "user"
                ? "userDiv text-left"
                : "assistantDiv text-center bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-4 mt-1.5   max-[790px]:ml-0 "
            }
            key={idx}
          >
            {chat.role === "user" ? (
              <p className="userMessage mt-1.5">{chat.content}</p>
            ) : (
              <ReactMarkdown rehypePlugins={[[RehypeHighlight, { detect: true }]]}>
                {chat.content}
              </ReactMarkdown>
            )}
          </div>
        ))}
      
       {
        prevChats.length > 0 && latestReply !== null && 
        <div className="assistantDiv text-center bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-4 mt-1.5 " key={"typing"}>  
         <ReactMarkdown rehypePlugins={[[RehypeHighlight, { detect: true }]]}>
                {latestReply}
              </ReactMarkdown>
         </div>
       }

      </div>
    </>
  );
}

export default Chat;
