var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getProductByIdApi, getUserCartApi } from "./apis/getApis.js";
import { patchUserCartApi, removeUserCartCardFakeApi } from "./apis/patchApis.js";
const mainSection = document.querySelector('.main');
const createCartCard = (prodData, quantity, cartId) => {
    var _a;
    const cartCard = document.createElement('div');
    cartCard.className = 'cart-card';
    cartCard.dataset.price = String(prodData.price);
    cartCard.dataset.productId = (_a = String(prodData.id)) !== null && _a !== void 0 ? _a : 'N/A';
    cartCard.dataset.cartId = String(cartId);
    cartCard.dataset.quantity = String(quantity);
    cartCard.innerHTML = `
        <img class="product-image" src=${prodData.image} alt="product-image">
        <div class="product-info">
        <h2 class="product-title">${prodData.title}</h2>
        <div class="product-rating">⭐ ${prodData.rating.rate} (${prodData.rating.count} reviews) <button class="edit-cart">Edit</button></div>
        
        <div class="product-price"> Base Price:$${prodData.price}
        <button class="remove-cart">Remove</button>
        </div>
        <div class="total-price-quantity">
            <div class="total-price-div">Total Price: $<span class="total-price">${quantity * prodData.price}</span></div>
            <div class="quantity" data-value="${quantity}"> Quantity: ${quantity}</div>
        </div>
        </div>
    `;
    mainSection.append(cartCard);
};
const renderCartProducts = () => {
    const data = JSON.parse(sessionStorage.getItem("cartData"));
    data.map((cart, id) => {
        cart.products.map((prod) => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield getProductByIdApi(prod.productId);
            createCartCard(res, prod.quantity, cart.id);
        }));
    });
};
const renderUserCartData = () => {
    renderCartProducts();
};
const saveCartProductsInsession = (data) => {
    const prevData = sessionStorage.getItem("cartData");
    if (prevData)
        return;
    console.log("data", data);
    sessionStorage.setItem("cartData", JSON.stringify(data));
};
const getUserCartData = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield getUserCartApi();
    saveCartProductsInsession(res);
    renderUserCartData();
});
const quantityEventHandler = (e) => {
    const targetElement = e.target;
    const cartCard = targetElement.closest('.cart-card');
    if (targetElement.classList.contains('minus')) {
        handleQuantityAndPriceValue(-1, cartCard);
        return;
    }
    if (targetElement.classList.contains('plus')) {
        handleQuantityAndPriceValue(1, cartCard);
        return;
    }
};
const handleEditCart = (cartCard, editDiv) => {
    const quantityDiv = cartCard.querySelector('.quantity');
    editDiv.innerText = 'Save';
    quantityDiv.innerHTML = `
            
        <span class="minus ">-</span>
        <span class="quantity-value">${quantityDiv.dataset.value}</span>
        <span class="plus">+</span>
            
    `;
    quantityDiv.addEventListener('click', quantityEventHandler);
};
const handleSaveCart = (cartCard, editDiv) => {
    editDiv.innerText = 'Edit';
    const quantityDiv = cartCard.querySelector('.quantity');
    const quantityValue = quantityDiv.querySelector('.quantity-value').innerText;
    quantityDiv.innerHTML = `
        Quantity: ${quantityValue}
    `;
    const updateData = {
        date: new Date().toISOString(),
        productId: cartCard.dataset.productId,
        quantity: quantityValue,
        cartId: cartCard.dataset.cartId
    };
    cartCard.dataset.quantityValue = quantityValue;
    quantityDiv.dataset.value = quantityValue;
    patchUserCartApi(updateData);
};
const handleRemoveCartCard = (cardCart) => {
    console.log(cardCart);
    const cartId = cardCart.closest('.cart-card').dataset.cartId;
    const updateData = {
        date: new Date().toISOString(),
        productId: cardCart.dataset.productId,
        quantity: cardCart.dataset.quantity,
        cartId: cartId
    };
    removeUserCartCardFakeApi(updateData);
};
mainSection.addEventListener('click', (e) => {
    const targetElement = e.target;
    const cardCart = targetElement.closest('.cart-card');
    if (targetElement.classList.contains('edit-cart') && targetElement.innerText === 'Edit') {
        handleEditCart(cardCart, targetElement);
        return;
    }
    if (targetElement.classList.contains('edit-cart') && targetElement.innerText === 'Save') {
        handleSaveCart(cardCart, targetElement);
        return;
    }
    if (targetElement.classList.contains('remove-cart')) {
        handleRemoveCartCard(cardCart);
    }
});
const handleQuantityAndPriceValue = (val, cartCard) => {
    const initialValue = +cartCard.dataset.quantity;
    const productTotalPriceDiv = cartCard.querySelector('.total-price');
    const quantityValueDiv = cartCard.querySelector('.quantity-value');
    const currProdPrice = +productTotalPriceDiv.innerText;
    const basePrice = +cartCard.dataset.price;
    const newProdPrice = (basePrice * val) + currProdPrice;
    productTotalPriceDiv.innerText = `${(newProdPrice >= basePrice ? newProdPrice.toPrecision(6) : basePrice.toPrecision(6))}`;
    const quantityValue = (initialValue + val) > 0 ? (initialValue + val) : 1;
    quantityValueDiv.innerHTML = String(quantityValue);
    cartCard.dataset.quantity = String(quantityValue);
};
getUserCartData();
