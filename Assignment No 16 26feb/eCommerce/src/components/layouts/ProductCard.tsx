import { IProductCardPropType, IProductType } from "@/types/productsType";
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
import { AlertDialogBox } from "./AlertDialogBox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeProdById } from "@/api/productsApi";

export const ProductCard = ({ prod }: IProductCardPropType) => {
  const queryClient = useQueryClient();
  const removeProd = useMutation({
    mutationKey: ["productRemove", prod.id],
    mutationFn: removeProdById,
    onSuccess: () => {
      queryClient.setQueryData(["products"], (prev: IProductType[]) => {
        const newData = prev.filter((p) => {
          return p.id !== prod.id;
        });
        return newData;
      });
    },
    onError: (e) => {
      throw new Error(e.message);
    },
  });
  const handleRemoveProd = () => {
    removeProd.mutate({ id: prod.id });
  };
  return (
    <>
      <div className="w-80 h-[22rem]">
        <Card>
          <CardHeader>
            <CardDescription>
              <Link to={`/product/${prod.id}`}>
                <img
                  className="w-80 h-40 object-contain"
                  src={prod.image}
                  alt="productImage"
                />
              </Link>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <CardTitle className="line-clamp-2 text-center">
              {prod.title}
            </CardTitle>
            <CardTitle className="line-clamp-2 text-center font-thin">
              Price: ${prod.price}
            </CardTitle>
          </CardContent>
          <CardFooter className="flex  gap-5 justify-center">
            <Button variant={"outline"} asChild>
              <Link to={`/product/edit/${prod.id}`}>Update</Link>
            </Button>

            <AlertDialogBox onAction={handleRemoveProd} />
          </CardFooter>
        </Card>
      </div>
    </>
  );
};
