

import './App.css'
import { UseSearchParams } from './components/UseSearchParams'
import { BrowserRouter as Router } from 'react-router-dom'

function App() {
  

  return (
    <>
      <Router>
        <div className='flex justify-center'>
      <UseSearchParams/>
        </div>
          
      </Router>
    </>
  )
}

export default App
