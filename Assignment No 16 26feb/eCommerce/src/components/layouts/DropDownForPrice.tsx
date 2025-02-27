import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import React from 'react'
import { Button } from '../ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IProductType } from '@/types/productsType';


type DropDownMenuBoxProp = {
    
    
    price:string;
    
    setPrice:React.Dispatch<React.SetStateAction<string>>;
  };
export const DropDownForPrice = ({ price,setPrice }: DropDownMenuBoxProp) => {

    const queryClient = useQueryClient();
    const setProductByPrice = async({price}:{price:string}):Promise<IProductType[]>=>{
        const filterData = queryClient.getQueryData<IProductType[]>(['filterData'])!;
          console.log('price',price);
          const newData = filterData.sort((a,b)=>{
    
          return price==='Low'?a.price - b.price:b.price-a.price;
          })
          return newData;
        }
      
      const priceMutate = useMutation({
        mutationKey:['filterData'],
        mutationFn:setProductByPrice,
        onSuccess:(data)=>{
          console.log("Data:",data);
          queryClient.setQueryData(["filterData"],data);
        }
      })
      const handlePriceChange =(e:string)=>{
        console.log("e",e);
        setPrice(e);
        priceMutate.mutate({price:e});
      }
  return (
    <>
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Filter</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSeparator />

          <DropdownMenuGroup>
    <DropdownMenuSub>
            <DropdownMenuSubTrigger>Price</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
              <DropdownMenuRadioGroup
                    value={price}
                    onValueChange={handlePriceChange}
                  >
              <DropdownMenuRadioItem value="Low">
                      {` High -> Low`}
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="High">
                      {`Low -> High`}
              </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            </DropdownMenuGroup >
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
