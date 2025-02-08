import { cartInstance } from "./instanceApis.mjs"


export const postCart = async(cart)=>{
    cartInstance.post()
}