
import { BrowserRouter as Router,Route,Routes  } from 'react-router-dom'

import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { ProductProvider } from './contexts/ProductProvider'
import { ProductView } from './pages/ProductView'
import { Cart } from './pages/Cart'
import { CartProvider } from './contexts/CartProvider'
import { ProtectedRoutes } from './pages/ProtectedRoutes'
import { ManageProduct } from './pages/ManageProduct'

function App() {
  

  return (
    <>
          <ProductProvider>
          <CartProvider>
    <Router>

      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home/:id' element={<Home/>}/>
        <Route path='/productView/:id' element={<ProductView/>}/>
        <Route path='/cartView/:id' element={<Cart/>}/>
        <Route element={<ProtectedRoutes />}>
            <Route path='/manageProduct/:id' element={<ManageProduct/>}/>
        </Route>
      </Routes>
    </Router>
          </CartProvider>
          </ProductProvider>
    </>
  )
}

export default App
