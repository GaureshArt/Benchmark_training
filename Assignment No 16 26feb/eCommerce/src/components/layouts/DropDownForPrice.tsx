import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from  "../ui/dropdown-menu"
import React from 'react'
import { Button } from '../ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IProductType } from '@/types/productsType';
import { useProductStore } from '@/store/useProductStore';
import { getAllCategories, getProductsByCategory } from "@/api/productsApi";


type DropDownMenuBoxProp = {
    price:string;
    itemList:string[];
    setPrice:React.Dispatch<React.SetStateAction<string>>;
  };
export const DropDownForPrice = ({ price,setPrice,itemList }: DropDownMenuBoxProp) => {

    const setProducts = useProductStore((state)=>state.setProducts);
    const filterData = useProductStore((state)=>state.filterData);
    const setProductByPrice = ():IProductType[]=>{
          console.log('price',price);
          const newData = filterData.sort((a,b)=>{
    
          return price==='Low -> high'?a.price - b.price:b.price-a.price;
          })
          
          return newData;
        }
      
      const priceMutate = useMutation({
        mutationKey:['filterData'],
        mutationFn:getAllCategories,
        onSuccess:(data)=>{
          useProductStore.setState({filterData:setProductByPrice()})
          setPrice('reset');
        },
        onError:(e)=>{
            throw new Error(e.message)
        }
      })
      const handlePriceChange =(e:string)=>{
        console.log("e",e);
        setPrice(e);
        priceMutate.mutate();
      }
  return (
    <>
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Sort</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Price</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="border bg-white rounded-lg">
                  <DropdownMenuRadioGroup
                    value={price}
                    onValueChange={handlePriceChange}
                  >
                    <DropdownMenuRadioItem value="reset">
                      Reset
                    </DropdownMenuRadioItem>
                    {itemList.map((i, ind) => {
                      return (
                        <DropdownMenuRadioItem key={ind} value={i}>
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
  )
}
