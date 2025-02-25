import { ChangeEvent, useState } from "react";

import {
  getAllCategories,
  getProductsApi,
  getProductsByCategory,
} from "../apis/productApi";
import { ProductCard } from "../components/ProductCard";
import { Category } from "../types/productTypes";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export const Home = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<Category>("All products");
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role");
  const {
    data: prodData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProductsApi(),
    placeholderData: (prev) => prev,
  });
  const { data: filterData } = useQuery({
    queryKey: ["filterProducts", selectedCategory],
    queryFn: () => getProductsByCategory({ prodData, selectedCategory }),
    enabled: !!prodData,
    staleTime: 1000,
  });
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategories(),
    staleTime: 1000 * 60 *5,
  });
  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };
  const handleCartButton = () => {
    navigate(`/cartView/${id}`);
  };

  if (isLoading) {
    return (
      <h1 className="w-auto p-5 rounded-2xl h-auto border border-blue-600 text-2xl text-fuchsia-400 font-bold font-serif">
        Loading
      </h1>
    );
  }
  if (isError) {
    return (
      <h1 className="w-auto p-5 rounded-2xl h-auto border border-blue-600 text-2xl text-fuchsia-400 font-bold font-serif">
        Error :{error.message}
      </h1>
    );
  }
  return (
    <>
      <div className="w-svw h-auto border rounded p-2">
        <div className="w-full h-20 bg-sky-100 font-serif p-4  flex gap-5 items-center">
          <span className="font-2xl pr-5">Filter</span>
          <select
            defaultValue={selectedCategory}
            onChange={handleCategoryChange}
            className="w-40 h-10 border border-violet-800 rounded-lg font-serif outlime-none bg-violet-200"
          >
            <option value="All products">All Products</option>
            {categories?.map((cat, ind) => {
              return <option key={ind}>{cat}</option>;
            })}
          </select>

          <button
            className="w-22 border rounded-lg h-10 bg-stone-900 text-stone-50 cursor-pointer"
            onClick={handleCartButton}
          >
            My Cart
          </button>
          {role === "admin" ? (
            <>
              <Link
                className="w-auto flex justify-center items-center p-2 border rounded-lg h-10 bg-stone-900 text-stone-50 cursor-pointer"
                to={`/manageProduct/${id}?role=admin`}
              >
                Manage Product{" "}
              </Link>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="flex gap-5 flex-wrap p-2 justify-evenly">
          {filterData?.length ? (
            filterData?.map((prod) => {
              return <ProductCard key={prod.id} prod={prod} />;
            })
          ) : (
            <>
              <h1 className="w-auto p-5 rounded-2xl h-auto border border-blue-600 text-2xl font-bold font-serif">
                Loading
              </h1>
            </>
          )}
        </div>
      </div>
    </>
  );
};
