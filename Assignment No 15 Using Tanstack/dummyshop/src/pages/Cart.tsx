
import { getCartByUser } from "../apis/cartApi"
import { Link, useParams, useSearchParams } from "react-router-dom"

import { CartCard } from "../components/CartCard";
import { useQuery } from "@tanstack/react-query";


export const Cart = () => {
  const {id} = useParams();
  const [searchParams] = useSearchParams();
  const {data:cartData} = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCartByUser(Number(id)),
    
  })

  return (
    <>
        <Link className="m-8 p-4 h-8 border rounded  text-2xl bg-amber-200" to={`/home/${id}?role=${searchParams.get('role')}`}>Home</Link>
      <div className="w-svw h-auto border flex  gap-10 p-10 mt-8 flex-wrap justify-evenly ">
        {
          cartData?.newProductsData.map((cart)=>{
            return <CartCard cart={cart} key={cart.productId}/>
          })
        }

      </div>
    
    </>
  )
}
