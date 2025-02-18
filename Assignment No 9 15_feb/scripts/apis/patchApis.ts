
import { cartInstance } from "./instanceApis.js";
import { getId } from "./getApis.js";
import { IGetUserCartType,IGetUserCartTypeProductsType, IPatchResponseType } from "./utilityTypes.js";
import { IPatchUserCartParamType } from "./utilityTypes.js";
export const patchUserCartApi = async (data:IPatchUserCartParamType)=>{
    
    const token = sessionStorage.getItem('user-token') as string;
    const id = +getId(token);   
    const cartData = sessionStorage.getItem('cartData') as string;
    
    const cartDataJson:IGetUserCartType[] = JSON.parse(cartData);

    const obj = cartDataJson.find((cart:IGetUserCartType)=>cart.id===+data.cartId) as IGetUserCartType;
    
     const updateData = obj.products.map((prod:IGetUserCartTypeProductsType)=>{
        return prod.productId===+data.productId?{...prod,quantity:+data.quantity}:{...prod};
    }
    )
    obj.products = [...updateData];

    sessionStorage.setItem('cartData',JSON.stringify(cartDataJson));

    const res = await cartInstance.patch<IPatchResponseType>(`/${data.cartId}`,{
        userId:id,
        date:data.date,
        products:updateData
    })

    alert(`Status code: ${res.status}`);

}



export const  removeUserCartCardFakeApi = async (data:IPatchUserCartParamType)=>{
    if(!confirm("Are you sure")){
return ;
    }
    
    const cartData = sessionStorage.getItem('cartData') as string ;
    const cartDataJson:IGetUserCartType[] = JSON.parse(cartData);
    const obj = cartDataJson.filter((cart)=>cart.id!==+data.cartId) as IGetUserCartType[];
     
    sessionStorage.setItem('cartData',JSON.stringify(obj));
    alert("Cart is removed")
    location.reload();
    
}