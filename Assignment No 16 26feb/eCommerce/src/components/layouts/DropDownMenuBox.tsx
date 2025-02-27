
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getProductsByCategory } from "@/api/productsApi";

import { IProductType } from "@/types/productsType";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useProductStore } from "@/store/useProductStore";
type DropDownMenuBoxProp = {
  itemList: string[];
  category: string;
  price: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setPrice: React.Dispatch<React.SetStateAction<string>>;
};
export const DropDownMenuBox = ({
  itemList,
  category,
  
  setCategory,
  
}: DropDownMenuBoxProp) => {
  const queryClient = useQueryClient();
  const setProducts = useProductStore((state) => state.setProducts);
  const categoryMutate = useMutation({
    mutationKey: [category],
    mutationFn: getProductsByCategory,
    onSuccess: (data) => {
      if (data.length === 0) {
        const newData: IProductType[] = queryClient.getQueryData(["products"])!;
        setProducts(newData);
        return;
      }
      useProductStore.setState({ filterData: data });
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });
  const handleCategoryChange = (e: string) => {
    setCategory(e);
    categoryMutate.mutate({ category: e });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Filter</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="font-serif">
          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Category</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="border bg-white rounded-lg">
                  <DropdownMenuRadioGroup
                    value={category}
                    onValueChange={handleCategoryChange}
                  >
                    <DropdownMenuRadioItem value="reset">
                      Reset
                    </DropdownMenuRadioItem>
                    {itemList.map((i, ind) => {
                      return (
                        <DropdownMenuRadioItem
                          className="font-serif"
                          key={ind}
                          value={i}
                        >
                          {i}
                        </DropdownMenuRadioItem>
                      );
                    })}
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSeparator></DropdownMenuSeparator>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
