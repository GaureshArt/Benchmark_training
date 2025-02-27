export interface IProductType{
    id:number;
    title:string;
    price:number;
    category:string;
    description:string;
    image:string;
}


export interface IProductCardPropType{
    prod:IProductType;
}
export interface IIDasProps{
    id:number;
}

export interface getProductsByCategoryProps{
    category:string;
}
// export interface IUpdateProdByIdProp{
    
// }
// export interface IGetAllProductsType{

// }