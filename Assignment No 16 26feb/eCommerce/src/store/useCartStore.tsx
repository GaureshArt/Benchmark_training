
import { ICartType, IProductCartType } from "@/types/CartType";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type CartStoreType = {
  cartData: ICartType;
  existingProducts:Set<number>,
  setCartData:(data:ICartType)=>void;
  setExistingProducts:()=>void;
  removeCartProduct: (id: number) => void;
  updateCartProduct: (data: IProductCartType) => void;
  addCartProduct: (data: IProductCartType) => void;
};


export const useCartStore = create<CartStoreType>((set)=>({
    cartData:{
        id:1,
        userId:1,
        date:'',
        products:[]
    },
    existingProducts:new Set(),
    setCartData:(data:ICartType)=>{
        set({cartData:data});
    },
    setExistingProducts:()=>{
        set((state)=>({
            existingProducts:new Set(state.cartData.products.map((prod)=>prod.productId)),
        }))
    },
    removeCartProduct:(id:number)=>{
        set((state)=>({
            cartData:{
                ...state.cartData,
                products:state.cartData.products.filter((prod)=>prod.productId!==id)
            },
            existingProducts:new Set([...state.existingProducts].filter((prod)=>prod!==id)),
        }))
    },
    addCartProduct:(data:IProductCartType)=>{
        set((state)=>({
            cartData:{
                ...state.cartData,
                products:[...state.cartData.products,data]
            },
            existingProducts:state.existingProducts.add(data.productId),
        }))
    },
    updateCartProduct:(data:IProductCartType)=>{
        set((state)=>({
            cartData:{
                ...state.cartData,
                products:state.cartData.products.map((prod)=>prod.productId===data.productId?data:prod)
            }
        }))
    }
}))
