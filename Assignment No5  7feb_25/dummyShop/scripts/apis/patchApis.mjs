import { cartInstance } from "./instanceApis.mjs";
import { getId } from "./getApis.mjs";


export const patchUserCartApi = async (data)=>{
    const token = sessionStorage.getItem('user-token');
    const id = getId(token).sub;   
    const cartData = sessionStorage.getItem('cartData') ;
    const cartDataJson = JSON.parse(cartData);
    
    const obj = cartDataJson.find((cart)=>cart.date===data.date);
     const updateData= obj.products.map((prod)=>{
        return prod.productId===+data.productId?{...prod,quantity:+data.quantity}:{...prod};
    }
    )
    obj.products = [...updateData];
    
    sessionStorage.setItem('cartData',JSON.stringify(cartDataJson));

    const res = await cartInstance.patch(`/${data.cartId}`,{
        userId:id,
        date:data.date,
        products:updateData
    })
    


}


export const  removeUserCartCardApi = async (data)=>{
    const token = sessionStorage.getItem('user-token');
    const id = getId(token).sub;   
    const cartData = sessionStorage.getItem('cartData') ;
    const cartDataJson = JSON.parse(cartData);

    const obj = cartDataJson.find((cart)=>cart.date===data.date);
    const updateData= obj.products.filter((prod)=>{
        return prod.productId!== +data.productId;
    })
    
    obj.products = [...updateData];
    
    sessionStorage.setItem('cartData',JSON.stringify(cartDataJson));
    const res = await cartInstance.patch(`/${data.cartId}`,{
        userId:id,
        date:data.date,
        products:updateData
    })
    
}