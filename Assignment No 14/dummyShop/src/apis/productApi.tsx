import { AxiosResponse } from "axios";
import { Category, IGetProductByIdProps, IProductCategoriesApiType, IProductType } from "../types/productTypes";
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


export const getProductById = async({id}:IGetProductByIdProps):Promise<IProductType>=>{
    try{
        const res = await fakeStoreApi.get<IProductType>(`/products/${id}`);
        return res.data;
    }catch(err){
        throw new Error(`Error at getProductById ${err}`);
    }
}

export const getAllCategories = async():Promise<Category[]>=>{

    try{
        const res = (await fakeStoreApi.get<Category[]>('products/categories'));
        
        
        return res.data;
    }
    catch(err){

        throw new Error(`Error in getAllCategories${err}`);
    }
            
            
}