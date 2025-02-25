import { ActionDispatch } from "react";

export interface IGetProductsByCategoryProps {
  prodData: IProductType[] | undefined;
  selectedCategory: string;
}

interface IRatingType {
  rate: number;
  count: number;
}

export interface IProdDeleteProp {
  id: number;
}
export interface IProductType {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: IRatingType;
}

export interface IProductReducerState {
  originalData: IProductType[];
  filterData: IProductType[];
}
export type productAction =
  | {
      type: "SET_PRODUCTS";
      data: IProductType[];
    }
  | {
      type: "FILTER_PRODUCTS";
      category: string;
    }
  | {
      type: "ADD_PRODUCT";
      data: IProductType;
    }
  | {
      type: "UPDATE_PRODUCT";
      data: IProductType;
    };

export interface IProductContextType {
  productState: IProductReducerState;
  productDispatch: ActionDispatch<[action: productAction]>;
}

export interface IProductCardProps {
  prod: IProductType;
}

export type Category = string;
export interface IProductCategoriesApiType {
  data: Category[];
}

export interface IGetProductByIdProps {
  id: number;
}

export interface IUpdateProductPropType {
  data: IProductType;
}
