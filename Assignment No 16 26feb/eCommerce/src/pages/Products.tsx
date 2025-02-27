import { getAllCategories, getAllProducts } from "@/api/productsApi"
import { DropDownMenuBox } from "@/components/layouts/DropDownMenuBox"
import { ProductCard } from "@/components/layouts/ProductCard"
import { useProductStore } from "@/store/useProductStore"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"


export const Products = () => {
    console.log("productrender")
    const [category, setCategory] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const {data,isLoading,isError,error} = useQuery({
        queryKey:['products'],
        queryFn:getAllProducts,
    })
    // const {data:filterData} = useQuery({
    //     queryKey:['filterData'],
    //     queryFn:getAllProducts,
        
        
    // })
    const filterData = useProductStore((state)=>state.filterProducts);
    console.log('filterdata',filterData)
    const {data:categories} = useQuery({
        queryKey:['categories'],
        queryFn:getAllCategories,
    })

    if(isLoading){
        return <>
            <h1 className="text-3xl ">Loading...</h1>
        </>
    }
    if(isError){
        return <>
        <h1> Error in products: {error.message}</h1>
        </>
    }
  return (
    <>
    <div className="flex justify-center m-5 font-serif tracking-wider">
            {categories && <DropDownMenuBox itemList = {categories} price={price} setPrice={setPrice} setCategory={setCategory} category={category}/>}
            
    </div>
    <div className='font-serif tracking-wider flex flex-wrap justify-center gap-5'>
            {
                filterData!.length && filterData!.map((prod)=>{
                    return <ProductCard key={prod.id}  prod={prod}/>
                })
            }
    </div>
    </>
  )
}
