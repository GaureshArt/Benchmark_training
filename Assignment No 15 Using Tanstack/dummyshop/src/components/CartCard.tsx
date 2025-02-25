import React, { useState } from "react";
import {
  ICartCardPropType,
  ICartGetApiType,
  ProdReducerActionTypes,
} from "../types/cartTypes";
import { IProductType } from "../types/productTypes";
import { getProductById } from "../apis/productApi";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const reducer = (
  state: IProductType,
  action: ProdReducerActionTypes
): IProductType => {
  switch (action.type) {
    case "SET_DATA": {
      return action.data;
    }

    default: {
      return state;
    }
  }
};
export const CartCard = ({ cart }: ICartCardPropType) => {
  const [quantity, setQuantity] = useState<number>(cart.quantity);
  const [initialQuantity, setInitialQuantity] = useState(cart.quantity);
  const queryClient = useQueryClient();
  const { data: cartData, isLoading } = useQuery({
    queryKey: ["cartProduct", cart.productId],
    queryFn: () => getProductById({ id: cart.productId }),
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
  const handleQuantityUpdate = async () => {
    queryClient.setQueryData(["cart"], (prev: ICartGetApiType) => {
      return {
        ...prev,
        newProductsData: prev.newProductsData.map((prod) => {
          if (prod.productId === cart.productId) {
            return { ...prod, quantity: quantity };
          }
          return prod;
        }),
      };
    });
    setInitialQuantity(quantity);
  };
  const mutateCartData = useMutation({
    mutationKey: ["cartDataUpdate"],
    mutationFn: handleQuantityUpdate,
  });
  const handleRemoveCart = async () => {
    if (!confirm("Are you sure")) return;
    queryClient.setQueryData(["cart"], (prev: ICartGetApiType) => {
      return {
        ...prev,
        newProductsData: prev.newProductsData.filter((prod) => {
          return prod.productId !== cart.productId;
        }),
      };
    });
  };
  const removeCartData = useMutation({
    mutationKey: ["removeCartData"],
    mutationFn: handleRemoveCart,
  });
  return (
    <>
      <div className="w-1/4 h-[30rem]  border rounded-2xl font-serif">
        {isLoading === false && cartData ? (
          <>
            <div className="w-full h-1/2">
              <img
                className=" w-full h-full object-contain"
                src={cartData.image}
                alt="prodImage"
              />
            </div>
            <div className="p-3 flex flex-col gap-2">
              <span className=" line-clamp-1 text-lg ">{cartData.title}</span>
              <div> Base Price:{cartData.price}</div>
              <div className="flex gap-8 items-center ">
                <div
                  className="text-1xl border w-9 rounded-lg text-center font-bold text-stone-50 bg-stone-800  cursor-pointer select-none"
                  onClick={handleQuantiy}
                >
                  -
                </div>
                <span className="text-xl">Quantity: {quantity}</span>
                <div
                  className="text-1xl border w-9 rounded-md text-center font-bold text-stone-50 bg-stone-800 cursor-pointer select-none"
                  onClick={handleQuantiy}
                >
                  +
                </div>
                {initialQuantity !== quantity ? (
                  <button
                    className="w-auto h-auto p-2 rounded border cursor-pointer font-bold bg-stone-800 text-stone-50"
                    onClick={() => mutateCartData.mutate()}
                  >
                    Update
                  </button>
                ) : (
                  ""
                )}
              </div>
              <div>
                Total Price {(quantity * cartData.price).toPrecision(6)}
              </div>
              <div className="flex justify-center">
                <button
                  className="w-auto h-auto p-1 rounded border cursor-pointer font-bold bg-stone-800 text-stone-50"
                  onClick={() => removeCartData.mutate()}
                >
                  Remove
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className=" grid place-items-center w-full h-full text-2xl font-bold ">
              <h1>Loading..</h1>
            </div>
          </>
        )}
      </div>
    </>
  );
};
