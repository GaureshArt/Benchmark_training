import { useCartStore } from "@/store/useCartStore";
import { fakeStoreApi } from "./productsApi"
import { IProductCartType } from "@/types/CartType";
export const getCartDataById = async()=>{

    const res =await fakeStoreApi.get('/carts/1');
    useCartStore.setState({cartData:res.data});
    useCartStore.setState({
        existingProducts:new Set(res.data.products.map((prod:IProductCartType)=>prod.productId))
    })

    return res.data
}