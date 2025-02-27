import { BrowserRouter as Router, Route,Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { Navbar } from "./components/layouts/Navbar"
import { Products } from "./pages/Products"
import { Cart } from "./pages/Cart"
import { ProductView } from "./pages/ProductView"
import { ProductEdit } from "./pages/ProductEdit"
import { ProductAdd } from "./pages/ProductAdd"
function App() {


  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/product/:id" element={<ProductView/>}/>
        <Route path="/product/edit/:id" element={<ProductEdit/>}/>
        <Route path="/product/add" element={<ProductAdd/>}/>
        <Route path="/cart" element={<Cart/>}/>


      </Routes>
    </Router>

    </>
  )
}

export default App
