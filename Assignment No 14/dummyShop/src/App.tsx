
import { BrowserRouter as Router,Route,Routes  } from 'react-router-dom'

import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { ProductProvider } from './contexts/ProductProvider'
import { ProductView } from './pages/ProductView'

function App() {
  

  return (
    <>
    <Router>
          <ProductProvider>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home/:id' element={<Home/>}/>
        <Route path='/productView/:id' element={<ProductView/>}/>
      </Routes>
          </ProductProvider>
    </Router>
    </>
  )
}

export default App
