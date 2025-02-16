var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getProductByIdApi } from "./apis/getApis.js";
import { postCartApi } from "./apis/postApis.js";
const productSection = document.querySelector('.product-section');
const productImage = document.querySelector('.product-image');
const quantityDiv = document.querySelector('.quantity');
const productTitle = document.querySelector('.title');
const productPrice = document.querySelector('.price');
const productRating = document.querySelector('.rating');
const productDesc = document.querySelector('.description');
const quantityValue = document.querySelector('.quantity-value');
const productId = sessionStorage.getItem('product-id');
const addCart = document.querySelector('.Add-cart');
const getProductById = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield getProductByIdApi(Number(productId));
    return product;
});
const showProductById = (product) => {
    productSection.id = `${product.id}`;
    productImage.src = `${product.image}`;
    productTitle.innerText = `${product.title}`;
    productPrice.innerText = `$${product.price}`;
    productRating.innerText = `⭐${product.rating.rate} (${product.rating.count} reviews)`;
    productDesc.innerText = `${product.description}`;
};
const renderProductById = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const prod = yield getProductById(productId);
    showProductById(prod);
});
const handleQuantityAndPriceValue = (val) => {
    const initialValue = +quantityValue.innerText;
    const currProdPrice = +productPrice.innerText.slice(1);
    const basePrice = (currProdPrice / initialValue);
    const newProdPrice = (basePrice * val) + currProdPrice;
    productPrice.innerText = `$${(newProdPrice >= basePrice ? newProdPrice.toPrecision(6) : basePrice.toPrecision(6))}`;
    quantityValue.innerHTML = (initialValue + val) > 0 ? (String(initialValue + val)) : '1';
};
quantityDiv.addEventListener('click', (e) => {
    const targetElement = e.target;
    if (targetElement.classList.contains('minus')) {
        handleQuantityAndPriceValue(-1);
        return;
    }
    if (targetElement.classList.contains('plus')) {
        handleQuantityAndPriceValue(1);
        return;
    }
});
const handleAddCart = (prodcard) => __awaiter(void 0, void 0, void 0, function* () {
    const quantityValue = +prodcard.querySelector('.quantity-value').innerHTML;
    const id = +prodcard.id;
    const res = yield postCartApi(id, quantityValue);
});
addCart.addEventListener('click', (e) => {
    handleAddCart(productSection);
});
renderProductById(productId);
