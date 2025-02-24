import { useEffect } from "react"
import { getCartByUser } from "../apis/cartApi"
import { Link, useParams } from "react-router-dom"
import { useCart } from "../hooks/useCart";
import { CartCard } from "../components/CartCard";


export const Cart = () => {
  const {id} = useParams();
  const {cartState,cartDispatch} = useCart();
  useEffect(()=>{
    if(cartState.existingProducts.size!==0)return;
    const fetchCartData = async()=>{
      const res = await getCartByUser(Number(id))
      cartDispatch({type:'SET_CART_PRODUCTS',data:res});
    }
    fetchCartData();
  },[])
  return (
    <>
        <Link className="m-8 p-4 h-8 border rounded  text-2xl bg-amber-200" to={`/home/${id}`}>Home</Link>
      <div className="w-svw h-auto border flex  gap-10 p-10 mt-8 flex-wrap justify-evenly ">
        {
          cartState.cartData.map((cart)=>{
            return (
              <CartCard key={cart.productId} cart={cart}/>
            )
          })
        }

      </div>
    
    </>
  )
}
