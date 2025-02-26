import { IProductType } from "./productTypes";


export interface ICartGetApiType {
  productIds: Set<number>;
  newProductsData: ICartProductsType[];
}

export interface ICartProductsType {
  productId: number;
  quantity: number;
}
export interface ICartApiType {
  id: number;
  userId: number;
  date: string;
  products: ICartProductsType[];
}




export interface ICartCardPropType {
  cart: ICartProductsType;
}

export type ProdReducerActionTypes = {
  type: "SET_DATA";
  data: IProductType;
};
