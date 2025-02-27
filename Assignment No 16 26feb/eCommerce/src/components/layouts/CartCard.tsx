import { IProductCardPropType, IProductType } from "@/types/productsType";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";


import { Link } from "react-router-dom";
import { AlertDialogBox } from "./AlertDialogBox";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProdById,  } from "@/api/productsApi";
import { IProductCartType } from "@/types/CartType";
import { useCartStore } from "@/store/useCartStore";
import { DialogDemo } from "./DialogDemo";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { SkeletonLoader } from "./SkeletonLoader";

export const CartCard = ({productId,quantity}:IProductCartType) => {
    const [prodQuantity,setProdQuantity] = useState<number>(quantity);
  
    const {data:prod,isLoading,isError,error} = useQuery({
        queryKey:['cardProductData',productId],
        queryFn:()=>getProdById({id:productId})
    })
    const {removeCartProduct} = useCartStore()
    const handleRemoveCart = ()=>{
        removeCartProduct(productId);
    }
    if(isLoading){
        return  <SkeletonLoader/> 
  

    }
    if(isError){
        return <h1>Error:{error.message}</h1>
    }
  return (
    <>{
        prod &&
        <div className="w-80 h-[22rem]">
        <Card>
          <CardHeader>
            <CardDescription>
              <Link to={`/product/${prod.id}`}>
                <img
                  className="w-80 h-40 object-contain"
                  src={prod.image}
                  alt="productImage"
                  />
              </Link>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <CardTitle className="line-clamp-2 text-center">
              {prod.title}
            </CardTitle>
            <CardTitle className="line-clamp-2 text-center font-thin">
              
              Price: ${prod.price}
            </CardTitle>
          </CardContent>
           <div className="flex gap-5 justify-center">
           <div>
            <span></span>
           <span>Quantity: {quantity}</span>
           </div>
           <span>Total Price: {quantity* prod.price}</span>
           </div>
          <CardFooter className="flex  gap-5 justify-center">
            
            <DialogDemo  quantity={prodQuantity} prodId={productId}  setQuantity={setProdQuantity}/>
            
            <AlertDialogBox onAction={handleRemoveCart} />
          </CardFooter>
        </Card>
      </div>
}
    </>
  );
};
