import { useContext } from "react"
import { CartContext } from "../contexts/CartProvider"
import { ICartContextType } from "../types/cartTypes";

export const useCart = ():ICartContextType=>{
    const context = useContext(CartContext);
    if(!context){
        throw new Error('Please use cart context in side CartProvider');
    }
    return context;
}