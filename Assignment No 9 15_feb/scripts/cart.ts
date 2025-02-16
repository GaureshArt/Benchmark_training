


import { getId, getProductByIdApi, getUserCartApi} from "./apis/getApis.js";
import { patchUserCartApi, removeUserCartCardFakeApi } from "./apis/patchApis.js";
import { getUserCartType,getProductsResponseType, patchUserCartParamType } from "./apis/utilityTypes.js";

const mainSection = document.querySelector('.main') as HTMLDivElement;





const createCartCard = (prodData:getProductsResponseType,quantity:number,cartId:number)=>{
    const cartCard = document.createElement('div');
    cartCard.className = 'cart-card';
    cartCard.dataset.price = String(prodData.price);
    cartCard.dataset.productId = String(prodData.id)??'N/A';
    cartCard.dataset.cartId = String( cartId);
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
            <div class="total-price-div">Total Price: $<span class="total-price">${quantity*prodData.price}</span></div>
            <div class="quantity" data-value="${quantity}"> Quantity: ${quantity}</div>
        </div>
        </div>
    `
    mainSection.append(cartCard);
}
const renderCartProducts = ()=>{
    const data = JSON.parse(sessionStorage.getItem("cartData") as string) as getUserCartType[];
    data.map((cart,id)=>{
        
        
        cart.products.map(async (prod)=>{
            const res = await getProductByIdApi(prod.productId)
            createCartCard(res,prod.quantity,cart.id); 
        })
    })
}
const renderUserCartData = ()=>{
    renderCartProducts();
}

 const saveCartProductsInsession = (data:getUserCartType[])=>{
    const prevData = sessionStorage.getItem("cartData")
    if(prevData)return ;
    console.log("data",data)
    sessionStorage.setItem("cartData",JSON.stringify(data));
}
const getUserCartData = async():Promise<void>=>{
    const res = await getUserCartApi();
    saveCartProductsInsession(res);
    renderUserCartData();
}
const quantityEventHandler = (e:Event)=>{
    const targetElement = e.target as HTMLDivElement;
    const cartCard = targetElement.closest('.cart-card') as HTMLDivElement;
    
    if(targetElement.classList.contains('minus')){
        handleQuantityAndPriceValue(-1,cartCard);
        return;
    }
    if(targetElement.classList.contains('plus')){
        handleQuantityAndPriceValue(1,cartCard);
        return;
    }
};
const handleEditCart = (cartCard:HTMLDivElement,editDiv:HTMLDivElement)=>{
    const quantityDiv = cartCard.querySelector('.quantity') as HTMLDivElement;
    editDiv.innerText = 'Save'
    quantityDiv.innerHTML = `
            
        <span class="minus ">-</span>
        <span class="quantity-value">${quantityDiv.dataset.value}</span>
        <span class="plus">+</span>
            
    `
    quantityDiv.addEventListener('click',quantityEventHandler)
}

const handleSaveCart = (cartCard:HTMLDivElement,editDiv:HTMLDivElement)=>{
    editDiv.innerText = 'Edit';
    const quantityDiv = cartCard.querySelector('.quantity') as HTMLDivElement;
    const quantityValue = (quantityDiv.querySelector('.quantity-value') as HTMLDivElement).innerText;
    quantityDiv.innerHTML = `
        Quantity: ${quantityValue}
    `
    const updateData:patchUserCartParamType = {
        date:new Date().toISOString(),
        productId :cartCard.dataset.productId as string,
        quantity:quantityValue,
        cartId : cartCard.dataset.cartId as string

    }
    cartCard.dataset.quantityValue = quantityValue;
    quantityDiv.dataset.value = quantityValue;
    patchUserCartApi(updateData);

    
}


const handleRemoveCartCard = (cardCart:HTMLDivElement)=>{

    console.log(cardCart);
    
    const cartId = (cardCart.closest('.cart-card')as HTMLDivElement).dataset.cartId as string;
    const updateData:patchUserCartParamType = {
        date:new Date().toISOString(),
        productId :cardCart.dataset.productId as string,
        quantity:cardCart.dataset.quantity as string,
        cartId:cartId
    }
    removeUserCartCardFakeApi(updateData);
}
mainSection.addEventListener('click',(e:Event):void=>{
    const targetElement = e.target as HTMLDivElement;
    const cardCart = targetElement.closest('.cart-card') as HTMLDivElement;
    if(targetElement.classList.contains('edit-cart') && targetElement.innerText==='Edit'){
        handleEditCart(cardCart,targetElement);
        return;
    }
    if(targetElement.classList.contains('edit-cart') && targetElement.innerText==='Save'){
        handleSaveCart(cardCart,targetElement);
        return ;
    }
    if(targetElement.classList.contains('remove-cart')){
        handleRemoveCartCard(cardCart);
    }
})



const handleQuantityAndPriceValue = (val:number,cartCard:HTMLDivElement)=>{
    const initialValue = +(cartCard.dataset.quantity as string);
    const productTotalPriceDiv = cartCard.querySelector('.total-price') as HTMLDivElement;
    const quantityValueDiv = cartCard.querySelector('.quantity-value') as HTMLDivElement;
    const currProdPrice = +(productTotalPriceDiv.innerText as string);
    const basePrice = +(cartCard.dataset.price as string);
    const newProdPrice = (basePrice*val)+currProdPrice;
    productTotalPriceDiv.innerText = `${(newProdPrice>=basePrice?newProdPrice.toPrecision(6):basePrice.toPrecision(6))}`;
    const quantityValue = (initialValue+val)>0?(initialValue+val):1;
    quantityValueDiv.innerHTML = String(quantityValue);
    cartCard.dataset.quantity = String(quantityValue);
}


getUserCartData();
