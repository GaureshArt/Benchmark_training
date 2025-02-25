import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProductById } from "../apis/productApi";

import toast, { Toaster } from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ICartGetApiType } from "../types/cartTypes";

export const ProductViewCard = () => {
  const [searchParams] = useSearchParams();
  const [quantity, setQuantity] = useState<number>(1);
  const queryClient = useQueryClient();

  const {
    data: prodData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["productById", Number(searchParams.get("productId"))],
    queryFn: () =>
      getProductById({ id: Number(searchParams.get("productId")) }),
  });
  const handleQuantiy = (e: React.MouseEvent<HTMLDivElement>) => {
    const operator = (e.target as HTMLDivElement).innerHTML;
    if (operator === "+") {
      setQuantity(quantity + 1);
    } else {
      if (quantity === 1) {
        return;
      }
      setQuantity(quantity - 1);
    }
  };

  const cartData: ICartGetApiType = queryClient.getQueryData(["cart"])!;
  const handleAddCart = async () => {
    const id = Number(searchParams.get("productId"));
    if (cartData.productIds.has(id)) {
      toast.success("product is already added!");
      return;
    }
    queryClient.setQueryData(["cart"], (prev: ICartGetApiType) => {
      return {
        ...prev,
        productIds: prev.productIds.add(id),
        newProductsData: [
          ...prev.newProductsData,
          { productId: id, quantity: quantity },
        ],
      };
    });
    toast.success("product  added successfully!");
  };
  const mutateCart = useMutation({
    mutationKey: ["cartAdd"],
    mutationFn: handleAddCart,
  });
  if (isError) {
    return (
      <>
        <h1>Something Went Wrong</h1>
      </>
    );
  }
  return (
    <>
      <Toaster />
      {!isLoading && prodData ? (
        <div className="w-3/5 h-3/5 border border-stone-800 rounded-lg overflow-hidden flex p-10 gap-14 mt-8">
          <div className="w-1/2 h-full ">
            <img
              className="w-full h-full object-contain mix-blend-difference"
              src={prodData.image}
              alt="productImage"
            />
          </div>
          <div className="w-2/5 font-serif">
            <span className="text-xl font-bold tracking-wider">
              {" "}
              {prodData.title}
            </span>
            <hr />
            <span className="tracking-wide">{prodData.description}</span>
            <div className="flex flex-col gap-6">
              <span className="font-bold text-2xl">
                Price: ${prodData.price}
              </span>
              <div className="flex gap-16 items-center">
                <div
                  className="text-3xl border w-9 rounded-xl text-center font-bold text-stone-50 bg-stone-800  cursor-pointer select-none"
                  onClick={handleQuantiy}
                >
                  -
                </div>
                <span className="text-xl">Quantity: {quantity}</span>
                <div
                  className="text-3xl border w-9 rounded-xl text-center font-bold text-stone-50 bg-stone-800 cursor-pointer select-none"
                  onClick={handleQuantiy}
                >
                  +
                </div>
              </div>
              <div className="flex gap-5 items-center w-full justify-end  ">
                <span className="text-xl">
                  Total Price: ${(quantity * prodData.price).toPrecision(6)}
                </span>
                <button
                  className="w-22 border rounded-lg h-10 bg-stone-900 text-stone-50 cursor-pointer"
                  onClick={() => mutateCart.mutate()}
                >
                  Add Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1 className="text-3xl font-serif text-stone-800 font-bold">
          Loading..
        </h1>
      )}
    </>
  );
};
