import { IProductType } from "@/types/productsType";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type UseProductStoreType = {
    filterData:IProductType[];
    setProducts:(data:IProductType[])=>void;
};
export const useProductStore = create<UseProductStoreType>()(
    devtools((set) => ({
      filterProducts: [],
      setProducts: (data) =>
        set({ filterData: data }, false, "setProducts"), // ✅ Named action for debugging
    }))
  );