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

export const ProductViewCard = ({ prod }: IProductCardPropType) => {
  return (
    <>
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
            <hr/>
            <CardDescription className="tracking-widest">
                {prod.description}
            </CardDescription>
            <CardFooter className="flex  gap-5 justify-center">
            <span>Price: ${prod.price}</span>
            <span>Category: {prod.category}</span>
            
          </CardFooter>
          <CardFooter className="flex  gap-5 justify-center">
            <Button variant={"outline"} asChild>
                <Link to={`/product/edit/${prod.id}`}>
                Update
                </Link>
                </Button>
            <Button>Remove</Button>
          </CardFooter>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
