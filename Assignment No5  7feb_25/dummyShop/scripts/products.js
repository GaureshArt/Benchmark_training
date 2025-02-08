import { getAllProductsApi } from "./apis/getApis.mjs";


const productSection = document.querySelector('.product-section');
const showAllProducts = (products)=>{
    console.log(products.data)
    for(const prod of products.data){
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.id = prod.id;
        productCard.innerHTML = `
            <img class="product-image" src=${prod.image} alt="product-image">
            <div class="product-info">
                <h2 class="product-title">${prod.title}</h2>
                <div class="product-rating">⭐ ${prod.rating.rate} (${prod.rating.count} reviews)</div>
                
                <div class="product-price">$${prod.price}
                <button class="Add-cart">Add Cart</button>
                </div>
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

productSection.addEventListener('click',(e)=>{
    
    if(e.target.className === 'Add-cart'){
        //here Add-cart functionality will invoked 
        return   ;
    }
    if(e.target.closest('.product-card')){
        const id = e.target.closest('.product-card').id;
        localStorage.setItem("product-id", `${id}`);
        window.location.href = 'product-view.html';
    }
})



renderAllProducts();    



