import {  createContext, ReactNode, useReducer } from "react"
import { IProductContextType, IProductReducerState } from "../types/productTypes";
import {  productReducer } from "../reducers/productReducer";

type ProductProviderType = {
  children:ReactNode
}
 const productInitialState:IProductReducerState= {
  originalData: [],
  filterData:[]
}
export const ProductContext = createContext<IProductContextType | null>(null);
export const ProductProvider = ({children}:ProductProviderType) => {
  const [productState,productDispatch] = useReducer(productReducer,productInitialState)

  return (
    <>
    <ProductContext.Provider value={{productState ,productDispatch}}>
      {children}
    </ProductContext.Provider>
    </>
  )
}
