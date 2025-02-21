


import './App.css'
import { Tasks } from './components/Tasks'
import { TaskProvider } from './context/TaskProvider'

function App() {
  

  return (
    <>
    <TaskProvider>
      
     <Tasks  />
    </TaskProvider>
    </>
  )
}

export default App
