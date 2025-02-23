
import { BrowserRouter as Router,Route,Routes ,Link } from 'react-router-dom'

import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { ProductProvider } from './contexts/ProductProvider'

function App() {
  

  return (
    <>
    <Router>
          <ProductProvider>
      <Routes>
        <Route path='/login' element={<Login/>}/>
            <Route path='/home' element={<Home/>}/>
      </Routes>
          </ProductProvider>
    </Router>
    </>
  )
}

export default App
