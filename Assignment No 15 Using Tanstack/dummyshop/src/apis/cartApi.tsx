import {
  ICartApiType,
  ICartGetApiType,
  ICartProductsType,
} from "../types/cartTypes";
import { fakeStoreApi } from "./authApi";

export const getCartByUser = async (id: number): Promise<ICartGetApiType> => {
  try {
    const res = await fakeStoreApi.get<ICartApiType[]>(
      `https://fakestoreapi.com/carts/user/${id}`
    );
    const productIds = new Set<number>();
    const newProductsData: ICartProductsType[] = [];
    res.data.map((cart) => {
      cart.products.map((product) => {
        if (!productIds.has(product.productId)) {
          productIds.add(product.productId);
          newProductsData.push(product);
        }
      });
    });
    return { productIds, newProductsData };
  } catch (error) {
    throw new Error(`This is error at getCartByUser ${error}`);
  }
};
