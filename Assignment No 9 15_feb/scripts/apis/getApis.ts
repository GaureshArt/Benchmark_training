import { userInstance,productInstance,cartInstance } from "./instanceApis.js";
import {getUserCartType,getProductsResponseType, userData} from "./utilityTypes.js"



export const getUserApi = async ():Promise<userData>=>{
    const id = Math.floor(Math.random()*10)+1;
    try{
        const res =  (await userInstance.get<userData>(`/${id}`)).data;
        return res;
    }catch(err){
        console.log(err);
        throw err;
    }
}


export const getAllProductsApi = async ():Promise<getProductsResponseType[]>=>{
    try{
        const res = await productInstance.get<getProductsResponseType[]>('/');
        return res.data;
    }
    catch(err){
        
        throw err;
    }
}


export const getProductsByCategoryApi = async (category:string):Promise<getProductsResponseType[]>=>{
    try{
        const res = await productInstance.get<getProductsResponseType[]>(`/category/${category}`)
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


export const getUserCartApi = async():Promise<getUserCartType[]>=>{
    try{
        const token = sessionStorage.getItem('user-token') as string;
        const id:number = getId(token);
        const res = await cartInstance.get<getUserCartType[]>(`/user/${id}`)
        return res.data;
    }catch(err){
        
        throw err;
    }
}


export const getProductByIdApi = async(id:number):Promise<getProductsResponseType>=>{
    try{
        const res = await productInstance.get<getProductsResponseType>(`/${id}`);
        
        return res.data;
    }catch(err){
        
        throw err;
    }
}