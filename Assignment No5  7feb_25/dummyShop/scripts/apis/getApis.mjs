
const productInstance = axios.create({
    baseURL:"https://fakestoreapi.com/products"
})


export const getAllProductsApi = async ()=>{
    try{
        const res = productInstance.get();
        return res;
    }
    catch(err){
        console.error(`Error in getAllProducts: `,err);
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



