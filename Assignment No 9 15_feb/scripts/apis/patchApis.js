var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { cartInstance } from "./instanceApis.js";
import { getId } from "./getApis.js";
export const patchUserCartApi = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const token = sessionStorage.getItem('user-token');
    const id = +getId(token);
    const cartData = sessionStorage.getItem('cartData');
    const cartDataJson = JSON.parse(cartData);
    console.log("cartFata", cartDataJson);
    const obj = cartDataJson.find((cart) => cart.id === +data.cartId);
    const updateData = obj.products.map((prod) => {
        return prod.productId === +data.productId ? Object.assign(Object.assign({}, prod), { quantity: +data.quantity }) : Object.assign({}, prod);
    });
    obj.products = [...updateData];
    console.log("cartFata new", cartDataJson);
    sessionStorage.setItem('cartData', JSON.stringify(cartDataJson));
    const res = yield cartInstance.patch(`/${data.cartId}`, {
        userId: id,
        date: data.date,
        products: updateData
    });
    console.log("respones:,", res);
    alert(`Status code: ${res.status}`);
});
export const removeUserCartCardFakeApi = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (!confirm("Are you sure")) {
        return;
    }
    const cartData = sessionStorage.getItem('cartData');
    const cartDataJson = JSON.parse(cartData);
    const obj = cartDataJson.filter((cart) => cart.id !== +data.cartId);
    console.log("new data", obj);
    sessionStorage.setItem('cartData', JSON.stringify(obj));
    alert("Cart is removed");
    location.reload();
});
