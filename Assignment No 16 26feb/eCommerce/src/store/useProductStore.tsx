import { IProductType } from "@/types/productsType";
import { create } from "zustand";

type UseProductStoreType = {
    filterProducts:IProductType[];
    setProducts:(data:IProductType[])=>void;
};
export const  useProductStore = create<UseProductStoreType>((set)=>({
    filterProducts:[],
    setProducts:(data)=>set({filterProducts:data})
}))