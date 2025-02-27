import { IProductCardPropType } from "@/types/productsType";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useCartStore } from "@/store/useCartStore";
import toast, { Toaster } from "react-hot-toast";

export const ProductViewCard = ({ prod }: IProductCardPropType) => {
  const existingProducts = useCartStore((state) => state.existingProducts);
  const addProduct = useCartStore((state) => state.addCartProduct);
  const handleAddCart = () => {
    if (existingProducts.has(prod.id)) {
      toast.success("Product is alredy added");
      return;
    }
    addProduct({ productId: prod.id, quantity: 1 });
    toast.success("Product added successfully");
  };
  return (
    <>
      <Toaster />
      <div className="w-1/2 h-3/4 m-10  font-serif tracking-wide ">
        <Card className="flex  w-full p-2 ">
          <CardHeader className=" w-[60rem]">
            <img
              className=" w-full h-full object-contain"
              src={prod.image}
              alt="productImage"
            />
          </CardHeader>
          <CardContent className="flex flex-col gap-5 ">
            <CardTitle className="text-center tracking-wider p-1 ">
              {prod.title}
            </CardTitle>
            <hr />
            <CardDescription className="tracking-widest">
              {prod.description}
            </CardDescription>
            <CardFooter className="flex  gap-5 justify-center">
              <span>Price: ${prod.price}</span>
              <span>Category: {prod.category}</span>
            </CardFooter>
            <CardFooter className="flex  gap-5 justify-center">
              <Button variant={"outline"} asChild>
                <Link to={`/product/edit/${prod.id}`}>Update</Link>
              </Button>
              <Button>Remove</Button>
              <Button onClick={handleAddCart} variant={"ghost"}>
                Add Cart
              </Button>
            </CardFooter>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
