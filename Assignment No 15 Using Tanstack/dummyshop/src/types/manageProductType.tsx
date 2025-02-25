export interface IAddProductFormDataType {
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export interface IAddProductPropType {
  prod: IAddProductFormDataType;
}
