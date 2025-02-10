import { getProductByIdApi } from "./apis/getApis.mjs";
import { postCartApi } from "./apis/postApis.mjs";


const productSection = document.querySelector('.product-section');
const productImage = document.querySelector('.product-image');
const quantityDiv = document.querySelector('.quantity');
const productTitle = document.querySelector('.title');
const productPrice = document.querySelector('.price');
const productRating = document.querySelector('.rating');
const productDesc = document.querySelector('.description');
const quantityValue =  document.querySelector('.quantity-value');
const productId = localStorage.getItem('product-id');


const getProductById = async (productId)=>{
    const product = await getProductByIdApi(productId);
    return product;
}

const showProductById = (product)=>{
    productSection.id = `${product.id}`;
    productImage.src = `${product.image}`
    productTitle.innerText = `${product.title}`;
    productPrice.innerText = `$${product.price}`;
    productRating.innerText = `⭐${product.rating.rate} (${product.rating.count} reviews)`;
    productDesc.innerText = `${product.description}`
}


const renderProductById = async(productId)=>{
    const prod = await getProductById(productId);
    console.log(prod)
    showProductById(prod.data);
}

const handleQuantityAndPriceValue = (val)=>{
    const initialValue = +quantityValue.innerText;
    const currProdPrice = +productPrice.innerText.slice(1);
    const basePrice = (currProdPrice/initialValue)
    const newProdPrice = (basePrice*val)+currProdPrice;
    productPrice.innerText = `$${(newProdPrice>=basePrice?newProdPrice.toPrecision(6):basePrice.toPrecision(6))}`;
    quantityValue.innerHTML = (initialValue+val)>0?(initialValue+val):1;
}
quantityDiv.addEventListener('click',(e)=>{
    if(e.target.classList.contains('minus')){
        handleQuantityAndPriceValue(-1);
        return;
    }
    if(e.target.classList.contains('plus')){
        handleQuantityAndPriceValue(1);
        return;
    }
})




 const handleAddCart = async (prodcard)=>{
    console.log(prodcard)
    const id = +prodcard.id;
    const res = await postCartApi(id);
    
}
const addCart = document.querySelector('.Add-cart');
addCart.addEventListener('click',(e)=>{
    
    
    handleAddCart(productSection);

})



renderProductById(productId);