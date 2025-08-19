import './App.css'
import Sidebar from './Sidebar'
import ChatWindow from './ChatWindow'
import { Mycontext } from './MyContext'

function App() {
  const providerValues = {};
  
  return (
    <div className='app'>
      <Mycontext.Provider value={providerValues}>
        <Sidebar />
        <ChatWindow />
      </Mycontext.Provider>
    </div>
  )
}

export default App
