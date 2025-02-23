import { useEffect } from "react";
import { useProduct } from "../hooks/useProduct"
import { getProductsApi } from "../apis/productApi";
import { ProductCard } from "../components/ProductCard";
import { HiH1 } from "react-icons/hi2";


export const Home = () => {
    const {productState,productDispatch} = useProduct();
    useEffect(()=>{
        const fetchProducts = async ()=>{
            const res = (await getProductsApi())
            productDispatch({type:'SET_PRODUCTS',data:res});
        }
        fetchProducts();
    },[])
    return (
        <>
            <div className="w-svw h-auto border rounded p-2">
                <div className="w-full h-20 bg-sky-300">
                </div>
                <div className="flex gap-5 flex-wrap p-2 justify-evenly">
                    {
                        productState.filterData.length?
                        productState.filterData.map((prod)=>{
                            return <ProductCard key={prod.id} prod={prod} />
                        }):<><h1 className="w-10 h-10 border border-blue-600">Loading</h1></>
                    }
                </div>

            </div>
        </>
    )
}
