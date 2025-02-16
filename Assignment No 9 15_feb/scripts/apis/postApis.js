var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getId } from "./getApis.js";
import { cartInstance, loginInstance } from "./instanceApis.js";
export const authLogInApi = (userdata) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield loginInstance.post("/login", userdata);
        return res.data;
    }
    catch (err) {
        console.log(`Error in authLogInApi`);
        throw err;
    }
});
const cartIsAlreadyAdded = (cartData, id) => {
    console.log("cat", cartData);
    console.log("Id", id);
    return cartData.some(cart => cart.products.some(product => product.productId === id));
};
export const postCartApi = (id, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cartData = JSON.parse(sessionStorage.getItem("cartData"));
        if (cartIsAlreadyAdded(cartData, id)) {
            alert("Cart is already added!!");
            return;
        }
        const token = sessionStorage.getItem("user-token");
        const userid = +getId(token);
        console.log("cart date", cartData);
        const newCart = {
            date: new Date().toISOString(),
            userId: userid,
            products: [{ productId: id, quantity: quantity }],
        };
        const res = yield cartInstance.post("/", newCart);
        cartData.push(res.data);
        sessionStorage.setItem('cartData', JSON.stringify(cartData));
        alert('Cart saved successfully');
        return;
    }
    catch (err) {
        console.log(`Error postCartApi`, err);
        throw err;
    }
});
