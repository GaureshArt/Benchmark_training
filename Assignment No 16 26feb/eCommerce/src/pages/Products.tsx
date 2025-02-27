import { getAllCategories, getAllProducts } from "@/api/productsApi";
import { DropDownForPrice } from "@/components/layouts/DropDownForPrice";
import { DropDownMenuBox } from "@/components/layouts/DropDownMenuBox";
import { ProductCard } from "@/components/layouts/ProductCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useProductStore } from "@/store/useProductStore";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Products = () => {
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const { isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  const filterData = useProductStore((state) => state.filterData);

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  if (isLoading) {
    return (
      <>
        <div className="w-svw h-svh p-10 flex items-center justify-center overflow-hidden">
          <Skeleton className="w-full h-full" />
        </div>
      </>
    );
  }
  if (isError) {
    return (
      <>
        <h1> Error in products: {error.message}</h1>
      </>
    );
  }
  return (
    <>
      <div className="flex justify-center m-5 font-serif tracking-wider gap-5">
        {categories && (
          <DropDownMenuBox
            itemList={categories}
            price={price}
            setPrice={setPrice}
            setCategory={setCategory}
            category={category}
          />
        )}
        {filterData!.length && (
          <DropDownForPrice
            itemList={["Low -> high", "High -> Low"]}
            price={price}
            setPrice={setPrice}
          />
        )}
        {categories && (
          <Link to={"/product/add"}>
            <Button>Add Product</Button>
          </Link>
        )}
      </div>
      <div className="font-serif tracking-wider flex flex-wrap justify-center gap-5">
        {filterData!.length &&
          filterData!.map((prod) => {
            return <ProductCard key={prod.id} prod={prod} />;
          })}
      </div>
    </>
  );
};
