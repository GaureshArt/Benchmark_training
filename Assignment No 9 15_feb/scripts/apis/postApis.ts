import { getId } from "./getApis.js";
import { cartInstance, loginInstance } from "./instanceApis.js";
import {
  IAuthLogInApiResponse,
  IGetUserCartType,
  IUserDataForAuthType,
} from "./utilityTypes.js";

export const authLogInApi = async (
  userdata: IUserDataForAuthType
): Promise<IAuthLogInApiResponse> => {
  try {
    const res = await loginInstance.post<IAuthLogInApiResponse>(
      "/login",
      userdata
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

const cartIsAlreadyAdded = (
  cartData: IGetUserCartType[],
  id: number
): boolean => {
  return cartData.some((cart) =>
    cart.products.some((product) => product.productId === id)
  );
};
export const postCartApi = async (
  id: number,
  quantity: number
): Promise<void> => {
  try {
    const cartData: IGetUserCartType[] = JSON.parse(
      sessionStorage.getItem("cartData") as string
    );
    if (cartIsAlreadyAdded(cartData, id)) {
      alert("Cart is already added!!");
      return;
    }
    const token = sessionStorage.getItem("user-token") as string;
    const userid: number = +getId(token);

    const newCart: Omit<IGetUserCartType, "id"> = {
      date: new Date().toISOString(),
      userId: userid,
      products: [{ productId: id, quantity: quantity }],
    };
    const res = await cartInstance.post<IGetUserCartType>("/", newCart);
    cartData.push(res.data);
    sessionStorage.setItem("cartData", JSON.stringify(cartData));
    alert("Cart saved successfully");
    return;
  } catch (err) {
    throw err;
  }
};
