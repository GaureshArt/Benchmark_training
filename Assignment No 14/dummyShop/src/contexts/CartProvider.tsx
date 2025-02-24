import { createContext, ReactNode, useReducer } from "react";
import { ICartContextType } from "../types/cartTypes";
import { cartReducer } from "../reducers/cartReducer";

export const CartContext = createContext<ICartContextType | null>(null)
type CartProviderProps = {
  children:ReactNode
}
const initialState = {
    cartData :[],
    existingProducts:new Set<number>()
}
export const CartProvider = ({children}:CartProviderProps)=>{
    const [cartState,cartDispatch] = useReducer(cartReducer,initialState)

    return (
        <CartContext.Provider value={{cartState,cartDispatch}}>
            {children}
        </CartContext.Provider>
    )
}