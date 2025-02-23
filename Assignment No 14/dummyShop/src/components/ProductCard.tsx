import { IProductCardProps } from "../types/productTypes"
import { IoStar } from "react-icons/io5";

export const ProductCard = ({prod}:IProductCardProps) => {
  return (
    <>
        <div className="w-80 h-90 border rounded-md border-gray-700 p-1 font-serif ">
                <div className="w-full h-2/3 p-1"><img className="w-full h-[95%] object-contain" src={prod.image} alt="productImage" /></div>
                <div className="w-full text-justify">
                    <span className=" line-clamp-2 text-lg ">{prod.title}</span>
                </div>
                <div className="w-full  h-20 ">
                <span className="mt-14 p-2 text-2xl">${prod.price}</span>
                <span className="text-xl flex items-center gap-1"><IoStar/>{prod.rating.rate}</span>
                </div>

        </div>    
    </>
  )
}
