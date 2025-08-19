import "./ChatWindow.css"
import "./Sidebar.css"
import Chat from "./Chat"
function ChatWindow() {
    return (
        <div className="chatWindow">
            <div className="navbar">
                <span >Welcome To Phoenix</span>
            </div>

              <a href="https://github.com/abhishekpundhir/finityAI"><div className="">
                <h3>Phoenix Developer</h3>
                <img className="logo2" style={{borderRadius:"5o%", justifyContent:""}} src="src\assets\you.jpg" alt="PhoenixAi logo"/>
              
             </div></a>
            <Chat />

            <div className="chatInput">
            <div className="userInput">
                <input placeholder="Drop it, I Got You"></input>
                <div id="submit"><i class="fa-solid fa-paper-plane"></i> </div>
            </div>
            <p className="info">Phoenix isn't flawless, so double-check the important stuff ✨</p>
            </div>
        </div>
    )
}

export default ChatWindow;