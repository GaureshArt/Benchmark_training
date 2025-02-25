import { IAddProductPropType } from "../types/manageProductType";
import {
  Category,
  IGetProductByIdProps,
  IGetProductsByCategoryProps,
  IProdDeleteProp,
  IProductType,
  IUpdateProductPropType,
} from "../types/productTypes";
import { fakeStoreApi } from "./authApi";

export const getProductsApi = async (): Promise<IProductType[]> => {
  try {
    const res = await fakeStoreApi.get<IProductType[]>("/products");
    return res.data;
  } catch (err) {
    throw new Error(`Error in getProductApi:${err}`);
  }
};

export const getProductsByCategory = async ({
  prodData,
  selectedCategory,
}: IGetProductsByCategoryProps): Promise<IProductType[]> => {
  try {
    if (selectedCategory === "All products") return prodData!;
    return prodData!.filter((prod) => prod.category === selectedCategory);
  } catch (err) {
    throw new Error(`Error in getProductsByCategory ${err}`);
  }
};

export const getProductById = async ({
  id,
}: IGetProductByIdProps): Promise<IProductType> => {
  try {
    const res = await fakeStoreApi.get<IProductType>(`/products/${id}`);

    return res.data;
  } catch (err) {
    throw new Error(`Error at getProductById ${err}`);
  }
};

export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const res = await fakeStoreApi.get<Category[]>("products/categories");
    return res.data;
  } catch (err) {
    throw new Error(`Error in getAllCategories${err}`);
  }
};

export const addProduct = async ({
  prod,
}: IAddProductPropType): Promise<IProductType> => {
  try {
    const res = await fakeStoreApi.post<IProductType>("/products", {
      ...prod,
    });

    return res.data;
  } catch (err) {
    throw new Error(`Error in addProduct ${err}`);
  }
};

export const updateProduct = async ({
  data,
}: IUpdateProductPropType): Promise<IProductType> => {
  try {
    console.log("This is id:", data.id);
    const res = await fakeStoreApi.patch<IProductType>(`/products/${data.id}`, {
      ...data,
    });

    return res.data;
  } catch (err) {
    throw new Error(`Error in updateProduct ${err}`);
  }
};

export const deleteProduct = async ({ id }: IProdDeleteProp) => {
  const res = await fakeStoreApi.delete(
    `https://fakestoreapi.com/products/${id}`
  );
  console.log("delete", res);
  return res;
};
