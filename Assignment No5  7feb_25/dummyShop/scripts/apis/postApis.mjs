import { cartInstance,loginInstance } from "./instanceApis.mjs"
import { getId } from "./getApis.mjs";
import { patchUserCartApi } from "./patchApis.mjs";



export const authLogInApi = async(userdata)=>{
    try{
        const res = await loginInstance.post('/login',userdata);
        return res;
    }catch(err){
        console.log(`Error in authLogInApi`);
        return err;
    }
}


export const saveCartProductsInsession = (data,cart)=>{
    const prevData = JSON.parse(sessionStorage.getItem("cartData"));
    if(data){

        console.log("adddata:",data);
        prevData.push(data);   
        sessionStorage.setItem("cartData",JSON.stringify(prevData));
        
    }else{
        const dateCart = prevData.find((prod)=>prod.date===cart.date);
        console.log("data",cart)
        dateCart.products = [...dateCart.products,cart.products];
        console.log("prevData",prevData);
        sessionStorage.setItem("cartData",JSON.stringify(prevData));
    }

}
export const postCartApi = async(id)=>{
    try{

        const cartData = JSON.parse(sessionStorage.getItem('cartData'));
        const token = sessionStorage.getItem('user-token');
        const userid = getId(token).sub;
        console.log(cartData);
        const today = new Date();
        const formattedDate = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())).toISOString();
        console.log(formattedDate);
    const cart = cartData.find((cart)=>cart.date===formattedDate);
    console.log(
        "cart this",cart
    )
    if(!cart){
        const res = await cartInstance.post('/',{
            userId:userid,
            date:formattedDate,
            products:[{productId:id,quantity:1}]
        });
        console.log("res:",res);
        saveCartProductsInsession(res.data,cart);
    }else{
        saveCartProductsInsession(null,{
            
            date:formattedDate,
            products:{productId:id,quantity:1}
        })
    }
    alert("Cart is saved");
}catch(err){
    console.log(`Error postCartApi`,err);
}
}