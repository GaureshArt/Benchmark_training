import { AxiosHeaders } from "../../node_modules/axios/index";

export interface IUserData {
  id: number;
  email: string;
  username: string;
  password: string;
  name: object;
  address: object;
  phone: string;
};

export interface IUserDataForAuthType  {
  username: string;
  password: string;
};

export interface IAuthLogInApiResponse  {
  token: string;
};

export interface IGetProductsResponseType  {
  id: number;
  title: string;
  category: string;
  image: string;
  price: number;
  rating: { rate: number; count: number };
  description: string;
};

export interface IGetUserCartType  {
  date: string;
  id: number;
  products: IGetUserCartTypeProductsType[];
  userId: number;
};

export interface IGetUserCartTypeProductsType  {
  productId: number;
  quantity: number;
};

export interface IPatchUserCartParamType  {
  productId: string;
  quantity: string;
  cartId: string;
  date?: string;
};

export interface IPatchResponseType {
  config: object;
  data: object;

  headers: AxiosHeaders;
  request: XMLHttpRequest;
  status: number;
  statusText: string;
};
