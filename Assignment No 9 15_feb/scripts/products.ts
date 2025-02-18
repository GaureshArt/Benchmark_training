import { getAllProductsApi, getProductsByCategoryApi } from "./apis/getApis.js";
import { IGetProductsResponseType } from "./apis/utilityTypes.js";

const productSection = document.querySelector(
  ".product-section"
) as HTMLDivElement;
const myCartBtn = document.querySelector(".my-cart") as HTMLButtonElement;
const filterOpt = document.querySelector(".filter") as HTMLSelectElement;

const showAllProducts = (products: IGetProductsResponseType[]) => {
  productSection.innerHTML = "";
  for (const prod of products) {
    const productCard = document.createElement("div") as HTMLDivElement;
    productCard.className = "product-card";
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

const getAllProducts = async () => {
  const res = await getAllProductsApi();
  return res;
};

const renderAllProducts = async () => {
  const productsData = await getAllProducts();
  showAllProducts(productsData);
};

productSection.addEventListener("click", (e: Event) => {
  const targetElement = e.target as HTMLElement;
  if (targetElement.closest(".product-card")) {
    const id = targetElement?.closest(".product-card")?.id;
    sessionStorage.setItem("product-id", `${id}`);
    window.location.href = "productView.html";
  }
});

filterOpt.addEventListener("change", async (e: Event) => {
  const targetElement = e.target as HTMLSelectElement;

  if (targetElement.value === "All") {
    renderAllProducts();
  } else {
    const res = await getProductsByCategoryApi(targetElement.value);
    showAllProducts(res);
  }
});

renderAllProducts();
