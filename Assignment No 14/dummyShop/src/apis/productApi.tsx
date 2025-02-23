import { IProductType } from "../types/productTypes";
import { fakeStoreApi } from "./authApi"; 

export const getProductsApi = async ():Promise<IProductType[]>=>{
    try{
        const res = await fakeStoreApi.get<IProductType[]>('/products')
        return res.data;
    }
    catch(err){
        throw new Error(`Error in getProductApi:${err}`);
    }

}