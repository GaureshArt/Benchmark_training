import { useCartStore } from "@/store/useCartStore";
import { fakeStoreApi } from "./productsApi"
import { IProductCartType } from "@/types/CartType";
export const getCartDataById = async()=>{
    // const setExistingProducts = useCartStore((state)=>state.setExistingProducts);
    const res =await fakeStoreApi.get('/carts/1');
    console.log("data",res.data)
    useCartStore.setState({cartData:res.data});
    // setExistingProducts();
    useCartStore.setState({
        existingProducts:new Set(res.data.products.map((prod:IProductCartType)=>prod.productId))
    })

    return res.data
}