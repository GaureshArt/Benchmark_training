import { AxiosHeaders } from "../../node_modules/axios/index";

export type userData = {
  id: number;
  email: string;
  username: string;
  password: string;
  name: object;
  address: object;
  phone: string;
};

export type userDataForAuthType = {
  username: string;
  password: string;
};

export type authLogInApiResponse = {
  token: string;
};

export type getProductsResponseType = {
  id: number;
  title: string;
  category: string;
  image: string;
  price: number;
  rating: { rate: number; count: number };
  description: string;
};

export type getUserCartType = {
  date: string;
  id: number;
  products: getUserCartTypeProductsType[];
  userId: number;
};

export type getUserCartTypeProductsType = {
  productId: number;
  quantity: number;
};

export type patchUserCartParamType = {
  productId: string;
  quantity: string;
  cartId: string;
  date?: string;
};

export type patchResponseType = {
  config: object;
  data: object;

  headers: AxiosHeaders;
  request: XMLHttpRequest;
  status: number;
  statusText: string;
};
