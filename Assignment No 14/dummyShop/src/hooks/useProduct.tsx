import { useContext } from "react"
import { ProductContext } from "../contexts/ProductProvider"

export const useProduct = ()=>{
    const context = useContext(ProductContext)

    if(!context){
        throw new Error("Please use product context inside product Provider");
    }
    return context;
}