import { getProductByIdApi } from "./apis/getApis.js";
import { postCartApi } from "./apis/postApis.js";
import { IGetProductsResponseType } from "./apis/utilityTypes.js";

const productSection = document.querySelector(
  ".product-section"
) as HTMLDivElement;
const productImage = document.querySelector(
  ".product-image"
) as HTMLImageElement;
const quantityDiv = document.querySelector(".quantity") as HTMLDivElement;
const productTitle = document.querySelector(".title") as HTMLDivElement;
const productPrice = document.querySelector(".price") as HTMLDivElement;
const productRating = document.querySelector(".rating") as HTMLDivElement;
const productDesc = document.querySelector(".description") as HTMLDivElement;
const quantityValue = document.querySelector(
  ".quantity-value"
) as HTMLDivElement;
const productId = sessionStorage.getItem("product-id") as string;
const addCart = document.querySelector(".Add-cart") as HTMLDivElement;

const getProductById = async (productId: string) => {
  const product = await getProductByIdApi(Number(productId));
  return product;
};

const showProductById = (product: IGetProductsResponseType) => {
  productSection.id = `${product.id}`;
  productImage.src = `${product.image}`;
  productTitle.innerText = `${product.title}`;
  productPrice.innerText = `$${product.price}`;
  productRating.innerText = `⭐${product.rating.rate} (${product.rating.count} reviews)`;
  productDesc.innerText = `${product.description}`;
};

const renderProductById = async (productId: string) => {
  const prod = await getProductById(productId);

  showProductById(prod);
};

const handleQuantityAndPriceValue = (val: number) => {
  const initialValue = +quantityValue.innerText;
  const currProdPrice = +productPrice.innerText.slice(1);
  const basePrice = currProdPrice / initialValue;
  const newProdPrice = basePrice * val + currProdPrice;
  productPrice.innerText = `$${
    newProdPrice >= basePrice
      ? newProdPrice.toPrecision(6)
      : basePrice.toPrecision(6)
  }`;
  quantityValue.innerHTML =
    initialValue + val > 0 ? String(initialValue + val) : "1";
};
quantityDiv.addEventListener("click", (e: Event) => {
  const targetElement = e.target as HTMLDivElement;
  if (targetElement.classList.contains("minus")) {
    handleQuantityAndPriceValue(-1);
    return;
  }
  if (targetElement.classList.contains("plus")) {
    handleQuantityAndPriceValue(1);
    return;
  }
});

const handleAddCart = async (prodcard: HTMLDivElement) => {
  const quantityValue = +(
    prodcard.querySelector(".quantity-value") as HTMLSpanElement
  ).innerHTML;
  const id = +prodcard.id;
  const res = await postCartApi(id, quantityValue);
};

addCart.addEventListener("click", (e) => {
  handleAddCart(productSection);
});

renderProductById(productId);
