import { IProductType } from "./productTypes";

export interface ICartContextType {
  cartState: ICartReducerStateType;
  cartDispatch: React.ActionDispatch<[action: CartReducerActionType]>;
}

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

export interface ICartReducerStateType {
  cartData: ICartProductsType[];
  existingProducts: Set<number>;
}

export type CartReducerActionType =
  | {
      type: "SET_CART_PRODUCTS";
      data: ICartApiType[];
    }
  | {
      type: "ADD_CART_PRODUCT";
      productId: number;
      quantity: number;
    }
  | {
      type: "REMOVE_CART_PRODUCT";
      data: ICartProductsType["productId"];
    }
  | {
      type: "UPDATE_CART_PRODUCT";
      data: ICartProductsType;
    };

export interface ICartCardPropType {
  cart: ICartProductsType;
}

export type ProdReducerActionTypes = {
  type: "SET_DATA";
  data: IProductType;
};
