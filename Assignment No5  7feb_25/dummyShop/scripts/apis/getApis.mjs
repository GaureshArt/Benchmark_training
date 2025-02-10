import { productInstance,userInstance,cartInstance } from "./instanceApis.mjs";


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



export const getId = (token)=>{
    const encodedId = token.split('.')[1];
    return JSON.parse(atob(encodedId));
}
export const getUserCartApi = async()=>{
    try{
        const token = sessionStorage.getItem('user-token');
        const id = getId(token).sub;
        const res = await cartInstance.get(`/user/${id}`)
        return res;
    }catch(err){
        console.log(`Error in getUserCartApi`,err);
        return err;
    }
}

export const getUserApi = async ()=>{
    const id = Math.floor(Math.random()*10)+1;
    
    try{
        const res = await userInstance.get(`/${id}`);
        console.log(res.data)
        return res;
    }catch(err){
        console.log(err);
        return null;
    }
}


