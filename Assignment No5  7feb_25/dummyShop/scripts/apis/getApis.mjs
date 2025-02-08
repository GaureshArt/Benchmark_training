import { productInstance,userInstance } from "./instanceApis.mjs";


export const getAllProductsApi = async ()=>{
    try{
        const res = productInstance.get();
        return res;
    }
    catch(err){
        console.error(`Error in getAllProducts: `,err);
    }
}

export const getProductByIdApi = async(id)=>{
    try{
        const res = await productInstance.get(`/${id}`);
        return res;
    }catch(err){
        console.error(err);
        return null;
    }
}

export const getProductsByCategoryApi = async (category)=>{
    try{
        const res = await productInstance.get(`/category/${category}`)
        return res;     
    }
    catch(err){
        console.log(`Error occur in getProductsByCategory: `,err.message);
        return null;
    }
}


export const getUserApi = async ()=>{
    try{
        const res = await userInstance.get('/1');
        return res;
    }catch(err){
        console.log(err);
        return null;
    }
}


