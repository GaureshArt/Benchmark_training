import { getAllProductsApi } from "./apis/getApis.mjs";


const productSection = document.querySelector('.product-section');
const showAllProducts = (products)=>{
    console.log(products.data)
    for(const prod of products.data){
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img class="product-image" src=${prod.image} alt="product-image">
            <div class="product-info">
                <h2 class="product-title">${prod.title}</h2>
                <div class="product-rating">⭐ ${prod.rating.rate} (${prod.rating.count} reviews)</div>
                <div class="product-price">$${prod.price}</div>
            </div>
        `
        productSection.append(productCard);
    }
}

const getAllProducts = async ()=>{
    const res = await getAllProductsApi();
    return res;
}

const renderAllProducts = async()=>{
    const productsData = await getAllProducts();
    showAllProducts(productsData);
}

renderAllProducts();                                                                                      