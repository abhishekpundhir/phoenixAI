import "./Sidebar.css"

function Sidebar(){
    return (
        <section className="sidebar">
             {/* New chat button */}
  
             <button>
                <img className="logo" src="src\assets\logo.png" alt="PhoenixAi logo"/>
                <h3>Phoenix</h3>
              <span>  <i className="fa-solid fa-pen-to-square"></i></span>
             </button>

             {/*chat history */}
                <ul className="history">
                <li>Chat One </li>
                <li>Chat Two</li>
                <li>Chat Three</li>
                </ul>

            
              <a href="https://github.com/abhishekpundhir/finityAI"><div className="version">
                <h3>Phoenix V2.0</h3>
              
             </div></a>

        </section>
    )
}

export default Sidebar;