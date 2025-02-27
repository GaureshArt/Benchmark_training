import { getCartDataById } from "@/api/cartApi";
import { CartCard } from "@/components/layouts/CartCard";
import { useCartStore } from "@/store/useCartStore";
import { useQuery } from "@tanstack/react-query";

export const Cart = () => {
  const { isLoading, isError, error } = useQuery({
    queryKey: ["CartData"],
    queryFn: getCartDataById,
  });
  const cartData = useCartStore((state) => state.cartData);
  if (isLoading) {
    return <h1 className="w-full text-center text-2xl">Loading..</h1>;
  }
  if (isError) {
    return <h1>Errorfhdhfgj: {error.message}</h1>;
  }
  return (
    <>
      <div className="flex gap-10 m-10 flex-wrap">
        {cartData.products.length &&
          cartData.products.map((prod) => {
            return (
              <CartCard
                key={prod.productId}
                productId={prod.productId}
                quantity={prod.quantity}
              />
            );
          })}
      </div>
    </>
  );
};
