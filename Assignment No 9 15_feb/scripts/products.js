var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getAllProductsApi, getProductsByCategoryApi } from "./apis/getApis.js";
const productSection = document.querySelector('.product-section');
const myCartBtn = document.querySelector('.my-cart');
const filterOpt = document.querySelector('.filter');
const showAllProducts = (products) => {
    productSection.innerHTML = '';
    for (const prod of products) {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.id = String(prod.id);
        productCard.innerHTML = `
            <img class="product-image" src=${prod.image} alt="product-image">
            <div class="product-info">
                <h2 class="product-title">${prod.title}</h2>
                <div class="product-rating">⭐ ${prod.rating.rate} (${prod.rating.count} reviews)</div>
                <div class="product-price">$${prod.price}
                </div>
            </div>
        `;
        productSection.append(productCard);
    }
};
const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield getAllProductsApi();
    return res;
});
const renderAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const productsData = yield getAllProducts();
    showAllProducts(productsData);
});
productSection.addEventListener('click', (e) => {
    var _a;
    const targetElement = e.target;
    if (targetElement.closest('.product-card')) {
        const id = (_a = targetElement === null || targetElement === void 0 ? void 0 : targetElement.closest('.product-card')) === null || _a === void 0 ? void 0 : _a.id;
        sessionStorage.setItem("product-id", `${id}`);
        window.location.href = 'productView.html';
    }
});
filterOpt.addEventListener('change', (e) => __awaiter(void 0, void 0, void 0, function* () {
    const targetElement = e.target;
    if (targetElement.value === 'All') {
        renderAllProducts();
    }
    else {
        const res = yield getProductsByCategoryApi(targetElement.value);
        showAllProducts(res);
    }
}));
renderAllProducts();
