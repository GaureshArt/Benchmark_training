import { useProductStore } from "@/store/useProductStore";
import {  getProductsByCategoryProps, IIDasProps, IProductCardPropType, IProductType } from "@/types/productsType";
import axios from "axios";

export const fakeStoreApi = axios.create({
    baseURL:'https://fakestoreapi.com'
});

export const getAllProducts = async():Promise<IProductType[]>=>{
    const res = await fakeStoreApi.get<IProductType[]>('/products')
    useProductStore.setState({ filterData: res.data });
    return res.data;
}
export const getProdById = async({id}:IIDasProps):Promise<IProductType>=>{
    const res = await fakeStoreApi.get<IProductType>(`/products/${id}`);
    return res.data;
}

export const updateProdById = async({prod}:IProductCardPropType)=>{
    const res = await fakeStoreApi.patch(`/products/${prod.id}`,prod);
    
    return res.data;
}
export const removeProdById = async ({id}:IIDasProps)=>{
    const res = await fakeStoreApi.delete(`/products/${id}`);
    return res.data;
}

export const getAllCategories = async()=>{
    const res = await fakeStoreApi.get( `/products/categories`);
    return res.data;
}

export const getProductsByCategory = async({category}:getProductsByCategoryProps):Promise<IProductType[]>=>{
    if(category==='reset')return [];
    const res = await fakeStoreApi.get<IProductType[]>(`/products/category/${category}`)
    return res.data;
}

export const addProduct = async({data}:{data:Partial<IProductType>})=>{
    const res = await fakeStoreApi.post(`/products`,data);
    return res.data;
}