import { getUserCartApi ,getProductByIdApi} from "./apis/getApis.mjs";
import { patchUserCartApi, removeUserCartCardApi } from "./apis/patchApis.mjs";

const mainSection = document.querySelector('.main');

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
}


const renderCartDate = ()=>{
    const data = JSON.parse(sessionStorage.getItem("cartData"));
console.log("data:",data)

    data.map((data,id)=>{
        const cartSection = document.createElement('div');
        cartSection.className = ` cart-section cart-section-${id}`;
        cartSection.dataset.cartId = data?.id??'N/A';
        cartSection.innerHTML = `
            <div class="cart-date">${formatDate(data.date)}</div>
        `
        mainSection.append(cartSection);

    })
    
}

const createCartCard = (prodData,cartSection,quantity)=>{
    const cartCard = document.createElement('div');
    cartCard.className = 'cart-card';
    cartCard.dataset.price = prodData.data.price;
    cartCard.dataset.productId = prodData?.data?.id??'N/A';
    cartCard.dataset.quantity = quantity;
    cartCard.innerHTML = `
        <img class="product-image" src=${prodData.data.image} alt="product-image">
        <div class="product-info">
        <h2 class="product-title">${prodData.data.title}</h2>
        <div class="product-rating">⭐ ${prodData.data.rating.rate} (${prodData.data.rating.count} reviews) <button class="edit-cart">Edit</button></div>
        
        <div class="product-price"> Base Price:$${prodData.data.price}
        <button class="remove-cart">Remove</button>
        </div>
        <div class="total-price-quantity">
            <div class="total-price-div">Total Price: $<span class="total-price">${quantity*prodData.data.price}</span></div>
            <div class="quantity" data-value="${quantity}"> Quantity: ${quantity}</div>
        </div>
        </div>
    `
    cartSection.append(cartCard);
}
const renderCartProducts = ()=>{
    const data = JSON.parse(sessionStorage.getItem("cartData"));
    data.map((cart,id)=>{
        
        const cartSection = document.querySelector(`.cart-section-${id}`);
        cart.products.map(async (prod)=>{
            const res = await getProductByIdApi(prod.productId)
            createCartCard(res,cartSection,prod.quantity); 
        })
    })
}
const renderUserCartData = ()=>{
    renderCartDate();
    renderCartProducts();
}

 const saveCartProductsInsession = (data)=>{
    const prevData = sessionStorage.getItem("cartData")
    if(prevData)return ;
    console.log("data",data)
    const cartData = [];
    data.map((cart)=>{
        const obj = {
            id:cart.id,
            date:cart.date,
            products:cart.products
        }
        cartData.push(obj);
    })
    sessionStorage.setItem("cartData",JSON.stringify(cartData));

}
const getUserCartData = async()=>{
    const res = await getUserCartApi();
    console.log(res)
    saveCartProductsInsession(res.data);
    renderUserCartData();
    
    

}
const quantityEventHandler = (e)=>{
    const cartCard = e.target.closest('.cart-card')
    
    if(e.target.classList.contains('minus')){
        handleQuantityAndPriceValue(-1,cartCard);
        return;
    }
    if(e.target.classList.contains('plus')){
        handleQuantityAndPriceValue(1,cartCard);
        return;
    }
};
const handleEditCart = (cartCard,editDiv)=>{
    const quantityDiv = cartCard.querySelector('.quantity');
    editDiv.innerText = 'Save'
    quantityDiv.innerHTML = `
            
        <span class="minus ">-</span>
        <span class="quantity-value">${quantityDiv.dataset.value}</span>
        <span class="plus">+</span>
            
    `
    quantityDiv.addEventListener('click',quantityEventHandler)
}

const handleSaveCart = (cartCard,editDiv)=>{
    editDiv.innerText = 'Edit';
    const quantityDiv = cartCard.querySelector('.quantity');
    const quantityValue = quantityDiv.querySelector('.quantity-value').innerText;
    quantityDiv.innerHTML = `
        Quantity: ${quantityValue}
    `
    const dateText = cartCard.closest('.cart-section').querySelector('.cart-date').innerText;
    const cartId = cartCard.closest('.cart-section').dataset.cartId;
    const date = new Date(dateText + " UTC");
    console.log("date:",date.toISOString())
    const updateData = {
        date:date.toISOString(),
        productId :cartCard.dataset.productId,
        quantity:quantityValue,
        cartId:cartId
    }
    patchUserCartApi(updateData);

    
}

const handleRemoveCartCard = (cardCart)=>{
    // const remove = removeDiv.closest()
    
    // const prodId = cardCart.dataset.productId;
    console.log(cardCart);
     const dateText = cardCart.closest('.cart-section').querySelector('.cart-date').innerText;
    const cartId = cardCart.closest('.cart-section').dataset.cartId;
    const date = new Date(dateText + " UTC");
    console.log("date:",date.toISOString())
    const updateData = {
        date:date.toISOString(),
        productId :cardCart.dataset.productId,
        quantity:cardCart.dataset.quantity,
        cartId:cartId
    }
    removeUserCartCardApi(updateData);
}
mainSection.addEventListener('click',(e)=>{
    const cardCart = e.target.closest('.cart-card');
    if(e.target.classList.contains('edit-cart') && e.target.innerText==='Edit'){
        handleEditCart(cardCart,e.target);
        return;
    }
    if(e.target.classList.contains('edit-cart') && e.target.innerText==='Save'){

        handleSaveCart(cardCart,e.target);
        return ;
    }
    if(e.target.classList.contains('remove-cart')){
        handleRemoveCartCard(cardCart,e.target);
    }

    
})



const handleQuantityAndPriceValue = (val,cartCard)=>{
    const initialValue = +cartCard.dataset.quantity;
    const productTotalPriceDiv = cartCard.querySelector('.total-price')
    const quantityValueDiv = cartCard.querySelector('.quantity-value')
    const currProdPrice = +productTotalPriceDiv.innerText;
    const basePrice = +cartCard.dataset.price;
    const newProdPrice = (basePrice*val)+currProdPrice;
    productTotalPriceDiv.innerText = `${(newProdPrice>=basePrice?newProdPrice.toPrecision(6):basePrice.toPrecision(6))}`;
    const quantityValue = (initialValue+val)>0?(initialValue+val):1;
    quantityValueDiv.innerHTML = quantityValue;
    cartCard.dataset.quantity = quantityValue;
}


getUserCartData();
