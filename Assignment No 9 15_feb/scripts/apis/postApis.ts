import { getId } from "./getApis.js";
import { cartInstance, loginInstance } from "./instanceApis.js";
import {
  authLogInApiResponse,
  getUserCartType,
  userDataForAuthType,
} from "./utilityTypes.js";

export const authLogInApi = async (
  userdata: userDataForAuthType
): Promise<authLogInApiResponse> => {
  try {
    const res = await loginInstance.post<authLogInApiResponse>(
      "/login",
      userdata
    );
    return res.data;
  } catch (err) {
    console.log(`Error in authLogInApi`);
    throw err;
  }
};

const cartIsAlreadyAdded = (cartData:getUserCartType[],id:number):boolean=>{
console.log("cat",cartData)
console.log("Id",id)
    return cartData.some(cart => 
        cart.products.some(product => product.productId === id)
    );
}
export const postCartApi = async (
  id: number,
  quantity: number
): Promise<void> => {
  try {
    const cartData: getUserCartType[] = JSON.parse(
      sessionStorage.getItem("cartData") as string
    );
    if(cartIsAlreadyAdded(cartData,id)){
        alert("Cart is already added!!");
        return;
    }
    const token = sessionStorage.getItem("user-token") as string;
    const userid: number = +getId(token);
    console.log("cart date", cartData);

    const newCart: Omit<getUserCartType, "id"> = {
      date: new Date().toISOString(),
      userId: userid,
      products: [{ productId: id, quantity: quantity }],
    };
    const res = await cartInstance.post<getUserCartType>("/", newCart);
    cartData.push(res.data);
    sessionStorage.setItem('cartData',JSON.stringify(cartData));
    alert('Cart saved successfully');
    return;
  } catch (err) {
    console.log(`Error postCartApi`, err);
    throw err;
  }
};
