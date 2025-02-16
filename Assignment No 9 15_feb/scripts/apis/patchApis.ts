
import { cartInstance } from "./instanceApis.js";
import { getId } from "./getApis.js";
import { getUserCartType,getUserCartTypeProductsType, patchResponseType } from "./utilityTypes.js";
import { patchUserCartParamType } from "./utilityTypes.js";
export const patchUserCartApi = async (data:patchUserCartParamType)=>{
    
    const token = sessionStorage.getItem('user-token') as string;
    const id = +getId(token);   
    const cartData = sessionStorage.getItem('cartData') as string;
    
    const cartDataJson:getUserCartType[] = JSON.parse(cartData);
    console.log("cartFata",cartDataJson)
    const obj = cartDataJson.find((cart:getUserCartType)=>cart.id===+data.cartId) as getUserCartType;
    
     const updateData = obj.products.map((prod:getUserCartTypeProductsType)=>{
        return prod.productId===+data.productId?{...prod,quantity:+data.quantity}:{...prod};
    }
    )
    obj.products = [...updateData];
    console.log("cartFata new",cartDataJson)
    sessionStorage.setItem('cartData',JSON.stringify(cartDataJson));

    const res = await cartInstance.patch<patchResponseType>(`/${data.cartId}`,{
        userId:id,
        date:data.date,
        products:updateData
    })
    console.log("respones:,",res)
    alert(`Status code: ${res.status}`);

}



export const  removeUserCartCardFakeApi = async (data:patchUserCartParamType)=>{
    if(!confirm("Are you sure")){
return ;
    }
    
    const cartData = sessionStorage.getItem('cartData') as string ;
    const cartDataJson:getUserCartType[] = JSON.parse(cartData);
    const obj = cartDataJson.filter((cart)=>cart.id!==+data.cartId) as getUserCartType[];
    console.log("new data",obj)    
    sessionStorage.setItem('cartData',JSON.stringify(obj));
    alert("Cart is removed")
    location.reload();
    
}