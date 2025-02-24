import { ICartApiType } from "../types/cartTypes";
import { fakeStoreApi } from "./authApi";

export const getCartByUser =async (id:number):Promise<ICartApiType[]>=>{
    try{
        const res = await fakeStoreApi.get<ICartApiType[]>(`https://fakestoreapi.com/carts/user/${id}`)
        return res.data;
    }catch(error){
        throw new Error(`This is error at getCartByUser ${error}`);
    }
}