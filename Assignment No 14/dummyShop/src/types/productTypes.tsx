import { ActionDispatch } from "react";

interface IRatingType{
    rate:number;
    count:number;
}

export interface IProductType{
    id:number;
    title:string;
    price:number;
    description:string;
    image:string;
    category:string;
    rating:IRatingType;
}

export interface IProductReducerState{
    originalData:IProductType[] ;
    filterData:IProductType[];
}
export type productAction = {
    type:'SET_PRODUCTS',data:IProductType[];
}|{
    type:'FILTER_PRODUCTS',category:string;
}


export interface IProductContextType {
    productState: IProductReducerState;
    productDispatch:ActionDispatch<[action: productAction]>;
}

export interface IProductCardProps{
    prod:IProductType;
}


export type Category = string;
export interface IProductCategoriesApiType{
    data:Category[];
}


export interface IGetProductByIdProps  {
id:number;
}