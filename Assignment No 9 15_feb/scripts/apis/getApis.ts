import { userInstance,productInstance,cartInstance } from "./instanceApis.js";
import {IGetUserCartType,IGetProductsResponseType, IUserData} from "./utilityTypes.js"



export const getUserApi = async ():Promise<IUserData>=>{
    const id = Math.floor(Math.random()*10)+1;
    try{
        const res =  (await userInstance.get<IUserData>(`/${id}`)).data;
        return res;
    }catch(err){
        console.log(err);
        throw err;
    }
}


export const getAllProductsApi = async ():Promise<IGetProductsResponseType[]>=>{
    try{
        const res = await productInstance.get<IGetProductsResponseType[]>('/');
        return res.data;
    }
    catch(err){
        
        throw err;
    }
}


export const getProductsByCategoryApi = async (category:string):Promise<IGetProductsResponseType[]>=>{
    try{
        const res = await productInstance.get<IGetProductsResponseType[]>(`/category/${category}`)
        return res.data;     
    }
    catch(err){
        throw err;
    }
}



export const getId = (token:string)=>{
    const encodedId = token.split('.')[1];
    return JSON.parse(atob(encodedId)).sub;
}


export const getUserCartApi = async():Promise<IGetUserCartType[]>=>{
    try{
        const token = sessionStorage.getItem('user-token') as string;
        const id:number = getId(token);
        const res = await cartInstance.get<IGetUserCartType[]>(`/user/${id}`)
        return res.data;
    }catch(err){
        
        throw err;
    }
}


export const getProductByIdApi = async(id:number):Promise<IGetProductsResponseType>=>{
    try{
        const res = await productInstance.get<IGetProductsResponseType>(`/${id}`);
        
        return res.data;
    }catch(err){
        
        throw err;
    }
}