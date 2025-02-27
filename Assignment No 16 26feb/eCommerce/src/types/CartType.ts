export interface IProductCartType{
    productId:number;
    quantity:number;
}

export interface ICartType{
    id:number;
    userId:number;
    date:string;
    products:IProductCartType[];
}