import { getAllProductsApi, getProductsByCategoryApi } from "./apis/getApis.mjs";
import { postCartApi } from "./apis/postApis.mjs";

const productSection = document.querySelector('.product-section');
const myCartBtn = document.querySelector('.my-cart')
const filterOpt = document.querySelector('.filter')




const showAllProducts = (products)=>{
    console.log(products.data)
    productSection.innerHTML  = '';
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
    console.log("prod",productsData);
    showAllProducts(productsData);
}


const handleAddCart = async (prodcard)=>{
    const id = +prodcard.id;
    const res = await postCartApi(id);
    
}

productSection.addEventListener('click',(e)=>{
    
    if(e.target.className === 'Add-cart'){
            const prodcard = e.target.closest('.product-card');
            handleAddCart(prodcard);
        return   ;
    }
    if(e.target.closest('.product-card')){
        const id = e.target.closest('.product-card').id;
        localStorage.setItem("product-id", `${id}`);
        window.location.href = 'product-view.html';
    }
})


filterOpt.addEventListener('change',async (e)=>{
    if(e.target.value=='All'){
        renderAllProducts();
    }else{
        const res = await getProductsByCategoryApi(e.target.value);
        showAllProducts(res);
    }
    
})
fetch('https://fakestoreapi.com/products/categories')
            .then(res=>res.json())
            .then(json=>console.log(json))

renderAllProducts();    



