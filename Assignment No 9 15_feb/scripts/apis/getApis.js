var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { userInstance, productInstance, cartInstance } from "./instanceApis.js";
export const getUserApi = () => __awaiter(void 0, void 0, void 0, function* () {
    const id = Math.floor(Math.random() * 10) + 1;
    try {
        const res = (yield userInstance.get(`/${id}`)).data;
        return res;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
});
export const getAllProductsApi = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield productInstance.get('/');
        return res.data;
    }
    catch (err) {
        console.error(`Error in getAllProducts: `, err);
        throw err;
    }
});
export const getProductsByCategoryApi = (category) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield productInstance.get(`/category/${category}`);
        return res.data;
    }
    catch (err) {
        throw err;
    }
});
export const getId = (token) => {
    const encodedId = token.split('.')[1];
    return JSON.parse(atob(encodedId)).sub;
};
export const getUserCartApi = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = sessionStorage.getItem('user-token');
        const id = getId(token);
        const res = yield cartInstance.get(`/user/${id}`);
        return res.data;
    }
    catch (err) {
        console.log(`Error in getUserCartApi`, err);
        throw err;
    }
});
export const getProductByIdApi = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield productInstance.get(`/${id}`);
        return res.data;
    }
    catch (err) {
        console.error(err);
        throw err;
    }
});
